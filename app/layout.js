import "./globals.css";

export const metadata = {
  title: "Maren — Destination living, redefined",
  description:
    "Maren is a collection of private villas in the world's most storied destinations, arranged by a dedicated host and cared for as if they were our own.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F4F1EA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
