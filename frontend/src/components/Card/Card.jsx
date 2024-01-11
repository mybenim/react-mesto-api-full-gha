import { useContext, useState } from "react"
import CurrentUserContext from "../../context/CurrentUserContext.js";
import api from "../../utils/api.jsx";

export default function Card({ card, onCardClick, onDelete }) {
    const currentUser = useContext(CurrentUserContext)

    const [isLiked, setIsLiked] = useState(card.likes.some(element => currentUser._id === element._id))
    const [count, setCount] = useState(card.likes.length);

    function handleLike() {
        const apiCall = isLiked ? api.deleteLike(card._id, localStorage.jwt) : api.addLike(card._id, localStorage.jwt);
        apiCall.then(res => {
            setIsLiked(!isLiked);
            setCount(res.likes.length);
        })
        .catch(error => console.error(`Ошибка при ${isLiked ? "снятии" : "добавлении"} лайка ${error}`));
    } 

    return (
        <article className="card">
            {/* только мои корзины */}
           {/* currentUser._id === card.owner._id && <button type="button" className="card__basket" onClick={() => onDelete(card._id)}/> */}
            
            {currentUser._id === card.owner && <button type="button" className="card__basket" onClick={() => onDelete(card._id)}/>}

            {/*<button className="card__basket" onClick={onDelete} />*/}
            <img
                src={card.link}
                className="card__item-img"
                alt={`Изображение ${card.name}`}
                onClick={() => onCardClick({link: card.link, name: card.name})}
            />

            <div className="card__group">
                <h2 className="card__title">{card.name}</h2>
                <div>
                    <button className={`card__like-icon ${isLiked ? "card__button-like" : ""}`} onClick={handleLike} />
                        <p className="card__like-counter">{count}</p>
                </div>   
            </div>
        </article>
        )
    }
