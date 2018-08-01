import React, { Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        setShelf: PropTypes.func.isRequired,
        shelf: PropTypes.string.isRequired
    }

    render() {
        // Assure books are render even if information is incomplete
        let thumb = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ''
        let authors = this.props.book.authors ? this.props.book.authors : ''
        
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${thumb}')`}}></div>
                    <div className="book-shelf-changer">
                        {/* Change shelf based on user option */}
                        <select 
                            onChange={(e) => this.props.setShelf(this.props.book, e.target.value)}
                            value={this.props.shelf}
                        >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }   
}

export default Book 
