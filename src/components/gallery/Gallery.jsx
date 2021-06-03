import { useEffect, useState } from 'react'
import { useMountedRef } from '../../hooks/useMountedRef'
import './Gallery.css'
import HamsterForm from '../hamsterForm/HamsterForm'
import HamsterCard from './HamsterCard'
import HamsterInfo from '../hamsterInfo/HamsterInfo'


const Gallery = () => {
  const [hamsters, setHamsters] = useState(null)
  const [selectedHamster, setSelectedHamster] = useState(null)
  const isMounted = useMountedRef()

  useEffect(() => {
    async function get() {
        if (isMounted.current) {
            setHamsters(await getHamsters())
        }
      }
      get()
    }, [isMounted])

  async function getHamsters() {
    const response = await fetch('/hamsters', { method: 'GET'})
    return await response.json()
  }

  async function removeHamster(hamsterId) {
    await fetch(`/hamsters/${hamsterId}`, { method: 'DELETE'})
    setHamsters(await getHamsters())
  }

  function openHamsterInfo(hamster) {
    setSelectedHamster(hamster)
  }

  function closeHamsterInfo(hamster) {
    setSelectedHamster(null)
  }

  return (
    <div>
      {selectedHamster ?
        <div>
          <div className='darkBackground' onClick={() => closeHamsterInfo()}></div>

          <HamsterInfo hamster={selectedHamster}/>

        </div>
      : ''
      }

      <div className="gallery">
          {hamsters
            ? hamsters.map(hamster => (

                <div key={hamster.id} className='galleryItem' onClick={() => openHamsterInfo(hamster)}>
                  <HamsterCard hamster={hamster} />
                  <button onClick={(e) => {e.stopPropagation(); removeHamster(hamster.id)} }>Remove</button>
                </div>

            ))
            : 'Hämtar hamsters fråm API...'
          }
        </div>
        <div>
        <HamsterForm />
        </div>
    </div>
  )
}


export default Gallery
