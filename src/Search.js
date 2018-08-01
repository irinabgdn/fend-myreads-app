import React, { Component} from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        setShelf: PropTypes.func.isRequired
    }

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
                (searchResults.error) ? this.setState( { searchResults: [] } ) : this.setState( { searchResults: searchResults.sort(sortBy('title')) })
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
                        {this.state.searchResults.map(result => {
                            result.shelf="none"

                            this.props.books.map( book => (
                                book.id === result.id ? result.shelf=book.shelf : ""
                            ))

                            return (
                                <li key={result.id}>
                                    <Book
                                        book={result}
                                        setShelf={this.props.setShelf}
                                        shelf={result.shelf}
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
