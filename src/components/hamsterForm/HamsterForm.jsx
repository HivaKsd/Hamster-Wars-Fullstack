import { useState } from 'react'

const HamsterForm = () => {
  const [inputName, setInputName] = useState('default')
  const [inputAge, setInputAge] = useState(0)
  const [inputFavFood, setInputFavFood] = useState('default')
  const [inputLoves, setInputLoves] = useState('default')
  const [inputImgName, setInputImgName] = useState('default')
  const [wins] = useState(0)
  const [defeats] = useState(0)
  const [games, setGames] = useState(0)

async function postHamster() {

  if (inputName.length === 0) {
    console.console.log('You need to enter a name for every hamster!');
    return
  }
  if (inputAge.length === 0) {
    console.console.log('You need to enter the age for every hamster!');
    return
  }
  if (inputFavFood.length === 0) {
    console.console.log('You need to enter a favorite food for every hamster!');
    return
  }
  if (inputLoves.length === 0) {
    console.console.log('You need to enter what every hamster loves!');
    return
  }
  if (inputImgName.length === 0) {
    console.console.log('You need to enter an image name for every hamster!');
    return
  }
  setGames(wins + defeats)

const formData = {
  'name': inputName,
  'age': Number(inputAge),
  'favFood': inputFavFood,
  'loves': inputLoves,
  'imgName': inputImgName,
  'wins': wins,
  'defeats': defeats,
  'games': games
}

console.log('formData: ', formData);

await fetch(`/hamsters`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
}
return (
  <section>
  <div>
    <lable>
        Name:
        <input onChange={event => {
            console.log('controlled change', event.target.value);
            setInputName(event.target.value.toUpperCase())
          }}
          value={inputName}
        />
    </lable>
  </div>
  <div>
    <lable>
        Age:
        <input onChange={event => {
            console.log('controlled change', event.target.value);
            setInputAge(event.target.value)
          }}
          value={inputAge}
        />
    </lable>
  </div>
  <div>
    <lable>
        Favorite Food:
        <input onChange={event => {
            console.log('controlled change', event.target.value);
            setInputFavFood(event.target.value)
          }}
          value={inputFavFood}
        />
    </lable>
  </div>
  <div>
    <lable>
        Loves:
        <input onChange={event => {
            console.log('controlled change', event.target.value);
            setInputLoves(event.target.value)
          }}
          value={inputLoves}
        />
    </lable>
  </div>
  <div>
    <lable>
        Image Name:
        <input onChange={event => {
            console.log('controlled change', event.target.value);
            setInputImgName(event.target.value)
          }}
          value={inputImgName}
        />
    </lable>
  </div>


  <button onClick={postHamster}> Post Hamster </button>
  </section>
)
}

export default HamsterForm