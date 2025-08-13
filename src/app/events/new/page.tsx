// src/app/events/new/page.tsx
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

async function createEvent(formData: FormData) {
  "use server";

  const session = await getServerSession();
  const email = session?.user?.email ?? null;
  if (!email) redirect("/signin");

  // Read & sanitize fields
  const slug = String(formData.get("slug") || "").trim().toLowerCase();
  const childName = String(formData.get("childName") || "").trim();
  const mitzvahType = String(formData.get("mitzvahType") || "")
    .toUpperCase()
    .trim() as "BAR" | "BAT" | "BNEI" | "BNOT";
  const charityId = String(formData.get("charityId") || "").trim();

  if (!slug || !childName || !charityId) {
    // Basic guard; you can add nicer UI validation later
    return;
  }

  // Ensure the host user exists; use their id as hostId
  const host = await db.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  // Create the event
  await db.event.create({
    data: {
      slug,
      childName,
      mitzvahType,
      charityId,
      hostId: host.id,
      userEmail: email,
    },
  });

  redirect(`/events/${slug}`);
}

export default async function NewEventPage() {
  // Load charities for the select dropdown
  const charities = await db.charity.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1>Create a New Event</h1>

      <form action={createEvent} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <label>
          Slug (URL part)
          <input name="slug" placeholder="e.g. sarah-bat-mitzvah" required />
        </label>

        <label>
          Child name
          <input name="childName" placeholder="e.g. Sarah Cohen" required />
        </label>

        <label>
          Mitzvah type
          <select name="mitzvahType" defaultValue="BAT" required>
            <option value="BAR">BAR</option>
            <option value="BAT">BAT</option>
            <option value="BNEI">BNEI</option>
            <option value="BNOT">BNOT</option>
          </select>
        </label>

        <label>
          Charity
          <select name="charityId" required>
            <option value="" disabled>
              Select a charity…
            </option>
            {charities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="button">
          Create event
        </button>
      </form>
    </div>
  );
}
