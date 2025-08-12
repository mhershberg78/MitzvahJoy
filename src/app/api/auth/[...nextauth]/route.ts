export const runtime = 'nodejs';
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const handler = NextAuth({
  providers: [
    EmailProvider({
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await transporter.sendMail({
          to: email,
          from: process.env.SMTP_FROM,
          subject: "Your MitzvahJoy sign-in link",
          text: `Sign in: ${url}`,
          html: `<p>Sign in: <a href="${url}">${url}</a></p>`
        });
      }
    })
  ],
  pages: { signIn: "/signin" },
  secret: process.env.NEXTAUTH_SECRET
});
export { handler as GET, handler as POST };
