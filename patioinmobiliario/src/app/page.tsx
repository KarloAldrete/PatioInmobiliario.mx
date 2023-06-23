import Image from 'next/image'
import '../styles/index.css'

import { BsBookmarkHeart } from 'react-icons/bs'
import { PiBathtubFill } from 'react-icons/pi'
import { FaBed } from 'react-icons/fa'
import { BsFillCarFrontFill } from 'react-icons/bs'

import house from '../images/house.jpg'

export default function Home() {

  return (
    <main>

      <div className='properties-available'>

        <div className='property'>

          <div className='property-image'>

            <Image src={house} priority={true} alt='house' />

          </div>

          <div className='property-info'>

            <div className='location'>

              <h3>Otay Insurgentes</h3>

              <p>Tijuana, Baja California Norte</p>

            </div>

            <div className='status'>

              <div className='label'>

                <p>Renta</p>

              </div>

              <div className='details'>

                <div className='item'>

                  <p>3</p>

                  <FaBed className='bed-icon' />

                </div>

                <div className='item'>

                  <p>2</p>

                  <PiBathtubFill className='bath-icon' />

                </div>

                <div className='item'>

                  <p>2</p>

                  <BsFillCarFrontFill className='car-icon' />

                </div>

              </div>

            </div>

            <div className='price'>

              <p>$1,200 USD</p>

            </div>

          </div>

        </div>

      </div>

    </main>
  )

}