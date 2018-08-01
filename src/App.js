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

  // Fetch books from database
  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Prepare controlled component for fetching data
  componentDidMount() {
    this.getAllBooks()
  }

  // Method to update book shelf in database
  setShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.getAllBooks()
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          // Main page component
          <Main
            books={this.state.books}
            setShelf={this.setShelf}
          />
        )}/>
        <Route path='/search' render={() => (
          // Search page component
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
