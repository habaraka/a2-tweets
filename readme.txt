--Readme document for *Hanin Ali Barakat*, *habaraka@uci.edu*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

11/10 
- 3/3 Summarizing tweets
- 4/4 Identifying the most popular activities
- 3/3 Adding a text search interface

+1 Bonus: Sentiment analysis

2. How long, in hours, did it take you to complete this assignment?
Around 12 - 13 hours


3. What online resources did you consult when completing this assignment? (list sites like StackOverflow or specific URLs for tutorials; describe queries to Generative AI or use of AI-based code completion)
- Online resources
    - https://www.geeksforgeeks.org/javascript/how-to-detect-if-textbox-content-has-changed-using-javascript/ (used to learn about user input fetching using a event listener)
    - https://www.w3schools.com/jsref/met_console_log.asp (used to understand how to print the output to a console)
    - https://vega.github.io/vega/docs/schemes/ (Used to learn how I may add color to my graphs)
    - https://vega.github.io/vega-lite/tutorials/getting_started.html?utm_source=chatgpt.com (used the code given as a template and added/changed it based on my own graph needs)

- AI queries 
    - Google Gemini:
        - in javascript table, how can i access rows and update them with the table content from html?
            Google Gemini generated a code example of how would a table rows and cells be accessed and updated, the example given was a diffrenet table from the assignement and used for illustration, that helped understand the syntax and how to apply the same manner into the assignmnet.

        - how to find a key based on a value in javascript
            Google Gemini desribed the specific code used to find keys give a value which was .find(), again provided code example usage from a diffrenet problem for illustration. I used the given information and tailored it to my need.

        - how to use .format() in javascript to display two decimal point
            Google Gemini helped explain th purpose of .format() and suggested using .toFixed() since it will convert the number to string and round to 2 decimals.

    - Chatgpt:
        - how can I identify the activity type of a tweet when the activity name appears at the end of the text?
            ChatGPT helped me debug my activity type implementation and understand how string matching works when there are spaces around the activity name. I used the explanation to adjust my code and correctly identify activities such as running and biking.

        - why is my updated TypeScript code not showing the correct results in my browser?
            ChatGPT helped me identify that my browser was using an older compiled JavaScript file. It explained how TypeScript needs to be compiled into JavaScript and helped me troubleshoot the compilation process.

        - how can I make URLs inside tweets clickable using JavaScript?
            ChatGPT explained how to use .indexOf() and .substring() to extract URLs from tweet text. It also provided a code example using .createElement() and .appendChild() to turn the URLs into clickable links. I used the suggested approach and incorporated it into my existing table implementation.

        - what does .match(/[a-z]+/g) || [] mean in JavaScript?
            ChatGPT explained how regular expressions can be used to extract words from a string and how || [] prevents errors when no words are found. This helped me understand why I should use this syntax instead of regular split.
        - How can I implement the provided getHTMLTableRow() function and use it in my search interface?
            ChatGPT provided a code example for generating HTML table rows with clickable links and explained HTML escaping. It also helped me integrate the function into my existing descriptions.js implementation while preserving my sentiment analysis bonus.


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
    None of my classmates. However I did consult the TA during office hours about my implementation specificly the numbers displayed on the html pages and wether the approximately match the requirements. I also consulted abot how may I create a Vega-Lite graph and was advised to use the given resources.



5. Is there anything special we need to know in order to run your code?
    Nothing extra is needd to run my code

