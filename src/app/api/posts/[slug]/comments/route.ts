import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";

type RouteContext = { params: Promise<{ slug: string }> };

interface CommentPayload {
  name: string;
  email: string;
  body: string;
}

export async function GET(
  _req: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { slug } = await params;

  try {
    const db = await getDb();
    const comments = await db
      .collection("post_comments")
      .find(
        { postSlug: slug, status: "approved" },
        { projection: { email: 0, _id: 0 } }
      )
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { slug } = await params;
  const session = await auth();

  let body: Partial<CommentPayload>;
  try {
    body = (await req.json()) as Partial<CommentPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (session?.user?.name ?? body.name)?.trim();
  const email = (session?.user?.email ?? body.email)?.trim().toLowerCase();
  const commentBody = body.body?.trim();

  if (!name || !email || !commentBody) {
    return NextResponse.json({ error: "name, email, and body are required" }, { status: 422 });
  }

  try {
    const db = await getDb();
    await db.collection("post_comments").insertOne({
      postSlug: slug,
      name,
      email,
      body: commentBody,
      status: "pending",
      createdAt: new Date(),
    });
  } catch {
    return NextResponse.json({ error: "Failed to save comment" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
