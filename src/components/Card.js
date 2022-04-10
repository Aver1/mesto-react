function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }
  
  return (
    <div className="card">
      <button className="card__delete"></button>
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="card__container">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-group">
          <button className="card__like" type="button"></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;