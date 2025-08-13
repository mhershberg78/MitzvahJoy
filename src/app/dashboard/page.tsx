export const dynamic = "force-dynamic"; // don't pre-render at build time

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Dashboard() {
  // Try to get the current session
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email ?? null;

  // If not signed in, show a gentle prompt (no redirects during build)
  if (!userEmail) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>
          Please <Link href="/signin">sign in</Link> to view your dashboard.
        </p>
      </div>
    );
  }

  // Fetch the user + their events. If this fails, we still render the page.
  let user:
    | (Awaited<ReturnType<typeof db.user.findUnique>> & { events?: any[] })
    | null = null;

  try {
    user = await db.user.findUnique({
      where: { email: userEmail },
      include: { events: true },
    });
  } catch {
    // swallow DB errors so build/SSR never fails
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome {session.user?.name ?? session.user?.email ?? "friend"}!
      </p>

      <h2 style={{ marginTop: 24 }}>Your recent events</h2>
      {user?.events && user.events.length > 0 ? (
        <ul>
          {user.events.map((e: any) => (
            <li key={e.id}>{e.slug ?? e.childName ?? "Event"}</li>
          ))}
        </ul>
      ) : (
        <p>No events yet.</p>
      )}
    </div>
  );
}
