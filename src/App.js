import React, { Component } from 'react';
import './App.css';

class Search extends Component {
  render() {
    return(
      <div className="App-search">
        <form onSubmit={this.props.searchBooks}>
          <label htmlFor="booksearch">Search book:</label>
          <input type="text" name="name" placeholder="Search for book" id="booksearch" />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

class BookCard extends Component {
  render() {
    var singleBook = this.props.books.map((book) => {
      // uses same function as Map.js to match results
      return (
        <li key={book.volumeInfo.title} className="book-card">
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
          <h2>{book.volumeInfo.title}</h2>
          <p>by {book.volumeInfo.authors}</p>
          <p>Published by {book.volumeInfo.publisher}</p>
          <a href={book.volumeInfo.previewLink}>
            <button >See this Book</button>
          </a>
        </li>
      )
    })

    return (
      <div>
        {singleBook}
      </div>

    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        books: []
      };
  }

  searchBooks = (e) => {
    e.preventDefault();
    fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter')
    .then(function(response) {
      return response.json();
    })
    .then(book => {
      this.setState({ books: book.items })
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Book Finder</h1>
          <Search searchBooks={this.searchBooks} />
        </div>
        <div id="App-books">
          <BookCard books={this.state.books} />
        </div>
      </div>
    );
  }
}

export default App;
