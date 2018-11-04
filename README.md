# LIRI Bot
## Build a command-line based LIRI(Language Interpretation and Recognition Interface) app that will enable users to search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

## Supporting Files
* liri.js 
    - This is the main file for the logic of the app
* keys.js
    - This is required for exporting spotify authorization keys
* random.txt
    - Using the `fs` Node package, the app will take the text inside of random.txt and then use it to call one of LIRI's commands.
* .env
    - This is replacing the values with spotify API keys 
* package.json
    - This is required for installing third party npm packages and saving their version numbers. 
* package-lock.json
    _ This is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. 
* .gitignore
    - This will tell git not to track these files, and thus they won't be committed to Github.


## Install required modules
###  [run the following commands](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
* [npm init](https://docs.npmjs.com/cli/init)
* [npm i require](https://www.npmjs.com/package/require)
* [npm i request](https://www.npmjs.com/package/request)
* [npm i moment](https://www.npmjs.com/package/moment)
* [npm i dotenv](https://www.npmjs.com/package/dotenv)
* [npm i node-spotify-api](https://www.npmjs.com/package/node-spotify-api)

## App design:
- LIRI will be a command line node app that takes in parameters and gives you back data.
- Users have to run *`node liri.js'* + one of the following commands in the terminal to interact with LIRI
   * `concert-this`
   * `spotify-this-song`
   * `movie-this`
   * `do-what-it-says`

## How does each LIRI command work?
### `concert-this`
* Run `node liri.js concert-this <artist/band name here>`
* LIRI will return *Bands in Town* search results for concerts
* Example: `node liri.js concert-this migos` 
    - See: [18 results found](https://drive.google.com/file/d/1tjAqB00snQmh31LWlp-Q20s8BCejO2Vg/view)

### `spotify-this-song`
* Run `node liri.js spotify-this-song <song name here>`
* LIRI will return *Spotify* search results for songs
* Example#1 - search specific song: `node liri.js spotify-this-song hello`
    - See: [5 results found](https://drive.google.com/file/d/1QTlim7rHYWNstyh5AxQph9uzMz4LzWIs/view)
* Example#2 - default search ("The Sign" by Ace of Base.): `node liri.js spotify-this-song`
    - See:["The Sign" by Ace of Base](https://drive.google.com/file/d/1eiVaX08WbJmqj79Sy2Una7IOUEx9yIG8/view)    

### `movie-this`
* Run `node liri.js movie-this <movie name here>`
* LIRI will return *OMDB* search results for movies.
* Example#1 - search specific movie: `node liri.js movie-this batman`
    - see:[Moive title: Batman](https://drive.google.com/file/d/1Y61UwqDWFeIhLUwyzAOe0AXKPxPo0g8W/view)
* Example#2 - default search ('Mr. Nobody.'):`node liri.js movie-this`
    - see:[Mr. Nobody](https://drive.google.com/file/d/1n4woz6YOi0AgnePO63gE0KKr4TF5SCza/view)

### `do-what-it-says`
* Run `node liri.js do-what-it-says`
* LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
* Example - It should run `spotify-this-song` for "I Want it That Way," which extracts from `random.txt`.
    - see:[5 results found](https://drive.google.com/file/d/13qAvoM5HlF0Y77UnH2E7UqTHr8rmdUX9/view)

### API used:
* [bandsintown](https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0)
* [Spotify](https://developer.spotify.com/documentation/web-api/)
* [OMDb API](https://www.omdbapi.com/)


