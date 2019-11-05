# Dutch Blitz Scorekeeper Web App

My name is Jacob and I'm the developer behind this app! I built this after being fed up with always trying to keep score on a piece of paper or in the 'notes' app on my phone whenever playing Dutch Blitz with my friends. There was constant mental math going on and we wasted tons of time between rounds trying to deal with lots of positive and negative numbers!

There's still some wrinkles to be ironed out and some fun features I'd like to add in the future. But this app is usable as-is! Consider it an MVP (minimum viable product).

## What is Dutch Blitz?

Dutch Blitz is a super fun card game. One of my favorites. It's not turn-based, like most other games. On 'go', everyone plays cards in the middle of the table at the same time. It's a race to be the first to get rid of your deck of ten cards! Each player's round score then accumulates. So every round, your score will be added or subtracted from the last. Scores get to high numbers in this game!

If you'd like to learn more about the game, you can check out the [Dutch Blitz website](https://dutchblitz.com/).

## How this app works

This web app is a scorekeeper for Dutch Blitz. The group must designate one player to create a new game in the app. The player who creates the game is called the 'Gamemaster'. Once the game is created, there are two ways to use the app.

1. The Gamemaster can manually add players with the lower-left "add player" icon. The players who are created by the Gamemaster will also be scored from the Gamemaster's interface via a "Submit Score" popup. Only one device is used for this method.

2. Using the game title and password (both case-sensitive), players on their own devices can join the live game server. When the Gamemaster ends a round, a "Submit Score" popup will appear on each players' devices where they can enter their own score for that round. The users' interfaces will **live update** every time any game data is updated (new round, winner selected, score submitted, etc.).

Note: you may combine both methods. If some players want to join the live game server from their devices while others don't want to be bothered doing so, it still works perfectly fine.

Of course, when players enter their score, they only enter the score for **that single round**. The app will automatically add to or subtract from the player's current total score. No more mental math needed!!!

The game will automatically end after the amount of rounds the Gamemaster set it to at the creation of the game.

## Order of Events

1. Create game

- Go to public route /create-game with form
- Fill out form for title, password, max number of rounds, and hide scores.
- On submit, game is created and user redirected to enter their in-game username
- Game creator promoted to "Gamemaster"

2. Players Join Game

- Using the case-sensitive title and password for the game, join the live game
- With correct credentials, redirected to create your in-game username.

3. Join Game Lobby

- All players can view the live standings (players position, name, score, and best/worst round scores)
- All players can view list of rounds with the winner of that round, and how long the round lasted.
- Gamemaster's interface features a footer with Gamemaster controls. They may add players, end game early, or proceed with round lifecycle actions.

4. Start Round

- Gamemaster starts round with "Start Round" button in Gamemaster footer.
- Once round is started by Gamamster, play your round of Dutch Blitz

5. End Round

- When a player calls "Dutch Blitz", the round is over. Gamemaster may press "End Round" button in Gamemaster footer.
- For players who joined the live game server from their own devices, a popup will automatically appear to enter thier score for that round.
- On the Gamemaster's interface, a popup to select the winner of that round will appear. Select the winner (whoever called "Dutch Blitz" to end round).
- Once winner is selected, a popup to enter the Gamemaster's own score will appear. Enter the score for that round.
- If the Gamemaster created any offline players, the "Submit Score" popup will remain, and the Gamemaster may enter the round score for any created players. If no Gamemaster-created players are present, the popup will close.

6. Go to New Round

- Once all players' scores are submitted for that round, the disabled "Next Round" button will be enabled, and Gamemaster may proceed to the next round.
- "Next Round" button DOES NOT start the round. Only initiates the game to the next round.
- Once "Next Round" is pressed, the round lifecycle will go back to step 4 and repeat as many times and established by Gamemaster or until the game is ended.

7. Ending the Game

- The game will automatically end after the number of rounds set by Gamemaster. At the start of last round, players will be noitified via the information banner below navigation that it is the last round. Once all players have submitted scores for the last round, game automatically ends and Gamemaster footer disappers.
- The Gamemaster may manually end the game via the red "End Game" button in the Gamemaster footer. This button is only enabled at the end of each round after all players have submitted their scores.

