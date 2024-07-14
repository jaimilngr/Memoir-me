import { Hono } from "hono";
import { userRouter } from "./Routes/user";
import { blogRouter } from "./Routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    Jwt_Secret: string;
  };
}>();
app.route("/api/v1/user" , userRouter)
app.route("/api/v1/blog" , blogRouter)



export default app;
