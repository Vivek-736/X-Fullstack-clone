import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const { userId } = await params;

        if (!userId || typeof userId !== "string") {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hasNotification: false,
            },
        });

        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}