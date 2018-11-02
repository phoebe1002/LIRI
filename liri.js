// Import required dependencies and store them in variables

// read and set any environment variables with the dotenv package
require("dotenv").config();

// node-spotify-api NPM package 
var Spotify = require("node-spotify-api");

// `keys.js` file - spotify API keys
var keys = require("./keys");

// access spotify API keys
var spotify = new Spotify(keys.spotify);

// request npm package
var request = require("request");

// read/write FS package
var fs = require("fs");

// moment npm package - format dates
var moment = require("moment");


// Get event data for `concert-this`command

var getEvents = function(artist) {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  //Testing:
  // console.log(queryURL);

  // Call Ap
  request(queryURL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);
      if (!jsonData.length) {
        console.log("Opps, no relevant results are found");
        return;
      }
      console.log("-----" + artist + "-----");
      for (var i = 0; i < jsonData.length; i++) {
        var event = jsonData[i];
        console.log("#"+ parseInt(i + 1));
        console.log(">>Venue: " + event.venue.name);
        console.log(">>Location: " + event.venue.city + ", " + event.venue.country);
        console.log(">>Date: " + moment(event.datetime).format("MM/DD/YYYY"));
        console.log("------------------------------------------------");
      }
    }
  });
};

// Get song data for `spotify-this-song`command

//Set a function to get artist name
function getArtists(artist){
  var artistName = artist.name
  return artistName;
}

// Call API and generate terminal scripts

var getSongs = function(songName) {
  //Default search (if no song generateCommand): "The Sign" by Ace of Base
  if (songName === '') {
    // Set up default parameter 
    defaultQ = 'album:the+sign%20artist:ace+of+base'
    spotify.search(
      {
        type: "track",
        query: defaultQ,
        limit: 1     
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
        var songs = data.tracks.items;
        console.log("------------------------------")
        console.log("Suggested song:")
        console.log('"' + songs[0].name + '" by ' + songs[0].artists.map(getArtists));
        console.log("Visit: " + songs[0].preview_url )
        console.log("------------------------------")
      }
    );
  } 
  // if song generateCommand, set up input(songName) as the parameter 
  else {
    spotify.search(
      {
        type: "track",
        query: songName,
        limit: 5
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
        var songs = data.tracks.items;
          console.log("------------------------------")
        for (var i = 0; i < songs.length; i++) {
          console.log(i + 1)
          console.log("Song: " + songs[i].name);
          console.log("By: " + songs[i].artists.map(getArtists));
          console.log("Album: " + songs[i].album.name);
          console.log("Visit: " + songs[i].preview_url);
          console.log("------------------------------")
        }
      }
    );
  }
};

// Get movie data for `movie-this`command

var getMovie = function(movieName) {
  //Default search (if no movie generateCommand): 'Mr. Nobody.'
  if (movieName === "") {
    defaultQ = "Mr Nobody";
    var urlHit =
    "http://www.omdbapi.com/?t=" + defaultQ + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
  //Testing
  //console.log(urlHit)

    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
        //Testing
        //console.log(jsonData);
        console.log("If you haven't watched " + '"Mr. Nobody"'+  ", then you should visit: " + jsonData.Website);
      }
    });
  } 
  // if movie generateCommand, set up input(movieName) as the parameter 
  else {
    var urlHit =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    request(urlHit, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
        console.log("------------------------------")
        console.log("Moive title: " + jsonData.Title);
        console.log("Released Year: " + jsonData.Year);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log("------------------------------")
      }
    });
  }
};

// Get movie data for `do-what-it-says`command

var doWhatItSays = function() {
  //LIRI will take the text inside of random.txt 
  fs.readFile("random.txt", "utf8", function(error, data) {
    
    // Data from the text file
    var dataArr = data.split(",");

    //Testing
    //console.log(data);
    //console.log(dataArr);

    //Getting command with keyword input
    if (dataArr.length === 2) {
      generateCommand(dataArr[0], dataArr[1]);
    } 
    //Getting command without keyword input
    else if (dataArr.length === 1) {
      generateCommand(dataArr[0]);
    }
  });
};

// Process command line:

// determine the type of command as chosen command with keyword as parameters for ajax calls
var generateCommand = function(chosenCommand, keyword) {
  switch (chosenCommand) {
  case "concert-this":
    getEvents(keyword);
    break;
  case "spotify-this-song":
    getSongs(keyword);
    break;
  case "movie-this":
    getMovie(keyword);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("LIRI doesn't know that");
  }
};
// Pass parameter into generateCommand funtion to excute corresponding funtion for returning LIRI response. 
var runCommand = function(chosenCommand, keyword) {
  generateCommand(chosenCommand, keyword);
};
// Pass command line arugments into runCommand function once LIRI recieved request from the user
runCommand(process.argv[2], process.argv.slice(3).join(" "));