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
    
    // Re-render when user input
    updateQuery = (query) => {
        this.setState({ query})
        this.getSearchResults(query)
    }
    
    // Fetch results from database based on search input
    getSearchResults = (query) => {
        if (query) {
            BooksAPI.search(query).then((searchResults) => {
                // Assure response even if error occures
                (searchResults.error) ? this.setState( { searchResults: [] } ) 
                // Return results sorted by book titles
                : this.setState( { searchResults: searchResults.sort(sortBy('title')) })
            })
        } else {
            this.setState({ searchResults: [] })
        }
        
    }
/**
 *
 *
 * @returns
 * @memberof Search
 */
render() {        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    {/* Return to main page - button */}
                    <Link to="/" className="close-search">Close</Link>
                    
                    {/* Search input */}
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
                    {/* Show number the number of results */}
                    {this.state.query && (<p className="search-results-counter">Your search for {this.state.query} has {this.state.searchResults.length} results.</p>)}
                    
                    {/* Show results */}
                    <ol className="books-grid">
                        {this.state.searchResults.map(result => {
                            // Set default shelf of searched results
                            result.shelf="none"
                            // Check if the book is already on a shelf
                            this.props.books.map( book => (
                                book.id === result.id ? result.shelf=book.shelf : ""
                            ))
                            // Render search results
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
