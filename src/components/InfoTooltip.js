
import okPic from '../images/ok.svg'
import noOkPic from '../images/deny.svg'

function InfoTooltip (props) {

  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <img className="popup__image-header" src={`${props.isOk ? okPic : noOkPic}`}/>
          <p className="popup__text">{props.title}</p>
          <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
        </div>
      </section>
  )
}

export default InfoTooltip;