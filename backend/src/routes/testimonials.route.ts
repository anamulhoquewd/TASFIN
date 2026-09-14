import { testimonialsController } from "./../controllers/index.js";
import { authenticatedAdmin } from "./../middlewares/auth.middleware.js";
import { Hono } from "hono";

const testimonialRoutes = new Hono();

testimonialRoutes.post("/register", authenticatedAdmin, (c) =>
  testimonialsController.register(c)
);

testimonialRoutes.get("/", (c) => testimonialsController.getTestimonials(c));

testimonialRoutes.get("/:_id", (c) => testimonialsController.getTestimonial(c));

testimonialRoutes.patch("/:_id", authenticatedAdmin, (c) =>
  testimonialsController.updateTestimonial(c)
);

testimonialRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  testimonialsController.deleteTestimonial(c)
);

testimonialRoutes.post("/:_id/upload-avatar", authenticatedAdmin, (c) =>
  testimonialsController.changeAvatar(c)
);

export default testimonialRoutes;
