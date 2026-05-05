import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Verify admin
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const body = await request.json();
  const {
    name,
    domain,
    clientName,
    clientEmail,
    status = "active",
    startDate,
    ga4PropertyId,
    gscSiteUrl,
  } = body;

  // Use service role to create client user
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Create client user in auth (with temporary password)
  const tempPassword = `Client${Date.now()}!`;
  const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
    email: clientEmail,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { full_name: clientName, role: "client" },
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  // Create project linked to new client
  const { data: project, error: projectError } = await adminClient
    .from("projects")
    .insert({
      name,
      domain,
      client_id: authData.user.id,
      status,
      start_date: startDate || null,
      ga4_property_id: ga4PropertyId || null,
      gsc_site_url: gscSiteUrl || null,
    })
    .select()
    .single();

  if (projectError) {
    return NextResponse.json({ error: projectError.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    project,
    tempPassword,
  });
}
