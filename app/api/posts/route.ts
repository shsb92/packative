import { NextResponse } from 'next/server';
import { readPostsFromFile, writePostsToFile } from '@/utils/fileHandler';

export async function GET() {
    const posts = readPostsFromFile();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const { title, content } = await request.json();
    const posts = readPostsFromFile();
    const newPost: Post = { id: posts.length + 1, title, content, likes: 0 };
    posts.push(newPost);
    writePostsToFile(posts);
    return NextResponse.json(newPost, { status: 201 });
}

