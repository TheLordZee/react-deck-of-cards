import "./Card.css"

const Card = ({img, rot, suit, value}) => (
    <img className="Card" alt={`${value} of ${suit}`} src={img} style={{transform: `rotate(${rot}deg)`}}/>
)

export default Card;