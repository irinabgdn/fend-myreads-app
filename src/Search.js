import React, { Component} from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'

class Search extends Component {
    state = {
        query: '',
        searchResults: []
    }
    
    updateQuery = (query) => {
        this.setState({ query})
        this.getSearchResults(query)
    }
    
    getSearchResults = (query) => {
        if (query) {
            BooksAPI.search(query).then((searchResults) => {
                (searchResults.error) ? this.setState( { searchResults: [] } ) : this.setState( { searchResults })
            })
        } else {
            this.setState({ searchResults: [] })
        }
    }

    render() {        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        { this.state.searchResults.map(result => {
                            let currentShelf="none"

                            this.props.books.map( book => (
                                book.id === result.id ? currentShelf= book.shelf : ""
                            ))

                            return (
                                <li key={result.id}>
                                    <Book
                                        book= {result}
                                        setShelf = {this.props.setShelf}
                                        shelf={currentShelf}
                                    />
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search 
