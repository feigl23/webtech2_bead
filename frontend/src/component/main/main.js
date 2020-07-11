import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './main.scss';
import Add from '../../functional/add/add';
import Popup from '../../functional/popup/popup';
import Update from '../../functional/update/update';
import Axapi from '../../context/Axapi';
import Card from '../../functional/card/card';
import Tooltip from '../../functional/tooltip/tooltip';

class Main extends Component {

    constructor() {
        super();

        this.state = {
            showPopup: false,
            popupContent: {},
            currentBook: {},
            copyBook: [],
            books: [],
            error: "",
            popupError: false,
            errorList: {
                fields: "",
                number: ""
            },
            filter: "title",
            activeClasses: [true, false, false, false, false],
            showTooltip: false,
            placeholder:"Search by title..."

        }

        this.token = localStorage.getItem("token");
    }
    addActiveClass(index) {
        const temp = [false, false, false, false, false];
        const activeClasses = [...temp.slice(0, index), !this.state.activeClasses[index], temp.slice(index + 1)].flat();
        this.setState({ activeClasses: activeClasses });
    }

    componentDidMount() {
        this.getBooks();
    }

    logout() {
        localStorage.setItem("token", "");

        this.props.history.push("/");
    }

    showTooltip() {
        this.setState({ showTooltip: !this.state.showTooltip });
    }

    addBook = async e => {
        e.preventDefault();
        const isValid = this.validateInput();
        if (isValid) {
            await Axapi("/books", {
                method: "POST",
                headers: {
                    "x-access-token": this.token
                },
                data: {
                    title: this.state.currentBook.title,
                    author: this.state.currentBook.author,
                    published: this.state.currentBook.published,
                    genre: this.state.currentBook.genre,
                    description: this.state.currentBook.description
                }
            })
                .then(resp => {
                    if (resp.status === 200) {
                        const booksArray = this.state.books;
                        booksArray.push(resp.data);
                        const copyBooksArray = this.state.copyBook;
                        copyBooksArray.push(JSON.parse(JSON.stringify(resp.data)));
                        this.setState({ showPopup: !this.state.showPopup });
                        this.setState({ books: booksArray });
                        this.setState({ copyBook: copyBooksArray });
                        this.setState({ popupError: false });
                    } else {
                        this.setError(resp);
                    }
                    //
                })
                .catch(err => {
                    this.setError(err);
                })
        }

    }



    updateBook = async e => {
        e.preventDefault();
        const isValid = this.validateInput();
        const data = {
            _id: this.state.currentBook._id,
            title: this.state.currentBook.title,
            author: this.state.currentBook.author,
            published: this.state.currentBook.published,
            genre: this.state.currentBook.genre,
            description: this.state.currentBook.description
        }
        if (isValid) {
            await Axapi(`/books/${this.state.currentBook._id}`, {
                method: "PUT",
                headers: {
                    "x-access-token": this.token
                },

                data: data
            })
                .then((response) => {
                    if (response.status === 200) {
                        let remain = this.state.books.filter(list => list._id !== this.state.currentBook._id);
                        remain.push(data);
                        this.setState({ books: remain });
                        this.setState({ showPopup: !this.state.showPopup });
                        //this.setState({ errorList: [] });
                        this.setState({ popupError: false });
                    } else {
                        this.setError(response);
                    }

                })
                .catch(err => {
                    this.setError(err);
                })
        } else {
            let array = JSON.parse(JSON.stringify(this.state.copyBook));
            this.setState({ books: array });
        }
    }

    setError = (err) => {
        this.setState({ error: `Error : ${err.response.data.message}` });
    }

    showPopup(element, current) {
        this.setState({ currentBook: current });
        if (element === "add") {
            this.setState({ popupContent: <Add onChange={this.handleInput.bind(this)} onClick={this.addBook.bind(this)}></Add> });
        } else if (element === "update") {
            this.setState({
                popupContent: <Update delete={this.delete.bind(this)}

                    data={current} onChange={this.handleInput.bind(this)} onClick={this.updateBook.bind(this)}></Update>
            });
        }
        this.setState({ showPopup: !this.state.showPopup });
    }

    handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ errorList: [] });
        this.setState({ popupError: false });
        this.state.currentBook[name]=value;
    }

    delete = async e => {
        e.preventDefault();
        await Axapi(`/books/${this.state.currentBook._id}`, {
            method: "DELETE",
            headers: {
                "x-access-token": this.token
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ books: this.state.books.filter(list => list._id !== this.state.currentBook._id) });
                    this.setState({ copyBook: this.state.copyBook.filter(list => list._id !== this.state.currentBook._id) });
                    this.setState({ showPopup: !this.state.showPopup });
                } else {
                    this.setError(response);
                }
            })
            .catch(err => {
                this.setError(err);
            })
    }

    getBooks() {
        Axapi.get("/books", {
            headers: {
                "x-access-token": this.token
            }
        })
            .then(resp => {
                this.setState({ books: resp.data });
                let array = JSON.parse(JSON.stringify(resp.data));
                this.setState({ copyBook: array });
            })
            .catch(err => {
                this.setError(err);
            })
    }
    validateInput = () => {
        let isValid = true;
        for(let key in this.state.errorList){
            console.log(key,this.state.errorList[key]);
        }
        this.setState({errorList: {fields: "", number: ""}});
        const title = this.state.currentBook.title;
        const author = this.state.currentBook.author;
        const published = this.state.currentBook.published;
        const genre = this.state.currentBook.genre;
        const description = this.state.currentBook.description;

        if (!title || !author || !genre || !description || !published) {

            let array = this.state.errorList;
            array.fields = "*Fields could not  be empty*!";
            this.setState({ errorList: array });
            isValid = false;
        }
        if (isNaN(published)) {
 
            let array = this.state.errorList;
            array.number = "*Publish year must contain only number*!";
            this.setState({ errorList: array });
            isValid = false;
        }
        this.setState({ popupError: !isValid });
        return isValid;
    }

    exit() {
        this.setState({ error: "" });
        this.setState({ showPopup: !this.state.showPopup });
        this.setState({ errorList: [] });
        this.setState({ popupError: false });
    }

    search = (e) => {
        const value = e.target.value;
        e.preventDefault();
        Axapi.get(`/books?${this.state.filter}=${value}`, {
            headers: {
                "x-access-token": this.token
            }
        })
            .then(resp => {
                this.setState({ books: resp.data });
            })
            .catch(err => {
                this.setError(err);
            })
    }

    chooseFilter = (e, index) => {    
        const name = e.target.getAttribute('name');
        this.setState({ filter: [name] });
        this.addActiveClass(index);
        this.setState({placeholder:`Search by ${[name]}...`});
    }

    render() {

        const activeClasses = this.state.activeClasses.slice();
        return (
            <div className={"main"}>
                <header className={"main__header"}>
                    <div className={"main__header--logo"}>
                        <h1 className={"main__header--logo__part"}>Book</h1>
                        <h1 className={"main__header--logo__colored"}>List</h1>
                    </div>
                    <div className={"main__header--search"}>
                        <input className={"main__header--search__input"} type="text" name="search" placeholder={this.state.placeholder} onChange={this.search.bind(this)} />
                        <button className={"main__header--search__button"} onClick={this.search.bind(this)}>&#9906;</button>
                    </div>
                    <div className={"main__header--navbar"}>
                        <button className={"main__header--navbar__link"} onClick={this.showPopup.bind(this, "add")}>Add book</button>
                        <button className={"main__header--navbar__link"} onClick={this.logout.bind(this)}>Logout</button>
                    </div>
                </header>
                <div className={"main__content"}>
                    <div className={"main__content--header"}>
                        <div className={"main__content--header__content"}>
                            <h1 className={activeClasses[0] ? "active" : "inactive"}
                                onClick={(e) => this.chooseFilter(e, 0)} name="title" >Title</h1>
                            <h1 className={activeClasses[1] ? "active" : "inactive"}
                                onClick={(e) => this.chooseFilter(e, 1)} name="author" >Author</h1>
                            <h1 className={activeClasses[2] ? "active" : "inactive"}
                                onClick={(e) => this.chooseFilter(e, 2)} name="published" >Published</h1>
                            <h1 className={activeClasses[3] ? "active" : "inactive"}
                                onClick={(e) => this.chooseFilter(e, 3)} name="genre" >Genre</h1>
                            <h1 className={activeClasses[4] ? "active" : "inactive"}
                                onClick={(e) => this.chooseFilter(e, 4)} name="description" >Description</h1>
                        </div>
                    </div>
                    {this.state.books.map(element => (
                        <Card key={element._id} data={element} onClick={this.showPopup.bind(this, "update", element)}></Card>
                    ))}
                </div>
                {this.state.showPopup &&
                    <Popup error={this.state.popupError} exit={this.exit.bind(this)}
                        onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.showTooltip.bind(this)}>{this.state.popupContent}</Popup>}
                {(this.state.showTooltip && this.state.popupError) && <Tooltip error={this.state.errorList}></Tooltip>}
            </div>
        );
    }
}

export default withRouter(Main);