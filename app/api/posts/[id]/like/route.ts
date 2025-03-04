import { readPostsFromFile, writePostsToFile } from "@/utils/fileHandler";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const postId = parseInt(params.id);
    const posts = readPostsFromFile();
    const post = posts.find(p => p.id === postId);
    console.log(`id: ${postId}`)
    if (post) {
        post.likes++;
        writePostsToFile(posts);
        return NextResponse.json(post);
    } else {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
} 