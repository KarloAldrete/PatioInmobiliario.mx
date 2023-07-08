import './globals.css'
import 'animate.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from "@clerk/localizations";

export const metadata = {
  title: 'Patio Inmobiliario',
  description: 'La plataforma de inmuebles más grande de Latinoamérica'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <ClerkProvider localization={esES}>

      <html>

        <head>

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />

        </head>

        <body>

          <Navbar />

          {children}

          <Footer />

        </body>

      </html>

    </ClerkProvider>

  )

}
