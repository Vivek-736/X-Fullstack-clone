import serverAuth from "@/app/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const currentUser = await serverAuth(req);
        return NextResponse.json(currentUser, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
    }
}