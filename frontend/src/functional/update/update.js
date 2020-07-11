import React from 'react';
import "./update.scss";

const Update = (props) => {

    return (
        <form className={"update"}>
            <div className={"add__first"}>
                <input className={"update__first--input"}
                    placeholder={"Title"} name={"title"} required defaultValue={props.data.title} onChange={props.onChange}></input>
                <input className={"update__first--input"}
                    placeholder={"Author"} name={"author"} required defaultValue={props.data.author} onChange={props.onChange}></input>
                <input className={"update__first--input"}
                    placeholder={"Published"} name={"published"} required defaultValue={props.data.published} onChange={props.onChange}></input>
                <input className={"update__first--input"}
                    placeholder={"Genre"} name={"genre"} required 
                    defaultValue={props.data.genre} onChange={props.onChange}></input>
            </div>
            <div className={"update__second"}>
                <textarea className={"update__second--textarea"} required placeholder={"Description"} name={"description"} defaultValue={props.data.description} onChange={props.onChange}></textarea>
                <div className={"update__second--buttons"}>
                    <button className={"update__second--buttons__button"}
                        type={"submit"} onClick={props.onClick} disabled={props.disabled}> 
                        <span className={"add__second--button__text"}>Update</span></button>
                    <button className={"update__second--buttons__button"}
                        type={"submit"} onClick={props.delete}> 
                        <span className={"add__second--button__text"}>Delete</span></button>
                </div>
            </div>
        </form>
    );
}

export default Update;