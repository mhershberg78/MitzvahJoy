import { Resend } from "resend";
import postmark from "postmark";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const postmarkClient = process.env.POSTMARK_SERVER_TOKEN ? new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN) : null;

const FROM = process.env.NOTIFY_FROM || "receipts@localhost";
const FALLBACK = process.env.NOTIFY_ADMIN_FALLBACK || "";

type Payload = {
  charityEmail: string | null | undefined;
  donorName?: string | null;
  donorEmail?: string | null;
  amountCents: number;
  currency: string;
  eventChild: string;
  eventType: string;
  charityName: string;
  createdAtISO: string;
};

export async function sendReceiptRequestEmail(data: Payload) {
  const to = (data.charityEmail && data.charityEmail.trim()) || FALLBACK;
  if (!to) return { skipped: true, reason: "no-destination" };

  const subject = `Receipt request: ${data.eventChild} (${data.eventType}) – ${data.charityName}`;
  const amount = (data.amountCents/100).toFixed(2) + " " + data.currency.toUpperCase();
  const html = `<p>Hello ${data.charityName},</p>
  <p>A donor requested a charitable tax receipt via MitzvahJoy.</p>
  <ul>
    <li><b>Donor:</b> ${data.donorName || "—"} (${data.donorEmail || "—"})</li>
    <li><b>Amount to charity (10%):</b> ${amount}</li>
    <li><b>Event:</b> ${data.eventChild} (${data.eventType})</li>
    <li><b>Date:</b> ${data.createdAtISO}</li>
  </ul>
  <p>Please issue a CRA-compliant receipt to the donor.</p>`;
  const text = `Donor: ${data.donorName || "—"} (${data.donorEmail || "—"})\nAmount: ${amount}\nEvent: ${data.eventChild} (${data.eventType})\nDate: ${data.createdAtISO}`;

  if (resend) { await resend.emails.send({ from: FROM, to, subject, html, text }); return { ok: true, provider: "resend" }; }
  if (postmarkClient) { await postmarkClient.sendEmail({ From: FROM, To: to, Subject: subject, HtmlBody: html, TextBody: text }); return { ok: true, provider: "postmark" }; }
  return { skipped: true, reason: "no-provider" };
}
