"use client";
import Nav from "@/components/Nav";
import { useEffect } from "react";

export default function ClientLayout({ children }) {
  useEffect(() => {
    const fetchRefreshToken = () => {
      fetch(process.env.NEXT_PUBLIC_REFRESH_TOKEN, {
        method: "POST",
        credentials: "include",
      }).then(res => {
        if (!res.ok) {
          throw new Error ("Error refreshing token")
        }
        console.log("Access token refreshed via cookie");
      }).catch(e => {
        console.error("Failed to refresh token:", e);
      })
    }

    fetchRefreshToken();

    const interval = setInterval(fetchRefreshToken, 60 * 3 * 1000);

    return () => clearInterval(interval);
  }, [])
  
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
