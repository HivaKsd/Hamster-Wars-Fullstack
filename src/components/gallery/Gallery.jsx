import { useEffect, useState } from "react"
import { useMountedRef } from '../../hooks/useMountedRef'
import './Gallery.css'
import HamsterForm from '../hamsterForm/HamsterForm'
import HamsterCard from './HamsterCard'


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
    console.log(hamster);
  }

  return (
    <section className="gallery">
      <div className="container">
          {hamsters
            ? hamsters.map(hamster => (

                <div> <HamsterCard /> } </div>

            ))
            : 'Hämtar hamsters fråm API...'
          }
        </div>
        <HamsterForm />
      </section>
  )
}


export default Gallery
