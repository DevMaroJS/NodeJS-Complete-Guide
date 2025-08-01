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
    cart.totalPrice = products.reduce((total, product) => {
      return total + product.price * product.CartItem.quantity;
    }, 0);
    return res.json({ data: cart });
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

    const [cartItem, created] = await cart.addProduct(product, {
      through: { quantity },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    return res
      .status(201)
      .json({ message: "Item added to cart", data: cartItem });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await req.user.getCart();
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cartItem = await cart.getProducts({ where: { id: productId } });

    if (cartItem.length === 0) {
      return res.status(404).json({ error: "Item not in cart" });
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

    const [cartItem] = await cart.getProducts({ where: { id: productId } });

    if (!cartItem) {
      return res.status(404).json({ error: "Item not in cart" });
    }

    cartItem.CartItem.quantity = quantity;
    await cartItem.save();

    return res
      .status(200)
      .json({ message: "Cart item updated", data: cartItem });
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
