type Props = { params: { id: string } };

export function generateMetadata({ params }: Props) {
  return { title: `Event ${params.id} · MitzvahJoy` };
}

export default function EventDetailPage({ params }: Props) {
  return (
    <main>
      <h1>Event #{params.id}</h1>
      <p>Details for this event will go here.</p>
      <p><a href="/events">← Back to events</a></p>
    </main>
  );
}
