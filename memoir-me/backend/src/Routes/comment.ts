import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  createCommentInput, updateCommentInput  } from "@jaimil/memoirme-common";
import { authMiddleware } from "./blog";



export const commentRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        Jwt_Secret: string;
    }
    Variables:{
        userId: string;
    }
}>();


commentRouter.post("/", authMiddleware, async (c: any) => {

    try {
        const body = await c.req.json();
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const { success, error } = createCommentInput.safeParse(body);
        if (!success) {
            c.status(400); 
            return c.json({
                message: "Inputs not correct",
                errors: error.errors
            });
        }

        const userId = c.get("userId");
        if (!userId) {
            c.status(401); 
            return c.json({
                message: "User not authenticated"
            });
        }

        const comment = await prisma.comment.create({
            data: {
                content: body.content,
                userId: userId,
                postId: body.postId,
                parentId: body.parentId,
            }
        });

        return c.json({
            id: comment.id
        }, 201); // Created

    } catch (error:any) {
        console.error("Error creating comment:", error);
        c.status(500); // Internal Server Error
        return c.json({
            message: "An error occurred while creating the comment",
            error: error.message
        });
    }
});


  commentRouter.get("/bulk/:postId", async (c: any) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { postId } = c.req.query();

    const comments = await prisma.comment.findMany({
        where: {
            postId: postId || undefined, 
        },
        select: {
            id: true,
            content: true,
            user: {
                select: {
                    name: true,
                }
            },
            parentId: true,
            replies: {
                select: {
                    id: true,
                    content: true,
                    user: {
                        select: {
                            name: true,
                        }
                    }
                }
            }
        }
    });

    return c.json({
        comments
    });
});