## Tech Talk

As a web developer of about 2 years, this is by far the most fun I've had building something. It's certainly the most complex application I've worked on.

### The Stack

Why did I choose this particular stack? Because the primary language I code in is JavaScript. I absolutely love JS. Though I'm excited to learn some new languages in the future (Python, PHP, maybe even Ruby), I've decided to triple-down on my JS skills.

With that said, this app is a MERN app! I preferred writing JS on the server and I just genuinely love React. Especially some hooks... There's not a single class component in this app. Arrow functions only!!!

Anyways, here is the stack in depth:

#### Backend

- [Node.js](https://nodejs.org/en/)
  - Just a powerful library for server-side JS.
- [Express](https://expressjs.com/)
  - The server-side web framework that I enjoyed using. I'd only known basic Express before jumping head-first into this project. I learned a lot about Express and server development in general just by developing this!
- [MongoDB](https://www.mongodb.com/)
  - The NoSQL database that stores all the game data! I used MongoDB's change streams for use with Pusher (explained below) to keep all client's updating live with every change in the database.
- [Mongoose](https://mongoosejs.com/)
  - The library which connects Node.js apps to MongoDB databases. Came in handy for this stack!!! Took me a while to learn how to structure the game data model properly, but after lots of Mongoose documentation reading, I got it all to work well with documents, subdocuments, etc.

#### Frontend

- [React](https://reactjs.org/)
  - React is simply amazing! I've only done very little Vue and Angular development, but I've done lot's of React development and was the obvious choice for me. I find React to be particularly fun and enjoyable, and learned a lot about complex rendering through building this app's UI.
- [Redux](https://react-redux.js.org/)
  - The heartbeat of this app runs on the game's data model. There needed to be a single source of truth stored for every component in the game lobby to access. After reading through documentation, I decided on using Redux to manage the app state and to keep the game data updated with the database. Redux is the soul of this app.
- [React Router](https://reacttraining.com/react-router/)
  - Though there aren't too many routes in this app, React Router's `<Redirect />` component was super helpful and easy to implement for private routes (/lobby) and for the game joining/creation process.
- [Material UI](https://material-ui.com/)
  - After attempting to style the app on my own, I decided to use Material UI components instead. This app was not meant to be a demonstration in my CSS skills. It was meant to be a more complex project where I focused on logic rather than UI design. Material UI saved the day in making my app look great with minimal effort, as all my effort went straight into some deep stuff logically.
- [styled-components](https://www.styled-components.com/)
  - There still remains some CSS-in-JS that I wrote from the initial UI development before implementing Material UI. Styled-components handles some basic style changes based on state and props, and takes care of some basic layout structure and color definitions. Other than that, the majority of CSS in this app is from the Material UI library.

#### Utilities

- [Heroku](https://www.heroku.com/)
  - Pretty sweet hosting platform. This was my first time ever using Heroku and took me a bit of playing around with the server and heroku settings to finally get it to work. Note: Heroku's CLI is absolutely amazing. I love it.
- [Postman](https://www.getpostman.com/)
  - Having never really done in-depth backend development, Postman came in clutch. It allowed me to test all of my API endpoints using a very streamlined UI in a desktop application. Essentially, I was able to mimic the app's behavior without even working on the UI. Such an awesome API testing platform!!!
- [Pusher](https://pusher.com/)
  - This was the crazy part. Pusher is a service that allows for live-updating an app with a database. Everytime there's a change in the database, Pusher notifies every client that is subscribed about said change. Then, all the clients can fetch the new data to rerender the UI live. One player updates their score, everyone sees the update in realtime. Took a while to get it all working properly, but it works!
- [Sentry](https://sentry.io)
  - The last major piece to be implemented, Sentry simply helps me find bugs. As this is not a perfectly flawless app yet, I'm working on ironing out as many wrinkles as possible and Sentry is helping me spot every wrinkle there is. Pretty cool stuff if you ask me.

Note: None of these libraries or services are sponsors of this project. I am simply sharing what this project uses and my awesome experience with every one of them!
