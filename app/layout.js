import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import Shell from "@/components/Shell";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "AR Swift Hiring",
  description: "Applications and interviews in one place.",
};

export const viewport = {
  themeColor: "#0a1640",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plex.className}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
