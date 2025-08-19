import { giftPagesRoutes } from "./modules/gift-pages/gift-pages.routes";

// depois de app.use("/api/users", usersRoutes);
app.use("/api/gift-pages", giftPagesRoutes);
