import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default function NewEventPage() {
  async function createEvent(formData: FormData) {
    "use server";
    const session = await getServerSession();
    if (!session?.user?.email) {
      redirect("/signin");
    }

    const slug = String(formData.get("slug") || "").trim().toLowerCase();
    const childName = String(formData.get("childName") || "").trim();
    const mitzvahType = String(formData.get("mitzvahType") || "BAR").toUpperCase();

    if (!slug || !childName) return;

    await db.event.create({
      data: {
        slug,
        childName,
        mitzvahType,
        userEmail: session.user.email,
      },
    });

    redirect(`/events/${slug}`);
  }

  return (
    <form action={createEvent}>
      <h1>Create New Event</h1>
      <input name="slug" placeholder="Event Slug" required />
      <input name="childName" placeholder="Child's Name" required />
      <select name="mitzvahType">
        <option value="BAR">Bar Mitzvah</option>
        <option value="BAT">Bat Mitzvah</option>
        <option value="BNET">B'nei Mitzvah</option>
        <option value="BNOT">B'not Mitzvah</option>
      </select>
      <button type="submit">Create Event</button>
    </form>
  );
}
