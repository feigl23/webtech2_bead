import React from 'react';
import './card.scss';

const Card = (props) => {
    return (
        <div className={"card"} onClick={props.onClick}>
            <div className={"card__content"}>
                <h2 className={"card__content--text"}>{props.data.title}</h2>
                <h2 className={"card__content--text"}>{props.data.author}</h2>
                <h2 className={"card__content--text"}>{props.data.published}</h2>
                <h2 className={"card__content--text"}>{props.data.genre}</h2>
                <h2 className={"card__content--text"}>{props.data.description}</h2>
            </div>
        </div>
    );
}

export default Card;