import pool from "../utils/database.js";

export const createProduct = async (req, res) => {
  const body = req.body;

  try {
    await pool.execute(
      "INSERT INTO products (title, price, imageUrl) VALUES (?, ?, ?)",
      [body.title, body.price, body.imageUrl]
    );
    return res.json({ message: "Product created" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const [products] = await pool.execute("SELECT * FROM products");
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const [product] = await pool.execute(
      "UPDATE products SET title = ?, price = ?, imageUrl = ? WHERE id = ?",
      [body.title, body.price, body.imageUrl, id]
    );
    if (!product.affectedRows) {
      return res.json({ message: "Product not found" });
    }
    return res.json({ message: "Product updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const [product] = await pool.execute("DELETE FROM products WHERE id = ?", [
      id,
    ]);
    if (!product.affectedRows) {
      return res.json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const [product] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    if (!product[0]) {
      return res.json({ message: "Product not found" });
    }
    return res.json({ data: product[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
