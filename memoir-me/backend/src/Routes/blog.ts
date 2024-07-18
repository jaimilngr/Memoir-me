import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify, } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@jaimil/memoirme-common";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        Jwt_Secret: string;
    }
    Variables:{
        userId: string;
    }
}>();


blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("Authorization") || "";  

    try{
        const user = await verify(header, c.env.Jwt_Secret);
        if (user && typeof user.id === 'string') {
            c.set("userId", user.id);
            await next();
          }
          else {
          c.status(403);
          return c.json({ 
            message: "you are not logged in" });
        }
    }
    catch(e){
        c.status(403);
        return c.json({ 
          message: "you are not logged in" });
      }
  });
  
  
  blogRouter.post("/",  async (c) => {
    const body = await c.req.json();

    const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: " Inputs not correct"
      })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

        const post =  await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId,
        }
      })
    return c.json({
        id:post.id
    });
  });


  blogRouter.put("/", async (c) => {
    const body = await c.req.json();

    const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: " Inputs not correct"
      })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const post =  await prisma.post.update({
        where:{
           id: body.id
        },
        data:{
            title: body.title,
            content: body.content,

        }
      })
      
      return c.json({
        id:post.id
    });  
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

        const posts =  await prisma.post.findMany({
          select: {
            id:true,
            content: true,
            title: true,
            author: {
              select:{
                name: true,
              }
            }
          }
        })
          return c.json({
            posts
        }); 
      
  });


  blogRouter.get("/:id", async (c) => {
    const id =  c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      try{
        const post =  await prisma.post.findFirst({
            where:{
               id: id
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                      name:true,
                    }
                }
            }
          })
          return c.json({
            post
        }); 
      }
     catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog post"
        })
     }
      
  });


  