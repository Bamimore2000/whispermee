import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";
import localFont from "next/font/local";
const myFont = localFont({
  src: "../fonts/jetbrainsmono-regular.woff2",
});

export const metadata = {
  title: "WhisperMe",
  description: "Simple, secure, anonymous",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={myFont.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
