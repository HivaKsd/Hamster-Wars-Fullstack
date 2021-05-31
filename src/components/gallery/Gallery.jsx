import { useEffect, useState } from "react"
import { useMountedRef } from '../../hooks/useMountedRef'
import './Gallery.css'
import HamsterForm from '../hamsterForm/HamsterForm'


const Gallery = () => {
  const [hamsters, setHamsters] = useState(null)
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

  function checkHamsterInfo(hamster) {
    console.console.log(hamster);
  }

  return (
    <section className="border">
      <div className="container">
          {hamsters
            ? hamsters.map(hamster => (
                <div key={hamster.id} className='galleryItem' onClick={() => checkHamsterInfo(hamster)}>

                  <p>{hamster.name}</p>

                  <div className='galleryItemImg' style={{backgroundImage: `url(img/${hamster.imgName})` }}></div> //src={` ../public/img/${hamster.imgName} `}

                  <button onClick={() => removeHamster(hamster.id)}>Remove</button>
                </div>
            ))
            : 'Hämtar hamsters fråm API...'
          }
        </div>
        <HamsterForm />
      </section>
  )
}


export default Gallery
