import e from "express";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

export const getCart = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    if (!cart) {
      const newCart = req.user.createCart();
      return res.json({ data: newCart });
    }
    const products = await cart.getProducts();
    cart.products = products;
    return res.json({
      data: {
        ...cart.dataValues,
        products: products.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: product.cart_items.quantity,
        })),
        total: products.reduce(
          (total, product) =>
            total + product.price * product.cart_items.quantity,
          0
        ),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await req.user.getCart();
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [existingProduct] = await cart.getProducts({
      where: { id: productId },
    });

    if (existingProduct) {
      await cart.addProduct(existingProduct, {
        through: { quantity: quantity + existingProduct.cart_items.quantity },
      });
    }

    if (!existingProduct) {
      await cart.addProduct(product, {
        through: { quantity },
      });
    }

    const products = await cart.getProducts();
    cart.products = products;

    return res.status(201).json({
      message: existingProduct
        ? "Item updated in your cart"
        : "Item added in your cart",
      data: {
        ...cart.dataValues,
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.cart_items.quantity,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeItemFromCart = async (req, res) => {
  const productId = req.params.id;

  try {
    const cart = await req.user.getCart();
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [existingProduct] = await cart.getProducts({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Item is not in your cart" });
    }

    await cart.removeProduct(product);
    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    await cart.setProducts([]);
    return res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await req.user.getCart();
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [existingProduct] = await cart.getProducts({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Item is not in your cart" });
    }

    if (quantity <= 0) {
      await cart.removeProduct(product);
      return res.status(200).json({ message: "Item removed from cart" });
    }

    await cart.addProduct(existingProduct, {
      through: { quantity: quantity },
    });

    return res.status(200).json({ message: "Item updated in your cart" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    return res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
