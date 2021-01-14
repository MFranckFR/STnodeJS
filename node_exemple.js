const request = require('request');


var url = 'https://ghibliapi.herokuapp.com/films';

request(url, (error, response, body) => {
    if (error){
        console.error(`Pas possible d envoyer la requete a l API: ${error.message}`);
        return;
    }

    if(response.statusCode != 200){
        console.error(`Attente du status 200 : status:${request.statusCode}`);
        return;
    
    } else {
            var movies = JSON.parse(body);
            movies.forEach(movie=>console.log(`[${movie['producer']}] ${movie['title']} (${movie['release_date']})`));
    }
});