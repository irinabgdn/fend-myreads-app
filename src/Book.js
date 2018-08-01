import React, { Component} from 'react'

class Book extends Component {

    render() {
        let thumb = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ''
        let authors = this.props.book.authors ? this.props.book.authors : ''
        
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${thumb}')`}}></div>
                    <div className="book-shelf-changer">
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
