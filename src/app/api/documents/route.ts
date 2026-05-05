import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const {
    project_id,
    title,
    type = "otro",
    file_url,
    content,
    visible_to_client = true,
  } = body;

  const { data: doc, error } = await supabase
    .from("documents")
    .insert({
      project_id,
      title,
      type,
      file_url: file_url || null,
      content: content || null,
      visible_to_client,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, document: doc });
}
