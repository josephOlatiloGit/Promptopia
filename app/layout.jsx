import "../styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadate = {
  title: "Promptomia",
  description: "Discover & Share AI Prompt",
};

import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}