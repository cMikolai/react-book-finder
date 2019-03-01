import React, { Component } from 'react';
import './App.css';
import NoBook from './nobook.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faExclamationCircle, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faBook, faExclamationCircle, faSearch, faSpinner)

class Search extends Component {
  render() {
    return(
      <div className="App-search">
        <form onSubmit={this.props.searchBooks}>
          <label htmlFor="booksearch">Search book:</label>
          <input type="text" name="name"
            placeholder="Search for book"
            id="booksearch"
            value={this.props.input}
            required='required'
            onChange={this.props.onInputChange} />
          <button type="submit" className="search-submit" value="Submit">
            {this.props.loading
              ? <FontAwesomeIcon icon="spinner" spin />
              : <FontAwesomeIcon icon="search" />
            }
          </button>
        </form>
      </div>
    );
  }
}

class BookCard extends Component {
  render() {
    var singleBook = this.props.books.map((book) => {
      let { imageLinks, title, authors, publisher, previewLink   } = book.volumeInfo
      return (
        <li key={book.id} className="book-card">
          <img
            src={imageLinks
              ? imageLinks.thumbnail
              : NoBook}
            alt={title}
          />
          <h2>{title}</h2>
          <p>by {authors
            ? authors.join(", ")
            : 'Unknown'}</p>
          <p>Published by {publisher
            ? publisher
            : 'Unknown'}</p>
          <a href={previewLink}>
            <button >See this Book</button>
          </a>
        </li>
      )
    })

    return (
      <div id="App-books">
        <ul>
         {singleBook}
        </ul>
      </div>

    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        beforeSearch: true,
        books: [],
        input: '',
        invalidInput: false,
        loading: false
      };
  }

  onInputChange = (event) =>
    this.setState({
      input: event.target.value
    });

  searchBooks = (e) => {
    this.clearFetchErrorMessage();
    e.preventDefault();

    let url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.input}`;

    this.setState({
      loading: true
    });

    fetch(url)
    .then(function(response) {
      return response.json();
    }).then(book => {
      if (book.items) {
        this.setState({
          books: book.items,
          loading: false,
          invalidInput: false,
          beforeSearch: false })
      } else {
        this.setState({ invalidInput: true })
      }
    }).catch(error => this.failedFetch('', error),
      this.setState({ loading: false })
    );
  }

  clearFetchErrorMessage = (e) => {
   var errorInfo = document.querySelector('.error-info')
   if (errorInfo) {
    errorInfo.remove()
   }
 }

  failedFetch = (e) => {
   var appContainer = document.querySelector('.App')
   var errorInfo = document.createElement('div')
   var errorInfoP = document.createTextNode("Sorry, but the books cannot be loaded.");
   appContainer.append(errorInfo)
   errorInfo.appendChild(errorInfoP)

   errorInfo.className += 'error-info'
 }

  render() {
    return (
      <div className="App">
        <div className="App-header"
          style={this.state.beforeSearch
          ? {height: "100vh"}
          : {minHeight: "25vh", padding: "30px"}}>

          <h1><FontAwesomeIcon icon="book" /> BOOK FINDER</h1>
          <Search
            searchBooks={this.searchBooks}
            value={this.state.input}
            onInputChange={this.onInputChange}
            loading={this.state.loading} />
        </div>

        {this.state.invalidInput
          ? <div className="invalid-input">
              <FontAwesomeIcon icon="exclamation-circle" /> Invalid search input. Please try again.
            </div>
          : null
        }

        {this.state.loading
					? null
					: <BookCard books={this.state.books} />
        }

      </div>
    );
  }
}

export default App;
