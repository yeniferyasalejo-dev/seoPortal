import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password, full_name } = await request.json();

  // Only works with service role key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Check if any admin exists
  const { data: existingAdmins } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "admin")
    .limit(1);

  if (existingAdmins && existingAdmins.length > 0) {
    return NextResponse.json(
      { error: "Admin already exists. Setup disabled." },
      { status: 403 }
    );
  }

  // Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role: "admin" },
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: "Admin user created successfully",
    user_id: authData.user.id,
  });
}
