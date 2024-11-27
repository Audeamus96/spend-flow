import type { Metadata } from "next";
import Header from "./components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Spend Flow",
  description: "idk dude",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
