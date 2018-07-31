import React from 'react'

import Search from './Search'
import Main from './Main'

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  setShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        {/* <Main
          books = {this.state.books}
          setShelf = {this.setShelf}
        /> */}
        <Search          
        />
      </div>         

    )
  }
}

export default BooksApp
