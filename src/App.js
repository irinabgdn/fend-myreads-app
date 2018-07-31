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
        <Route exact path='/' render={() => (
          <Main
            books = {this.state.books}
            setShelf = {this.setShelf}
          />
        )}/>
        <Route path='/search' render={({}) => (
          <Search
            books = {this.state.books}
            setShelf = {this.setShelf}
          />
        )}/>
      </div>         

    )
  }
}
export default BooksApp
