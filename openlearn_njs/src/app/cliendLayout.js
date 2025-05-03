"use client";
import Script from "next/script";
import Nav from "@/components/Nav";

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <link rel="stylesheet" href="/css/style.css" precedence="default" />
      </head>
      <body>
        <Nav/>
        {children}
        <footer className="footer">
        &copy; copyright @ 2025 by <span>Thammasat University</span> | all rights reserved!
        </footer>
      </body>
    </html>
  );
}
