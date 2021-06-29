/*this component serves to create the card which holds the information from all the search results from the API, as well as some functionality
to allow a user to add items to a favourites list. */

import React, { useState, useEffect } from 'react';

//some bootstrap components
import BootCard from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// this component uses state and has props passed in
function Card(props) {
    const [isFavourite, setIsFavourite] = useState(false);
    const [display, setDisplay] = useState(false);
    const [click, setClicked] = useState(false);

    // this function assigns a class to the button so the colour is changed depending if it is clicked or not
    let btnClicked = click ? 'button-clicked' : 'button-not-clicked';

    // this function allows a user to add an item from the search results to their favourites list 
    function addToFavourites() {
        if (sessionStorage.getItem('favouriteList') === null) {
            const favourites = [];
            sessionStorage.setItem('favouriteList', JSON.stringify(favourites));
        }
        // this variable holds the session storage data.
        let addFavourite = JSON.parse(sessionStorage.getItem('favouriteList'));
        setClicked(true);
        // a new object is created and added to session storage
        const newFavourite = {
            id: props.id,
            key: props.key,
            kind: props.kind,
            link: props.link,
            name: props.name,
            artistName: props.artistName,
            imgThumbnail: props.imgThumbnail,
        };

        // this function stops users adding the same item to their favourites more than once
        for (let i = 0; i < addFavourite.length; i++) {
            if (addFavourite[i].name === newFavourite.name) {
                setIsFavourite(!isFavourite);
                alert("You've already added this item to your favourites");
                return;
            }
        }

        // pushing the new object to the array, and updating the session storage. And also alerting the user that the item has been added to favourites
        addFavourite.push(newFavourite)
        sessionStorage.setItem('favouriteList', JSON.stringify(addFavourite));
        alert('This Item added to Favorites');
        setDisplay(true);
        window.location.reload()
    }

    useEffect(() => {
        if (display === true) {
            for (let i = 0; i < 1; i++) {
                setDisplay(false);
            }
        }
    }, [isFavourite, display]
    )

    // making use of a bootstrap card component to put all of the data in an attractive way
    return (
        <BootCard className='display-card-body card-group mb-3 h-100'>
            <div className='card'>
                <BootCard.Link href={props.link}>
                    <BootCard.Img src={props.imgThumbnail} className='card-img' />
                </BootCard.Link>
                <BootCard.Body>
                    <BootCard.Title><strong>{props.name}</strong></BootCard.Title>
                    <BootCard.Subtitle className='mb-2 text-muted'>{props.id}</BootCard.Subtitle>
                    <BootCard.Subtitle className='mb-2 card-type'>{props.kind}</BootCard.Subtitle>
                    <BootCard.Text>
                        {props.artistName}
                    </BootCard.Text>
                    <Button variant="success" className={`${btnClicked} card-links`} id="addFavBtn" onClick={() => addToFavourites()}>Favourite <i className='far fa-heart'></i></Button>
                </BootCard.Body>
            </div>
        </BootCard>
    )
}

export default Card;