import serverAuth from "@/app/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const POST = async (req: NextRequest) => {
    try {
        const { postId } = await req.json();
        const currentUser = await serverAuth(req);

        if (!postId || typeof postId !== "string") {
            throw new Error("Invalid ID");
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new Error("Invalid ID");
        }

        const updatedLikedIds = [...(post.likedIds || [])];
        updatedLikedIds.push(currentUser.id);

        try {
            if (post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: 'Someone liked your tweet!',
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

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const { postId } = await req.json();
        const currentUser = await serverAuth(req);

        if (!postId || typeof postId !== "string") {
            throw new Error("Invalid ID");
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new Error("Invalid ID");
        }

        let updatedLikedIds = [...(post.likedIds || [])];
        updatedLikedIds = updatedLikedIds.filter(likedId => likedId !== currentUser.id);

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
};