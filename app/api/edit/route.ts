import serverAuth from "@/app/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export const PATCH = async (req: NextRequest) => {
    try {
        const currentUser = await serverAuth(req);
        const { name, username, bio, profileImage, coverImage } = await req.json();

        if (!name || !username) {
            throw new Error("Name and username are required");
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });

        return NextResponse.json(updatedUser, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
};