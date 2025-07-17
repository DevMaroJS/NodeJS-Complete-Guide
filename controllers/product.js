const products = [];

export const createProduct = (req, res) => {
  const product = req.body;

  products.push({
    ...product,
    id: products.length,
  });

  return res.json({ message: "Product created" });
};

export const getProducts = (req, res) => {
  return res.json(products);
};

export const updateProduct = (req, res) => {
  const id = req.params.id;
  const product = req.body;
  products[id] = {
    ...products[id],
    ...product,
  };
  return res.json({ message: "Product updated" });
};

export const deleteProduct = (req, res) => {
  const id = req.params.id;
  products.splice(id, 1);
  return res.json({ message: "Product deleted" });
};

export const getProduct = (req, res) => {
  const id = req.params.id;
  const product = products[id];
  return res.json(product);
};
