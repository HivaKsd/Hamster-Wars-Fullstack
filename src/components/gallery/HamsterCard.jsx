


function HamsterCard() {
  return (
    <div key={hamster.id} className='galleryItem' onClick={() => checkHamsterInfo(hamster)}>

      <p>{hamster.name}</p>

      <div className='galleryItemImg' style={{backgroundImage: `url(../public/img/${hamster.imgName})` }}></div>

      <button onClick={() => removeHamster(hamster.id)}>Remove</button>
    </div>
  );
}

export default HamsterCard;
