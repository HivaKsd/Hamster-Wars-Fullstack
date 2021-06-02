import './HamsterCard.css'

function HamsterCard(props) {
  return (
    <div key={props.hamster.id} className='hamsterCard'>

      <p>{props.hamster.name}</p>

      <div className='hamsterCardImg' style={{backgroundImage: `url(img/${props.hamster.imgName})` }}></div>

    </div>
  );
}

export default HamsterCard;
