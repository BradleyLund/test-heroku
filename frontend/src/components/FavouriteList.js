// this functional component makes use of the Card component created previously to create the users favourites list.

import React from 'react';
import Card from './Cards';

//bootstrap components
import Button from 'react-bootstrap/Button'

function FavouriteList() {
    // giving the session storage a value as to avoid a null error
    if (sessionStorage.getItem('favouriteList') === null) {
        const favourites = [];
        sessionStorage.setItem('favouriteList', JSON.stringify(favourites));
    }

    // creating a variable to store the session storage
    let favouritesList = JSON.parse(sessionStorage.getItem('favouriteList'));
    let count = 0;

    // using the map method to make the data from session storage easily usable
    // I have also created a button that uses the delete function below
    function getFavourites() {
        return (
            favouritesList.map(result => {
                count = count + 1;
                return (
                    <div className='fav-items-div'>
                        <section className="favourites">
                            <div>
                                <Card
                                    id={result.id}
                                    key={result.key}
                                    kind={result.kind}
                                    link={result.link}
                                    name={result.name}
                                    artistName={result.artistName}
                                    imgThumbnail={result.imgThumbnail}
                                />
                                <br />
                                <Button variant="danger" className='btn btn-lg btn-info DeleteBtn' onClick={(e) => delFavourite(count)}>Delete</Button>
                            </div>
                        </section>
                    </div>
                )
            }
            ))
    }

    //this function deletes the selected item from the array and updates the session storage
    function delFavourite(index) {
        let delFav = [];
        delFav = favouritesList.splice(index - 1, 1);
        sessionStorage.setItem('favouriteList', JSON.stringify(delFav));
        window.location.reload();
    }

    //using a ternary operator that triggers the getFavourites function when the has more than 1 object
    return (
        <div id='Favs'>
            <section className="three">
                <div>
                    <h1 className="fav-head">Your favourite items are:</h1>
                    <div className='search-results' id='search-results'>
                        {favouritesList.length !== 0 ? getFavourites() : <h3>You dont have any favourites at the moment <br />
                            Please select some favourites from the search results.</h3>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FavouriteList