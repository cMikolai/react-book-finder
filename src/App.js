import React, { Component } from 'react';
import './App.css';
import NoBook from './nobook.png'

class Search extends Component {
  render() {
    return(
      <div className="App-search">
        <form onSubmit={this.props.searchBooks}>
          <label htmlFor="booksearch">Search book:</label>
          <input type="text" name="name" placeholder="Search for book" id="booksearch" value={this.props.input} required='required' onChange={this.props.onChange} />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

class BookCard extends Component {
  render() {
    var singleBook = this.props.books.map((book) => {
      return (
        <li key={book.id} className="book-card">
          <img
            src={book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : NoBook}
            alt={book.volumeInfo.title}
          />
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
        books: [],
        input: '',
        loading: false
      };
  }

  onChange = (event) => this.setState({ input: event.target.value });

  searchBooks = (e) => {
    e.preventDefault();

    let url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.input}`;

    this.setState({loading: true})
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(book => {
      this.setState({ books: book.items, loading: false })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>BOOK FINDER</h1>
          <Search searchBooks={this.searchBooks} value={this.state.input} onChange={this.onChange} />
        </div>

        {this.state.loading
					? "Loading ..."
					: <div id="App-books">
              <BookCard books={this.state.books} />
            </div>}

      </div>
    );
  }
}

export default App;
