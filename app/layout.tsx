import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";
import Preloader from "@/components/ui/Preloader";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const quicksand = Quicksand({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aleef Veterinary Clinic | Compassionate Pet Care in Abu Dhabi",
  description:
    "Aleef Veterinary Clinic provides compassionate, modern veterinary care for your pets in Abu Dhabi. From wellness exams to surgery, grooming, and ultrasound — we care for your furry family members every step of the way.",
  keywords: [
    "veterinary clinic Abu Dhabi",
    "pet care",
    "vet Abu Dhabi",
    "dog vet",
    "cat vet",
    "pet grooming",
    "pet surgery",
    "animal hospital",
  ],
  openGraph: {
    title: "Aleef Veterinary Clinic | Compassionate Pet Care in Abu Dhabi",
    description:
      "Modern veterinary services for your pets — grooming, check-ups, surgery, and ultrasound in Abu Dhabi.",
    type: "website",
    locale: "en_AE",
    siteName: "Aleef Veterinary Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aleef Veterinary Clinic | Compassionate Pet Care in Abu Dhabi",
    description:
      "Modern veterinary services for your pets — grooming, check-ups, surgery, and ultrasound in Abu Dhabi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${quicksand.variable}`}>
      <body className="font-sans antialiased">
        <noscript>
          <style>{`.reveal-init { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
