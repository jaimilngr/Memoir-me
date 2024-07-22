import { Hono } from "hono";
import { userRouter } from "./Routes/user";
import { blogRouter } from "./Routes/blog";
import { cors } from "hono/cors";
import { commentRouter } from "./Routes/comment";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    Jwt_Secret: string;
  };
}>();
app.use("/*" ,cors())
app.route("/api/v1/user" , userRouter)
app.route("/api/v1/blog" , blogRouter)
app.route("/api/v1/comment" , commentRouter)




export default app;
