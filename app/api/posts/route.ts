import serverAuth from "@/app/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        let posts;

        if (userId) {
            posts = await prisma.post.findMany({
                where: {
                    userId
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const currentUser = await serverAuth(req);
        const { body } = await req.json();

        const post = await prisma.post.create({
            data: {
                body,
                userId: currentUser.id
            }
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
};