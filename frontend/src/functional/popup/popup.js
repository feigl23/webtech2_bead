import React from 'react';
import './popup.scss';

const Popup = (props) => {
    return (
        <div className={"popup"}>
            <div className={"popup__inner"}>
                <div className={"popup__inner--header"}>
                    <span className={"popup__inner--header__error"}
                        onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
                        {props.error ? "*Error please hover me to find out what is it*" : ""} </span>
                    <p className={"popup__inner--header__exit"} onClick={props.exit}>X</p>
                </div>
                <div className={"popup__inner--content"}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Popup;