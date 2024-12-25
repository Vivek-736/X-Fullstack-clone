import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, username, name, password } = body;

        if (!email || !name || !username || !password) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                username,
                hashedPassword
            }
        });

        return NextResponse.json(user);
    }
    catch (error) {
        return new NextResponse((error as Error).message, { status: 500 });
    }
}