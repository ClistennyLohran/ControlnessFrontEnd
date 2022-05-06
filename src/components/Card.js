import './Card.css';

const Card = ({cardClass, iconClass, textClass, valueClass, icon, text, value}) => {
  return (
    <div className={cardClass}>
      <div className="topContent">
        <p className={textClass}>{text}</p>
        <p className={iconClass}>{icon}</p>
      </div>
      <h1 className={valueClass}>{value}</h1>
    </div>
  );
}

export default Card;