import './HamsterCardBattle.css'

function HamsterCard(props) {
  return (
    <div key={props.hamster.id} className='hamsterCard'>

    <p>Name: {props.hamster.name}</p>
    <p>Age: {props.hamster.age}</p>
    <p>Loves: {props.hamster.loves}</p>
    <p>Favorite food: {props.hamster.favFood}</p>

      <div className='hamsterCardImg' style={{backgroundImage: `url(img/${props.hamster.imgName})` }}></div>

    </div>
  );
}

export default HamsterCard;
