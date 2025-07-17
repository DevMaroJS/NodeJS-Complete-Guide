const products = [];

export const createProduct = (req, res) => {
  const body = req.body;
  const newProduct = {
    ...body,
    id: Math.random().toString(),
  };
  products.push(newProduct);

  return res.json({ message: "Product created", data: newProduct });
};

export const getProducts = (req, res) => {
  return res.json({ data: products });
};

export const updateProduct = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const productUpdated = {
    ...products[productIndex],
    ...body,
  };

  products[productIndex] = productUpdated;

  return res.json({ message: "Product updated", data: productUpdated });
};

export const deleteProduct = (req, res) => {
  const id = req.params.id;

  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(productIndex, 1);
  return res.json({ message: "Product deleted" });
};

export const getProduct = (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  return res.json(product);
};
