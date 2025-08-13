import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // keep page server-rendered; avoids static export issues

export default async function Dashboard() {
  // Get the session for the current request
  const session = await getServerSession();

  // If not signed in, send to /signin
  if (!session) {
    redirect("/signin");
  }

  // Safe display name
  const displayName = session.user?.name ?? session.user?.email ?? "friend";

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {displayName}!</p>

      <h2 style={{ marginTop: 24 }}>Your recent events</h2>
      <p>No events yet.</p>
    </div>
  );
}
