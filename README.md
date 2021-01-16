# photo-voting-app

## Design Approach

### Tournament

To implement a single-elimination tournament, I need three states: lineups, matchups, and winners. In lineups, I store all images which will be used for each round of the tournament. In matchups, I store two images which a user will vote for which image they prefer. In winners, I keep track of the winner of each round and move winners to the lineup of the next round. For these states, I decide to use React Hooks to manage state and use NodeJS, Express, and MySQL to store the winner of each tournament.

### User Registration

I want to make this part as simple as possible, so I decide to use react-hook-form which supports the validation of user inputs.

## Technology Choices

I choose React for the front-end and NodeJS/Express for back-end because I can use some of my styled-components from my toy projects and this application is small enough to handle with NodeJS/Express.

## Compromise

To make this application as simple as possible, I don't spend too much time automating testing and add a better UI for the tournament. Also, when I have more time to improve this project, I want to add better error handling for user registration, because it is dependent on the library I use the first time.
