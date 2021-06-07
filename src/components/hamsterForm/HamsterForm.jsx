import { useState } from 'react'
import './HamsterForm.css'

const HamsterForm = () => {
  const [inputName, setInputName] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [inputAge, setInputAge] = useState('')
  const [ageTouched, setAgeTouched] = useState(false)
  const [inputFavFood, setInputFavFood] = useState('')
  const [inputLoves, setInputLoves] = useState('')
  const [inputImgName, setInputImgName] = useState('')
  const [imgNameTouched, setImgNameTouched] = useState(false)
  const [wins] = useState(0)
  const [defeats] = useState(0)
  const [games, setGames] = useState(0)

  let nameIsValid: boolean = true
	let nameErrorMessage: string = ''
  let nameClass = ''
  if( inputName === '' ) {
  		nameIsValid = false
  		nameErrorMessage = "Please enter the hamster's name!"
  	}
    if (nameTouched) {
      nameClass = (nameIsValid ? 'valid' : 'error')
    }

    let ageIsValid: boolean = true
  	let ageErrorMessage: string = ''
    let ageClass = ''
    if( inputAge === '' ) {
    		ageIsValid = false
    		ageErrorMessage = "Please enter the hamster's age!"
    	}
      if (ageTouched) {
        ageClass = (ageIsValid ? 'valid' : 'error')
      }

      let imgNameIsValid: boolean = true
    	let imgNameErrorMessage: string = ''
      let imgNameClass = ''
      if( inputImgName === '' ) {
      		imgNameIsValid = false
      		imgNameErrorMessage = "Please enter the hamster's imageName!"
      	}
        if (imgNameTouched) {
          imgNameClass = (imgNameIsValid ? 'valid' : 'error')
        }





  let formIsInvalid = !nameIsValid || !ageIsValid || !imgNameIsValid



  async function postHamster() {

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
  <section className="hamsterForm">
  <legend>Add New Hamster</legend>
  <div>
    <label>
        <p>Name (required):</p>
        <input type="text"
               onBlur={() => setNameTouched(true)}
               onChange={event => {
               console.log('controlled change', event.target.value);
               setInputName(event.target.value)
          }}
          value={inputName}
          className={nameClass}
        />
        {nameTouched ? <div className="message"> {nameErrorMessage} </div> : null}
    </label>
  </div>
  <div>
    <label>
        <p>Age (required):</p>
        <input type="text"
               onBlur={() => setAgeTouched(true)}
               onChange={event => {
               console.log('controlled change', event.target.value);
               setInputAge(event.target.value)
          }}
          value={inputAge}
          className={ageClass}
        />
        {ageTouched ? <div className="message"> {ageErrorMessage} </div> : null}
    </label>
  </div>
  <div>
    <label>
        <p>Favorite Food:</p>
        <input onChange={event => {
            console.log('controlled change', event.target.value);
            setInputFavFood(event.target.value)
          }}
          value={inputFavFood}
        />
    </label>
  </div>
  <div>
    <label>
        <p>Loves:</p>
        <input onChange={event => {
            console.log('controlled change', event.target.value);
            setInputLoves(event.target.value)
          }}
          value={inputLoves}
        />
    </label>
  </div>
  <div>
    <label>
        <p>Image Name (required):</p>
        <input type="text"
               onBlur={() => setImgNameTouched(true)}
               onChange={event => {
               console.log('controlled change', event.target.value);
               setInputImgName(event.target.value)
          }}
          value={inputImgName}
          className={imgNameClass}
        />
        {imgNameTouched ? <div className="message"> {imgNameErrorMessage} </div> : null}
    </label>
  </div>

  <p></p>
  <button onClick={postHamster} disabled={formIsInvalid}> Add Hamster </button>
  </section>
)
}

export default HamsterForm
