import React from 'react';
import './tooltip.scss';

const Tooltip = (props) => {
    return (
        <div className={"tooltip"}>
            <h1 className={"tooltip__title"}>Errors:</h1>
            <div className={"tooltip__content"}>
                
                    <h1 className={"tooltip__content--text"}>{props.error.fields}</h1>
                    <h1  className={"tooltip__content--text"}>{props.error.number}</h1>
              
            </div>
        </div>
    );
}

export default Tooltip;