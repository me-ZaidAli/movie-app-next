import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import "./globals.css";
import { Navbar } from "./components";
import SessionProvider from "./SessionProvider";

export const metadata: Metadata = {
  title: "TMDB Movie App",
  description: "App to search for movies",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession();

  return (
    <html lang="en" className="dark h-full">
      <body className="h-full">
        <SessionProvider session={session}>
          <Navbar />
        </SessionProvider>
        <main className="py-10 px-20 h-screen">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
