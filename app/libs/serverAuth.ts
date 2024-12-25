import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/app/libs/prismadb";

const serverAuth = async (req: NextRequest) => {
    const token = await getToken({ req });

    if (!token?.email) {
        throw new NextResponse("Unauthorized", { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: token.email
        }
    });

    if (!currentUser) {
        throw new NextResponse("Unauthorized", { status: 401 });
    }

    return currentUser;
}

export default serverAuth;
