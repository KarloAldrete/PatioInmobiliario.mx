import './globals.css'
import Navbar from '../components/Navbar'

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

    <html>

      <body>

        <Navbar />

        {children}

      </body>

    </html>

  )

}
