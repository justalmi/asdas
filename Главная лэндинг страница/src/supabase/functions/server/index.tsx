import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-06a45a2b/health", (c) => {
  return c.json({ status: "ok" });
});

// Create a new order
app.post("/make-server-06a45a2b/orders", async (c) => {
  try {
    const body = await c.req.json();
    const { services, description, budget, address, contactName, contactPhone, workType } = body;

    // Generate unique ID for the order
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create order object
    const order = {
      id: orderId,
      services,
      description,
      budget,
      address,
      contactName,
      contactPhone,
      workType,
      status: 'active', // active, in_progress, completed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to KV store
    await kv.set(orderId, order);

    console.log(`Order created successfully: ${orderId}`);
    return c.json({ success: true, orderId, order });
  } catch (error) {
    console.error(`Error creating order: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all orders
app.get("/make-server-06a45a2b/orders", async (c) => {
  try {
    // Get all orders from KV store with prefix
    const orders = await kv.getByPrefix('order_');
    
    console.log(`Retrieved ${orders.length} orders`);
    return c.json({ success: true, orders });
  } catch (error) {
    console.error(`Error retrieving orders: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get a single order by ID
app.get("/make-server-06a45a2b/orders/:id", async (c) => {
  try {
    const orderId = c.req.param('id');
    const order = await kv.get(orderId);

    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404);
    }

    console.log(`Retrieved order: ${orderId}`);
    return c.json({ success: true, order });
  } catch (error) {
    console.error(`Error retrieving order: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update order status
app.put("/make-server-06a45a2b/orders/:id", async (c) => {
  try {
    const orderId = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    const order = await kv.get(orderId);
    if (!order) {
      return c.json({ success: false, error: 'Order not found' }, 404);
    }

    // Update order
    const updatedOrder = {
      ...order,
      status,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(orderId, updatedOrder);

    console.log(`Order updated successfully: ${orderId}`);
    return c.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error(`Error updating order: ${error}`);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);