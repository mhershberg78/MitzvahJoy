import { db } from "@/src/lib/db";           // this matches your current lib path
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

async function createEvent(formData: FormData) {
  "use server";
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/signin");
  }

  const slug = String(formData.get("slug") || "").trim().toLowerCase();
  const childName = String(formData.get("childName") || "").trim();
  const mitzvahType = String(formData.get("mitzvahType") || "BAR").toUpperCase() as
    | "BAR" | "BAT" | "BNEI" | "BNOT";

  if (!slug || !childName) return;

  await db.event.create({
    data: { slug, childName, mitzvahType }
  });

  redirect(`/events/${slug}`);
}

export default async function NewEventPage() {
  const session = await getServerSession();
  if (!session) redirect("/signin");

  return (
    <div style={{ maxWidth: 560, margin: "24px auto" }}>
      <h1>Create an Event</h1>
      <form action={createEvent} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          Child’s name
          <input name="childName" placeholder="e.g., Maya Cohen" required />
        </label>
        <label>
          URL slug (letters/numbers/dashes)
          <input name="slug" placeholder="e.g., maya-bat-mitzvah" pattern="[a-z0-9-]+" required />
        </label>
        <label>
          Mitzvah type
          <select name="mitzvahType" defaultValue="BAT">
            <option value="BAR">Bar</option>
            <option value="BAT">Bat</option>
            <option value="BNEI">Bnei</option>
            <option value="BNOT">Bnot</option>
          </select>
        </label>
        <button className="button" type="submit">Create Event</button>
      </form>
    </div>
  );
}
