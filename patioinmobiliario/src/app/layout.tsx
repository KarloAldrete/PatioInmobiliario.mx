import type { Metadata } from "next"
import Navbar from '@/components/navbar'
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Patio Inmobiliario",
  description: "Diseños unicos, espacios que inspiran. Tu próximo inmueble te espera.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <AuthProvider>
        <body className="w-full h-full">
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
