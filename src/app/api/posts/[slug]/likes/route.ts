import { NextRequest, NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(
  _req: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { slug } = await params;
  const session = await auth();

  try {
    const db = await getDb();
    const col = db.collection("post_likes");

    const count = await col.countDocuments({ postSlug: slug });
    const likedByUser = session?.user?.id
      ? (await col.countDocuments({ postSlug: slug, userId: session.user.id })) > 0
      : false;

    return NextResponse.json({ count, likedByUser });
  } catch {
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

export async function POST(
  _req: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { slug } = await params;
  const db = await getDb();
  const col = db.collection("post_likes");

  const existing = await col.findOne({ postSlug: slug, userId: session.user.id });

  if (existing) {
    await col.deleteOne({ _id: existing._id });
    const count = await col.countDocuments({ postSlug: slug });
    return NextResponse.json({ success: true, liked: false, count });
  }

  try {
    await col.insertOne({ postSlug: slug, userId: session.user.id, createdAt: new Date() });
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      const count = await col.countDocuments({ postSlug: slug });
      return NextResponse.json({ success: true, liked: true, count });
    }
    return NextResponse.json({ error: "Failed to save like" }, { status: 500 });
  }

  const count = await col.countDocuments({ postSlug: slug });
  return NextResponse.json({ success: true, liked: true, count });
}
