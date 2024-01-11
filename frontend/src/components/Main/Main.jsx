import Card from "../Card/Card.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import Header from "../Header/Header.jsx";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards, onSignOut, userEmail, loggedIn, isLoading }) {
    
  const currentUser = useContext(CurrentUserContext)

  return (
    <>
    <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={onSignOut} />
    
    <main className="main">

      <section className="profile page__profile">
        <div className="profile__info">
          <button
            type="button"
            className="profile__image"
            onClick={onEditAvatar}>
              <img src={currentUser.avatar ? currentUser.avatar : "#"}
                  className="profile__avatar"
                  alt="Ваше фото"
                  name="avatar"
              />
          </button>

          <div className="profile__box">
            <h1 className="profile__title" >{currentUser.name ? currentUser.name : ""}</h1>

            <button
              type="button"
              aria-label="Редактировать"
              className="profile__square"
              onClick={onEditProfile}
            />

            <p className="profile__subtitle">{currentUser.about ? currentUser.about : ""}</p>
          </div>

          <button
            aria-label="плюс"
            type="button"
            className="profile__rectangle" onClick={onAddPlace}
          />
        </div>
      </section>

        <section className="element page__element">
          <ul className="element__list">
            {Array.isArray(cards) && cards.map(data => {
              return (
                <Card card={data}
                    key={data._id}
                    onCardClick={onCardClick}
                    onDelete={onDelete} 
                />
              )
            })}
          </ul>
        </section>
      </main>
      </>
    )
}
