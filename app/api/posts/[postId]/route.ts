import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";

export async function GET(req: Request, { params }: { params: { postId: string } }) {
    try {
        const { postId } = params;

        if (!postId || typeof postId !== "string") {
            return new NextResponse('Invalid post ID', { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });

        if (!post) {
            return new NextResponse('Post not found', { status: 404 });
        }

        return NextResponse.json(post);
    } catch (e) {
        console.error(e);
        return new NextResponse('Something went wrong', { status: 500 });
    }
}