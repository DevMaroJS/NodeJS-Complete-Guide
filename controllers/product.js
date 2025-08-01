import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  const body = req.body;

  try {
    await Product.create({
      title: body.title,
      price: body.price,
      imageUrl: body.imageUrl,
      userId: req.user.id, // Assuming the user is authenticated and req.user is set
    });
    return res.json({ message: "Product created" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.json({ message: "Product not found" });
    }

    await product.update({
      title: body.title,
      price: body.price,
      imageUrl: body.imageUrl,
    });
    return res.json({ message: "Product updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.json({ message: "Product not found" });
    }
    await product.destroy();
    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.json({ message: "Product not found" });
    }
    return res.json({ data: product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
