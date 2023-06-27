import '../styles/index.css'

import Properties from '../modules/Properties/properties'

export default function Home() {

  return (
    <main>
      <title>PatioIn... | Inicio</title>

      <div className='filters' style={{ border: '1px solid red' }}>
      </div>

      <Properties />

    </main>
  )

}