//this search component allows the user to search the iStore catalogue by fetching the information from the API via the backend server
//this component makes use of the card component that I created

import React from 'react'
import Card from './Cards';

//bootstrap components
import Button from 'react-bootstrap/Button'
require('isomorphic-fetch');


// creating the component using state
class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            error: null,
            option: 'all',
            search: '',
            results: [],
            reload: false
        }
    }

    // if the user presses the search button without entering any text they will recieve the following alert
    handleSubmit(event) {
        if (this.state.search === '') {
            return alert('Please enter search details');
        }
        this.setState({ results: [] });
        event.preventDefault();
        fetch('/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                search: this.state.search,
                option: this.state.option
            })
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ results: response })
                this.forceUpdate();
                console.log(this.state);
            })
            //if the server hasn't been started the user will recieve this alert
            .catch(error => {
                alert('Server is currently offline. Please try again later.');
                this.setState(error);
                console.log(error);
            })
    }

    // Using the map method to create an output using the data passedin
    searchResults() {
        const results = this.state.results.results;
        return (
            results.map(result =>
                <Card
                    id={result.collectionId}
                    key={result.collectionArtistId}
                    kind={result.kind}
                    link={result.trackViewUrl}
                    name={result.trackName}
                    artistName={result.artistName}
                    imgThumbnail={result.artworkUrl100}
                />)
        )
    }

    // A basic form where the user can enter the search details and when the search button is clicked the cards are generated
    render() {
        return (
            <div className='search-form' id='Search'>
                <section className="two">
                    <div className="search">
                        <h4>Welcome to the Apple iStore <br /> Please browse our catalogues by searching below <br />
                            Be sure to save your favourites to see them later </h4>
                        <h1 className="search-head">Search</h1>
                        <form className='search-bar-form' onSubmit={this.handleSubmit}>
                            <input type='text' placeholder='Search iStore' onChange={(event) => this.setState({ search: event.target.value })}></input>
                            <div className='dropdown'>
                                <select className='drop-btn form-select form-select-lg mb-3 mt-3' onChange={(event) => this.setState({ option: event.target.value })}>
                                    <option value='all'>All</option>
                                    <option value='movie'>Movies</option>
                                    <option value='music'>Music</option>
                                    <option value='podcast'>Podcasts</option>
                                    <option value='audiobook'>Audiobook</option>
                                    <option value='shortFilm'>Short Film</option>
                                    <option value='tvShow'>TV Shows</option>
                                    <option value='ebook'>Ebooks</option>
                                </select>
                            </div>
                            <Button type='submit' variant="warning" className='btn btn-info search-btn search-button'>Search <i className='fa fa-search'></i></Button>
                        </form>
                    </div>
                </section>

                <section className="results">
                    <div className='search-results' id='search-results'>
                        {this.state.results.length !== 0 ? <div><h3 className="results-head">Search Results</h3>{this.searchResults()}</div> : ''}
                    </div>
                </section>
            </div>
        )
    }
}

export default SearchPage