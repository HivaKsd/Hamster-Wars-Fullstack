import { useState, useEffect } from 'react'
import { useMountedRef } from '../../hooks/useMountedRef'



const Battle = () => {
  const [hamsterWinner, setHamsterWinner] = useState(null)
  const [hamsterLoser, setHamsterLoser] = useState(null)
  const [newMatchInitiator, setNewMatchInitiator] = useState(false) //to see that useEffect runs every setInputName

  const isMounted = useMountedRef()
  const defaultString = 'Waiting for a winner...'

  useEffect(() => {
    async function get() {
      const winner  = await getRandomHamster()
      const loser  = await recursivelyGetLoserHamster(winner)

      if (isMounted.current) {
        setHamsterWinner(winner)
        setHamsterLoser(loser)
      }
    }
    get()
  }, [isMounted, newMatchInitiator])

  async function declareWinner(winnerId, loserId) {
    await fetch(`/hamsters/${winnerId}/win`, {method: 'PUT'})
    await fetch(`/hamsters/${loserId}/lose`, {method: 'PUT'})
    setNewMatchInitiator(!newMatchInitiator)
  }

  async function getRandomHamster() {
    const response = await fetch('/hamsters/random', {method: 'GET'})
    const hamster = await response.json()
    return hamster
  }

  async function recursivelyGetLoserHamster(winner) {
    let loserHamsterCandidate = await getRandomHamster()

    if (winner.id === loserHamsterCandidate.id) {
      await recursivelyGetLoserHamster(winner);
    }
    else {
      return loserHamsterCandidate;
    }
  }

  return (
    <div>
        <button onClick={()=> declareWinner(hamsterWinner.id, hamsterLoser.id)}>{hamsterWinner ? hamsterWinner.name : defaultString}</button>
        <br/>VS<br/>
        <button onClick={()=> declareWinner(hamsterLoser.id, hamsterWinner.id)}>{hamsterLoser ? hamsterLoser.name : defaultString}</button>
    </div>
  )
}

export default Battle
