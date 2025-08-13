import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/signin");
  }

  // Example: load gifts or events for the signed-in user
  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      events: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { gifts: true },
      },
    },
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome{user?.name ? `, ${user.name}` : ""}!</p>

      <h2 style={{ marginTop: 24 }}>Your recent events</h2>
      {!user?.events?.length && <p>No events yet.</p>}
      <ul>
        {user?.events?.map((e) => {
          const totalGifts = e.gifts?.reduce((sum, g) => sum + (g.amount || 0), 0) ?? 0;
          return (
            <li key={e.id} style={{ margin: "12px 0" }}>
              <strong>{e.title || "Untitled event"}</strong> — {new Date(e.createdAt).toLocaleDateString()}
              <div>Gifts received: {e.gifts?.length ?? 0} | Total: ${totalGifts.toFixed(2)}</div>
              <Link href={`/events/${e.id}`}>Open</Link>
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: 24 }}>
        <Link className="button" href="/events/new">Create new event</Link>
      </div>
    </div>
  );
}
