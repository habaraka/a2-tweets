function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}



	var tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

		var earliest = tweet_array[0].time;
		var latest = tweet_array[0].time;

		for (var tweet of tweet_array) {
			if (tweet.time < earliest) {
				earliest = tweet.time;
				}
			if(tweet.time > latest){
				latest = tweet.time;
			}
		}
		var options = {
    		weekday: 'long',
    		year: 'numeric',
    		month: 'long',
    		day: 'numeric'
		};
		

	var all = tweet_array.length;
	var completed = 0;
	var live = 0;
	var achievements = 0;
	var miscellaneous = 0;
	var writtennum = 0;

	for (var tweet of tweet_array) {
			if (tweet.source === "completed_event") {
				completed++;
				if(tweet.written){
					writtennum++;
				}
				}
			else if (tweet.source === "achievement") {
				achievements++;
				}
			else if (tweet.source === "live_event") {
				live++;
				}
			else if (tweet.source === "miscellaneous") {
				miscellaneous++
				}
		}
	


	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	document.getElementById('firstDate').innerText = earliest.toLocaleDateString('en-US', options);
	document.getElementById('lastDate').innerText = latest.toLocaleDateString('en-US', options);
	document.getElementsByClassName('completedEvents')[0].innerText = completed;
	document.getElementsByClassName('liveEvents')[0].innerText = live;
	document.getElementsByClassName('achievements')[0].innerText = achievements;
	document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneous;
	document.getElementsByClassName('completedEventsPct')[0].innerText =  ((completed / all) * 100).toFixed(2) + "%" ;
	document.getElementsByClassName('liveEventsPct')[0].innerText =  ((live / all) * 100).toFixed(2) + "%" ;
	document.getElementsByClassName('achievementsPct')[0].innerText =  ((achievements / all) * 100).toFixed(2) + "%" ;
	document.getElementsByClassName('miscellaneousPct')[0].innerText =  ((miscellaneous / all) * 100).toFixed(2) + "%" ;
	document.getElementsByClassName('completedEvents')[1].innerText = completed;
	document.getElementsByClassName('written')[0].innerText = writtennum;
	document.getElementsByClassName('writtenPct')[0].innerText =  ((writtennum / completed) * 100).toFixed(2) + "%" ;

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});