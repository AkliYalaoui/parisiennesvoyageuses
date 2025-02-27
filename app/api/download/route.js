import { createClient } from "@/app/config/supabaseServerClient";
import { readFile } from "fs/promises";
import path from "path";

export  async function GET(request) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return new Response("Missing token", { status: 400 });
  }

  const supabase = await createClient();

  // Validate the token in the database
  const { data, error } = await supabase
    .from("downloads")
    .select("*")
    .eq("download_token", token)
    .single();

  if (error || !data) {
    return new Response("Invalid or expired download link", { status: 404 });
  }

  if (data.used) {
    return new Response("This link has already been used", { status: 403 });
  }

  if (new Date(data.expires_at) < new Date()) {
    return new Response("This link has expired", { status: 403 });
  }

  // Mark the token as used
  await supabase.from("downloads").update({ used: true }).eq("id", data.id);

  // Generate a URL for the file
    const buffer = await readFile(path.join(process.cwd(), `guides/${data.guide_id}.pdf`));
   // set the headers to tell the browser to download the file
   const headers = new Headers();
   // remember to change the filename `test.pdf` to whatever you want the downloaded file called
   headers.append("Content-Disposition", 'attachment; filename="myguide.pdf"');
   headers.append("Content-Type", "application/pdf");

   return new Response(buffer, {
     headers,
   });
}
