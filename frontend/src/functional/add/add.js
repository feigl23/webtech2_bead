import React from 'react';
import "./add.scss";

const Add = (props) => {
    return (
        <form className={"add"}>
            <div className={"add__first"}>
                <input className={"add__first--input"} required 
                    placeholder={"Title"} name="title" onChange={props.onChange}></input>
                <input className={"add__first--input"} required
                    placeholder={"Author"} name="author" onChange={props.onChange}></input>
                <input className={"add__first--input"} required
                    placeholder={"Published"} name="published" onChange={props.onChange}></input>
                <input className={"add__first--input"} required
                    placeholder={"Genre"} name="genre" onChange={props.onChange}></input>
            </div>
            <div className={"add__second"}>
                <textarea className={"add__second--textarea"} required
                    placeholder={"Description"} name="description" onChange={props.onChange}></textarea>
                <button className={"add__second--button"} disabled={props.disabled}
                 type={"submit"} onClick={props.onClick}><span className={"add__second--button__text"}>Add</span></button>
            </div>
        </form>
    );
}

export default Add;