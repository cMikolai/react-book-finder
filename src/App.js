import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Search extends Component {
  render() {
    return(
      <div className="App-search">
        <form>
          <label for="booksearch">Search book:</label>
          <input type="text" name="name" placeholder="Search for book" id="booksearch" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class BookCard extends Component {
  render() {
    return(
      <div>

      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Book Finder</h1>
          <Search />
        </div>

        <BookCard />
      </div>
    );
  }
}

export default App;
