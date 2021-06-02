import './HamsterInfo.css'

function infoBox(props) {
  console.log('props.hamster: ', props.hamster);

  return (
    <div>
      <div className='infoBox'>
        <div>
          <p>Name: {props.hamster.name}</p>
          <p>Age: {props.hamster.age}</p>
          <p>Loves: {props.hamster.loves}</p>
          <p>Favorite food: {props.hamster.favFood}</p>
          <p>Games: {props.hamster.games}</p>
          <p>Wins: {props.hamster.wins}</p>
          <p>Defeats: {props.hamster.defeats}</p>
        </div>
        <div className='infoBoxImg' style={{backgroundImage: `url(img/${props.hamster.imgName})`}}>
        </div>
      </div>
    </div>
  );
}

export default infoBox;
