import { Router } from "express";

const router = Router();

// Apenas rota placeholder
router.get("/", (_req, res) => {
  res.json({ ok: true, message: "gift pages list placeholder" });
});

export { router as giftPagesRoutes };
