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
    description,
    category = "otro",
    status = "pendiente",
    priority = "media",
    due_date,
    visible_to_client = true,
  } = body;

  const { data: task, error } = await supabase
    .from("tasks")
    .insert({
      project_id,
      title,
      description: description || null,
      category,
      status,
      priority,
      due_date: due_date || null,
      visible_to_client,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, task });
}
