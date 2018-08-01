import React from 'react'

import Search from './Search'
import Main from './Main'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  setShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.getAllBooks()
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Main
            books={this.state.books}
            setShelf={this.setShelf}
          />
        )}/>
        <Route path='/search' render={() => (
          <Search
            books={this.state.books}
            setShelf={this.setShelf}
          />
        )}/>
      </div>         

    )
  }
}
export default BooksApp
