// PACKAGES REQUIRED
	var fs = require("fs");
	var keys = require("./keys.js");
	var request = require("request");
	var Twitter = require("twitter");
	var Spotify = require("node-spotify-api");
	// var spotifyInstance = new Spotify ({
	// 	id: "379fcdf6ea124adb880113eef7366b3b",
	// 	secret: "692e98301dca477a8cbeea3b6a7b5729"
	// });


	var spotify = new Spotify({
  	id: "34e84d93de6a4650815e5420e0361fd3",
  	secret: "5162cd8b5cf940f48702dffe096c2acb"
	});



// GLOBAL VARIABLES
	var command = process.argv[2];	


// TWITTER COMMAND FUNCTION
	function myTweets() {
		var client = new Twitter(keys.twitterKeys);
		var params = {
			screen_name: "michelleobama"
		};
		
		// TWITTER API REQUEST
		client.get("statuses/user_timeline", params, function(error, tweets, response) {
			if (!error) {
				// console.log(tweets[0]);

				// Loop to grab 20 tweets (i = 0 & i < 21)
				for (var i = 0; i < tweets.length; i++) {
					console.log(tweets[i].created_at); 	
					console.log(tweets[i].text);
					console.log(tweets[i].user.name);
					console.log("-----------------------");
					console.log("++++++++++++++++++++++++");



				} // close for loop
			}// close if statement
		
		})
	} // close myTweets funct


// SPOTIFY COMMAND FUNCTION
	function spotifyThisSong(options) {
		
		// Loop through Args
		var songNameArr = [];

		for (var i = 3; i < options.length; i++) {
			
			if (options[3] === undefined) {
				songNameArr.push("Cruise");
			}

			else {
				songNameArr.push(options[i])
			}
		}// close loop
				
		var songName = songNameArr.join("+");

		console.log(songName)
		// SPOTIFY API REQUEST
		spotify.search({type: "track", query: songName}), function(error, data) {
			console.log("inside non error")
			if (error) {
				console.log("error")
				return console.log("Spotify Error Occured: " + error);

			}

			console.log(data);

		};// close spotify API request
	};// close spotifyThisSong funct.




// OMDB MOVIE COMMAND FUNCTION
	function movieThis(options) {

		// Loop through Args

		var movieNameArr = [];
		for (var i = 3; i < options.length; i++) {
			
			if (options[3] === undefined){
				movieName = "Mr. Nobody";
			}

			else {
				movieNameArr.push(options[i]);
			}
		}// close loop

		var movieName = movieNameArr.join("+");

		
		// OMDB API REQUEST
		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
			console.log(queryUrl);

		request(queryUrl, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				// console.log(JSON.parse(body));

				console.log("Title: " + JSON.parse(body).Title);
				console.log("Year: " + JSON.parse(body).Year);
				console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				// console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Rating[0].Value);
				console.log("Country: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Actors: " + JSON.parse(body).Actors);
				console.log("Plot: " + JSON.parse(body).Plot);
			}
		});// close queryUrl request
	} // close movie function


// DO WHAT IT SAYS COMMAND FUNCTION
	function doWhatItSays() {

	}


// SWITCH STATEMENTS - Bank Activity
function userCommands() {
	var command = process.argv[2]
	var options = process.argv
	switch (command) {

		case "movie-this":
		movieThis(options);
		break;

		case "my-tweets":
		myTweets();
		break;

		case "spotify-this-song":
		spotifyThisSong(options);
		break;

		case "do-what-it-says":
		doWhatItSays();
		break;

	}
	
}

userCommands()





