import serverAuth from "@/app/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const POST = async (req: NextRequest) => {
    try {
        const currentUser = await serverAuth(req);
        const { body } = await req.json();
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');

        if (!postId) {
            throw new Error("Invalid ID");
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            }
        });

        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                }
            });
            if (post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: 'Someone replied to your tweet!',
                        userId: post.userId
                    }
                });
                await prisma.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }

        return NextResponse.json(comment, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
};