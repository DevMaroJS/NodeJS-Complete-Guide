export const getOrders = async (req, res) => {
  try {
    const orders = await req.user.getOrders({ include: ["products"] });
    if (!orders.length) {
      return res.status(404).json({ error: "Orders not found" });
    }

    return res.json({
      data: {
        ...orders,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  const { cartId } = req.body;

  try {
    const cart = await req.user.getCart({ where: { id: cartId } });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const order = await req.user.createOrder();
    const products = await cart.getProducts();
    order.addProducts(
      products.map((product) => {
        product.order_items = { quantity: product.cart_items.quantity };
        return product;
      })
    );
    await cart.setProducts([]);

    const message = "Order created successfully";
    return res.status(201).json({
      message,
      data: {
        ...order.dataValues,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
