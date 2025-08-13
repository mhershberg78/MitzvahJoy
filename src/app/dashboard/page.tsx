import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/signin");
  }

  // Load the signed-in user and their events
  const user = await db.user.findUnique({
    where: { email: session.user!.email! },
    include: { events: true }, // no 'name' field used
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.user!.email}</p>

      <h2 style={{ marginTop: 24 }}>Your recent events</h2>
      {!user?.events?.length && <p>No events yet.</p>}

      {!!user?.events?.length && (
        <ul>
          {user.events.map((e) => (
            <li key={e.id}>
              {/* Use fields that actually exist on Event */}
              {e.childName} — <code>/{e.slug}</code>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
