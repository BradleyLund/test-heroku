// importing all the relevant modules for the server
const express = require('express');
//const helmet = require('helmet');
const path = require('path');
require('isomorphic-fetch');

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//using helmet for some basic security
//app.use(helmet());

// this allows express to serve up the resources 
/*if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}*/

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// testing to check that the server is working
app.get('/', (req, res) => {
    res.send("Server is working");
})


// using a post request to bass data from the back end to the frontend 
app.post('/search', (req, res) => {
    let rawSearch = req.body.search;
    let option = req.body.option;
    // this is so that the user input is interpreted correctly for the API search function
    let term = rawSearch.split(" ").join("+");
    let url = `https://itunes.apple.com/search?term=${term}&media=${option}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

// setting the port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});