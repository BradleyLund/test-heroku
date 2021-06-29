// importing all the relevant components needed to render
import React from 'react';
import SearchPage from './components/SearchPage'
import FavouriteList from './components/FavouriteList';
import HomePage from './components/HomePage';


// App component is basically just the home component for all the other components
function App() {
  return (
    <div className='App'>
      <div className="holder">
        <section className="one" id="Home">
          <header className='App-header'>
            <HomePage />
          </header>
        </section>
        <SearchPage />
        <FavouriteList />
      </div>
    </div>
  );
}

export default App;
