

//bonus
function getSentiment(text) {
    var positiveWords = ["great", "amazing", "love", "happy", "good", "awesome", "fun", "best", "beautiful"];
    var negativeWords = ["bad", "tired", "hate", "awful", "pain", "worst", "sad", "exhausted"];

    var words = text.toLowerCase().match(/[a-z]+/g) || []; //remove punctioations
    var score = 0;

    for (var i = 0; i < words.length; i++) {
        if (positiveWords.includes(words[i])) {
            score++;
        }

        if (negativeWords.includes(words[i])) {
            score--;
        }
    }

    if (score > 0) {
        return "Positive";
    } else if (score < 0) {
        return "Negative";
    } else {
        return "Neutral";
    }
}


function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	var tweets = runkeeper_tweets.map(function(tweet) {
    	return new Tweet(tweet.text, tweet.created_at);
		});

	var writtenTweets = tweets.filter(function(tweet) {
    return tweet.written;
	});

	addEventHandlerForSearch(writtenTweets);
}



function addEventHandlerForSearch(writtenTweets) {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	var textInput = document.getElementById("textFilter");

    document.getElementById("searchCount").innerText = 0;
    document.getElementById("searchText").innerText = "";

    textInput.addEventListener("input", function(event) {
			var userText = event.target.value;

			var userTweets = writtenTweets.filter(function(Tweet) {
			return Tweet.text.toLowerCase().includes(userText.toLowerCase());
			});


			if(userText !== ""){
				document.getElementById("searchCount").innerText = userTweets.length;
				document.getElementById("searchText").innerText = userText;
			} else{
				document.getElementById("searchCount").innerText = 0;
				document.getElementById("searchText").innerText = "";

			}

		// table insertions and updates
			var table = document.getElementById("tweetTable");
			table.innerHTML = "";
			if (userText !== "") {
    			for (var i = 0; i < userTweets.length; i++) {
        			table.insertAdjacentHTML("beforeend", userTweets[i].getHTMLTableRow(i + 1));

        		// Bonus: add sentiment to the last cell
				var lastRow = table.rows[table.rows.length - 1];
				var sentimentcell = lastRow.insertCell();
				sentimentcell.innerText = getSentiment(userTweets[i].text);
    			}
			}
		});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});