import serverAuth from "@/app/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await req.json();
        const currentUser = await serverAuth(req);

        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid userId");
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new Error("Invalid ID");
        }

        const updatedFollowingIds = [...(user.followindIds || [])];
        updatedFollowingIds.push(userId);

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                followindIds: updatedFollowingIds
            }
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const { userId } = await req.json();
        const currentUser = await serverAuth(req);

        if (!userId || typeof userId !== "string") {
            throw new Error("Invalid userId");
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new Error("Invalid ID");
        }

        let updatedFollowingIds = [...(user.followindIds || [])];
        updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId);

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                followindIds: updatedFollowingIds
            }
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
};