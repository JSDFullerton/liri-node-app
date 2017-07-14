// PACKAGES REQUIRED
	var fs = require("fs");
	var keys = require("./keys.js");
	var request = require("request");
	var Twitter = require("twitter");
	var Spotify = require("node-spotify-api");
	var spotify = new Spotify ({
		id: "379fcdf6ea124adb880113eef7366b3b",
		secret: "692e98301dca477a8cbeea3b6a7b5729"
	});


	// var spotify = new Spotify({
 //  	id: "34e84d93de6a4650815e5420e0361fd3",
 //  	secret: "5162cd8b5cf940f48702dffe096c2acb"
	// });



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
	function spotifyThisSong() {
		
		// Loop through Args
		var songName = "";
		var songNameArr = [];

			if (process.argv[3] === undefined) {
				songNameArr.push("I want it that way");

			}

			else {
				for (var i = 3; i < process.argv.length; i++) {
					songNameArr.push(process.argv[i])
					songName = songNameArr.join("+");

			}// close loop
		}// close else statement

		console.log("SONG SELECTED: " + songName);
				
		

		console.log(songName)
		// SPOTIFY API REQUEST
		spotify.search({type: "track", query: songName}, function(error, data) {
			console.log(data);

			if (error) {
				console.log("error")
				return console.log("Spotify Error Occured: " + error);

			}// close if state

			else {
				for (var i = 0; i < data.length; i++) {

					console.log(Object.key(data.items.tracks[i]));	
				
				}// close loop
			}// close else state


		});// close spotify API request
	};// close spotifyThisSong funct.




// OMDB MOVIE COMMAND FUNCTION
	function movieThis() {

		var movieName = "";
		var movieNameArr = [];
		console.log(process.argv[3])


		// Loop through Args
		if (process.argv[3] == undefined){
				movieName = "Mr. Nobody";
			}
			
		else {

			for (var i = 3; i < process.argv.length; i++) {
				movieNameArr.push(process.argv[i]);
				movieName = movieNameArr.join("+");

			}// close loop
		}// close if statement



		
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
		fs.readFile("random.txt", "utf8", function(error, data) {
			if (error) {
				console.log("DO WHAT IT SAYS ERROR: " + error);
			
			}// close if state

			else {
				var dataArr = data.split(', ');
				var songName = dataArr[1].slice(1, -1);
			
			}// close else state

			spotify.search({ type: "track", query: songName, limit: 1}, function(error, data) {
				if (error) {
					return console.log("Spotify Erro Occured: " + error);

				}// close If state

				else {
					var songs = data.tracks.items;

					songs.forEach(function(song) {
						console.log(song.preview_url);
						console.log(song.album.artists[0].name);
						console.log(song.name);
						console.log(song.album.name);
						console.log("---------------------")
						console.log("+++++++++++++++++++++")
					
					});// close forEach funct
				}// close Else State
			});// close Spotify API Call
		});// close readFile Funct
	}// close DoWhatItSays Funct


// SWITCH STATEMENTS - Bank Activity
function userCommands() {

	switch (command) {

		case "movie-this":
		movieThis();
		break;

		case "my-tweets":
		myTweets();
		break;

		case "spotify-this-song":
		spotifyThisSong();
		break;

		case "do-what-it-says":
		doWhatItSays();
		break;

	}
	
}

userCommands()





