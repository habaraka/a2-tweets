class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        var text = this.text.toLowerCase();
        if(text.startsWith("just completed") || text.startsWith("just posted")){
            return "completed_event";
        }
        else if(text.startsWith("achieved")){
            return "achievement";
        }
        else if(text.startsWith("watch my")){
            return "live_event";
        }
        return "miscellaneous";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        return this.writtenText !== "";
    }

    get writtenText():string { //maybe move some of this logic to the top because it will be used for part three
        var text = this.text;

        text = text.replace(/#Runkeeper/gi, "");
        text = text.replace(/https?:\/\/\S+/g, "");
        text = text.trim();

        var parts = text.split(" - ");
        var writtenText = parts.slice(1).join(" - ").trim();
        

        if (writtenText === "TomTom MySports Watch" ||
        writtenText === "Fat Burner (level 9)") {
        return "";
        }

        return writtenText;
    }
    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet

        var text = this.text.toLowerCase();

        var end = text.indexOf(" - ");
        if (end !== -1) {
            text = text.substring(0, end);
        }

        text = text + " ";

        if (text.indexOf(" nordic walk") !== -1) {
            return "nordic walk";
        }
        if (text.indexOf(" mtn bike ") !== -1) {
            return "mtn bike";
        }
        if(text.indexOf(" walk ") !== -1){
            return "walk";
        }
        if(text.indexOf(" run ") !== -1){
            return "run";
        }
        if(text.indexOf(" bike ") !== -1){
            return "bike";
        }
        if(text.indexOf(" hike ") !== -1){
            return "hike";
        }
        if(text.indexOf(" swim ") !== -1){
            return "swim";
        }
        if(text.indexOf(" row ") !== -1){
            return "row";
        }
        if (text.indexOf(" elliptical ") !== -1) {
            return "elliptical";
        }
        if (text.indexOf(" yoga ") !== -1) {
            return "yoga";
        }
        if (text.indexOf(" skate ") !== -1) {
            return "skate";
        }
        if (text.indexOf(" snowboard ") !== -1) {
            return "snowboard";
        }


        return "unknown";

    }

    get distance():number { //maybe fix calculation
        if(this.source != 'completed_event' ) {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        var text = this.text;

        var end = text.indexOf(" - ");
        if (end !== -1) {
            text = text.substring(0, end);
        }

        var words = text.split(" ");

        var km_index = words.indexOf("km");
        var mi_index = words.indexOf("mi");

        if(km_index !== -1){
            var km_num = words[km_index - 1];
            var km = parseFloat(km_num);
            var miles = km / 1.609;
            return miles;
        }

        if(mi_index !== -1){
            var mi_num = words[mi_index - 1];
            var miles = parseFloat(mi_num);
            return miles;
        }

        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        var text = this.text;

        function escapeHTML(value:string):string {
            return value.replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#39;");
        }

        var start = text.indexOf("https://");
        var tweetHTML = escapeHTML(text);

        if (start !== -1) {
            var end = text.indexOf(" ", start);

            if (end === -1) {
                end = text.length;
            }

            var url = text.substring(start, end);

            var link = '<a href="' + escapeHTML(url) + '">' +
                    escapeHTML(url) + '</a>';

            tweetHTML = escapeHTML(text.substring(0, start)) +
                        link +
                        escapeHTML(text.substring(end));
        }

        var row = "<tr>";
        row += "<td>" + rowNumber + "</td>";
        row += "<td>" + escapeHTML(this.activityType) + "</td>";
        row += "<td>" + tweetHTML + "</td>";
        row += "</tr>";

        return row;
    }
}