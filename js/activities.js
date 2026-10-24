function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
		var activityCounts = {};

	tweet_array.forEach(function(tweet) {
    	if (tweet.source === "completed_event" && tweet.activityType !== "unknown") {
        var activity = tweet.activityType;

        if (activityCounts[activity] === undefined) {
            activityCounts[activity] = 1;
        } else {
            activityCounts[activity]++;
        }
    }
		});
		

		var runTotal = 0;
        var runCount = 0;
		var walkTotal = 0;
        var walkCount = 0;
		var bikeTotal = 0;
        var bikeCount = 0;


		tweet_array.forEach(function(tweet) {

			if (tweet.activityType === "run" && tweet.distance > 0) {
    			runTotal += tweet.distance;
    			runCount++;
			}
			if (tweet.activityType === "walk" && tweet.distance > 0) {
    			walkTotal += tweet.distance;
    			walkCount++;
			}
			if (tweet.activityType === "bike" && tweet.distance > 0) {
    			bikeTotal += tweet.distance;
    			bikeCount++;
			}
			
		});
		var runAverage = runTotal / runCount;
		var walkAverage = walkTotal / walkCount;
		var bikeAverage = bikeTotal / bikeCount;

		//finding the highest three values
		var distancecount = [runAverage, walkAverage, bikeAverage];
		var activityNames = ["run", "walk", "bike"];

		var highest = Math.max(...distancecount);
		var lowest = Math.min(...distancecount);

		var longestActivity = activityNames[distancecount.indexOf(highest)];
		var shortestActivity = activityNames[distancecount.indexOf(lowest)];		

		var values = Object.values(activityCounts);

		var high1 = Math.max(...values);
		values[values.indexOf(high1)] = 0;

		var high2 = Math.max(...values);
		values[values.indexOf(high2)] = 0;

		var high3 = Math.max(...values);

		var activity_high1 = Object.keys(activityCounts).find(k => activityCounts[k] === high1);
		var activity_high2 = Object.keys(activityCounts).find(k => activityCounts[k] === high2);
		var activity_high3 = Object.keys(activityCounts).find(k => activityCounts[k] === high3);


		var weekdayTotal = 0;
		var weekdayCount = 0;

		var weekendTotal = 0;
		var weekendCount = 0;



		tweet_array.forEach(function(tweet) {
		     
			var day = tweet.time.getDay();

			if (tweet.distance > 0) {

				if (day === 0 || day === 6) {
        		weekendTotal += tweet.distance;
        		weekendCount++;
    		} else {
        		weekdayTotal += tweet.distance;
        		weekdayCount++;
    		}
		}
    		

		});

		var weekdayAverage = weekdayTotal / weekdayCount;
		var weekendAverage = weekendTotal / weekendCount;
		var day = (weekdayAverage > weekendAverage ) ? "weekdays" : "weekends" ;

		var activityData = [];

		Object.keys(activityCounts).forEach(function(activity) {
			activityData.push({
				activity: activity,
				count: activityCounts[activity]
			});
		});

	var activityDayData = [];

	tweet_array.forEach(function(tweet) {

		if (tweet.distance > 0 &&
			(tweet.activityType === "run" ||
			tweet.activityType === "walk" ||
			tweet.activityType === "bike")) {

			var day = tweet.time.getDay();
			if(day == 0){day = "Sun" }
			if(day == 1){day = "Mon" }
			if(day == 2){day = "Tue" }
			if(day == 3){day = "Wed" }
			if(day == 4){day = "Thu" }
			if(day == 5){day = "Fri" }
			if(day == 6){day = "Sat" }

			activityDayData.push({
				activity: tweet.activityType,
				day: day,
				distance: tweet.distance
			});

		}

	});
	
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activityData
	  },
	  //TODO: Add mark and encoding
	  "mark": "point",
	  "encoding": {
		"x" : {"field": "activity", "type": "nominal", "sort": "-y"},
		"y": {"field": "count", "type": "quantitative", "scale": {"type": "log"}}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	distance_vis_spec = {
	  "width": 250,
      "height": 250,
	  
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {"values": activityDayData},
	  "mark": {"type": "point"},
	  "encoding": {
		"x" : {"field": "day", "type": "ordinal", "title" : "time (day)",  "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
		"y": {"field": "distance", "type": "quantitative", "title": "distance"},
		"color": {
			"field" :  "activity",
			"type" : "nominal",
		}

	  }
	};

	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});
	document.getElementById("distanceVisAggregated").style.display = "none";
	
	
	
	
	
	Meandistance_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

	  "width": 250,
      "height": 250,
	  "data": {"values": activityDayData},
	  "mark": {"type": "point"},
	  "encoding": {
		"x" : {"field": "day", "type": "ordinal", "title" : "time (day)",  "sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
		"y": {"field": "distance", "type": "quantitative", "aggregate": "mean", "title": "Mean of distance"},
		"color": {
			"field" :  "activity",
			"type" : "nominal",
		}

	  }
	};
	vegaEmbed('#distanceVisAggregated', Meandistance_vis_spec, {actions:false});



	var button = document.getElementById("aggregate");

	var means = document.getElementById("distanceVisAggregated");
	var all = document.getElementById("distanceVis");

	button.addEventListener("click", function() {
		if(means.style.display === "none"){
			all.style.display = "none";
			means.style.display = "block";

			button.innerText = "Show all activites";
		} else {
			means.style.display = "none";
			all.style.display = "block";
			button.innerText = "Show means";
		}

	});


	
	

	


	


	//website connection

	document.getElementById('numberActivities').innerText = Object.keys(activityCounts).length;
	document.getElementById('firstMost').innerText = activity_high1;
	document.getElementById('secondMost').innerText = activity_high2;
	document.getElementById('thirdMost').innerText = activity_high3;
	document.getElementById('longestActivityType').innerText = longestActivity;
	document.getElementById('shortestActivityType').innerText = shortestActivity;
	document.getElementById('weekdayOrWeekendLonger').innerText = day;
}	
//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);


});