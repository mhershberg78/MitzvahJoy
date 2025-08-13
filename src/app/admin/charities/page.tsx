import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function isAdmin(email?: string | null) {
  if (!email) return false;
  const user = await db.user.findUnique({ where: { email } });
  return Boolean(user?.role === "ADMIN"); // change to your role logic
}

// ---- Server Actions ----
async function addCharity(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const url = String(formData.get("url") || "").trim();
  if (!name) return;

  await db.charity.create({ data: { name, url } });
}

async function deleteCharity(id: string) {
  "use server";
  await db.charity.delete({ where: { id } });
}

export default async function AdminCharitiesPage() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/signin");

  const ok = await isAdmin(session.user.email);
  if (!ok) redirect("/"); // or show 403

  const charities = await db.charity.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Charities</h1>

      <form action={addCharity} style={{ margin: "16px 0", display: "grid", gap: 8, maxWidth: 480 }}>
        <input name="name" placeholder="Charity name" required />
        <input name="url" placeholder="Website (optional)" />
        <button type="submit">Add Charity</button>
      </form>

      <ul>
        {charities.map((c) => (
          <li key={c.id} style={{ display: "flex", gap: 12, alignItems: "center", margin: "8px 0" }}>
            <div style={{ flex: 1 }}>
              <strong>{c.name}</strong> {c.url ? <a href={c.url} target="_blank">({c.url})</a> : null}
            </div>
            <form action={async () => deleteCharity(c.id)}>
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
