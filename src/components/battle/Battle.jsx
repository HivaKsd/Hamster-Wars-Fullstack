import { useState, useEffect } from 'react'
import { useMountedRef } from '../../hooks/useMountedRef'
import HamsterCardBattle from './HamsterCardBattle'
//import HamsterInfo from '../hamsterInfo/HamsterInfo'
import './Battle.css'


const Battle = () => {
  const [hamsterWinner, setHamsterWinner] = useState(null)
  const [hamsterLoser, setHamsterLoser] = useState(null)
  const [showMatchResult, setShowMatchResult] = useState(false)
  const [winner, setWinner] = useState(null)

  const isMounted = useMountedRef()
  const defaultString = 'Waiting for a winner...'

  useEffect(() => {
    async function get() {
      const winnerHamster  = await getRandomHamster()
      const loserHamster  = await recursivelyGetLoserHamster(winnerHamster)

      if (isMounted.current) {
        setHamsterWinner(winnerHamster)
        setHamsterLoser(loserHamster)
      }
    }
    get()
  }, [isMounted])

  async function declareWinner(winner, loser) {
    if ("showMatchResult") {
      setWinner(winner)
      if (winner === hamsterWinner) {
        const hamsterWinnerCopy = hamsterWinner
        hamsterWinnerCopy.wins = (hamsterWinnerCopy.wins + 1)
        hamsterWinnerCopy.games = (hamsterWinnerCopy.games + 1)

        const hamsterLoserCopy = hamsterLoser
        hamsterLoserCopy.defeats = (hamsterLoserCopy.defeats + 1)
        hamsterLoserCopy.games = (hamsterLoserCopy.games + 1)

        setHamsterWinner(hamsterWinnerCopy)
        setHamsterLoser(hamsterLoserCopy)

      }else {
        const hamsterLoserCopy = hamsterLoser
        hamsterLoserCopy.wins = (hamsterLoserCopy.wins + 1)
        hamsterLoserCopy.games = (hamsterLoserCopy.games + 1)

        const hamsterWinnerCopy = hamsterWinner
        hamsterWinnerCopy.defeats = (hamsterWinnerCopy.defeats + 1)
        hamsterWinnerCopy.games = (hamsterWinnerCopy.games + 1)

        setHamsterWinner(hamsterWinnerCopy)
        setHamsterLoser(hamsterLoserCopy)
      }

      await fetch(`/hamsters/${winner.id}/win`, {method: 'PUT'})
      await fetch(`/hamsters/${loser.id}/lose`, {method: 'PUT'})

      setShowMatchResult(true)
    }
  }

  async function startNewMatch() {
    setShowMatchResult(false)
    const winnerHamster = await getRandomHamster()
    const loserHamster = await recursivelyGetLoserHamster(winnerHamster)

    setHamsterWinner(winnerHamster)
    setHamsterLoser(loserHamster)
  }

  async function getRandomHamster() {
    const response = await fetch('/hamsters/random', {method: 'GET'})
    const hamster = await response.json()
    return hamster
  }

  async function recursivelyGetLoserHamster(winnerHamster) {
    let loserHamsterCandidate = await getRandomHamster()

    if (winnerHamster.id === loserHamsterCandidate.id) {
      return await recursivelyGetLoserHamster(winnerHamster);
    }
    else {
      return loserHamsterCandidate;
    }
  }


  return (
  <section className='battleBackground'>
    <div className='battle'>
      {hamsterWinner ?
        <div className={'battleParticipant ' + (hamsterWinner === winner ? 'winner ' : '') + (showMatchResult ? '' : 'active ')} onClick={() => declareWinner(hamsterLoser, hamsterWinner)}>
            <HamsterCardBattle hamster={hamsterWinner} />
        </div>
        : defaultString}

        <p>VS</p>

        {hamsterLoser ?
          <div className={'battleParticipant ' + (hamsterLoser === winner ? 'winner ' : '') + (showMatchResult ? '' : 'active ')} onClick={() => declareWinner(hamsterLoser, hamsterWinner)}>
              <HamsterCardBattle hamster={hamsterLoser} />
          </div>
          : defaultString}
      </div>

      {showMatchResult ?
        <div className='showResult'>
          <h2>"<b>{hamsterWinner.name}</b>" is the winner of this round!</h2>
          <div>
            <div>
              <h4>{hamsterWinner.name}</h4>
              <p>Games: {hamsterWinner.games}</p>
              <p>Wins: {hamsterWinner.wins}</p>
              <p>Defeats: {hamsterWinner.defeats}</p>
            </div>
            <div></div>
            <div>
              <h4>{hamsterLoser.name}</h4>
              <p>Games: {hamsterLoser.games}</p>
              <p>Wins: {hamsterLoser.wins}</p>
              <p>Defeats: {hamsterLoser.defeats}</p>
            </div>
          </div>

          <button onClick={startNewMatch}>Start Again</button>
        </div>
      : ''
      }

    </section>
  )
}

export default Battle
