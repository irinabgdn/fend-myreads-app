import React, { Component} from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'

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
                    <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                    
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
                        {
                            this.state.searchResults.map(result => (
                                <li key={result.id}>
                                    <Book
                                        book= {result}
                                    />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search 
