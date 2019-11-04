# Dutch Blitz Scorekeeper Web App

My name is Jacob and I'm the developer behind this app! I built this after being fed up with always trying to keep score on a piece of paper or in the 'notes' app on my phone whenever playing Dutch Blitz with my friends. There was constant mental math going on and we wasted tons of time between rounds trying to deal with lots of positive and negative numbers!

There's still some wrinkles to be ironed out and some fun features I'd like to add in the future. But this app is usable as-is! Consider it an MVP (minimum viable product).

## What is Dutch Blitz?

Dutch Blitz is a super fun card game. One of my favorites. It's not turn-based, like most other games. On 'go', everyone plays cards in the middle of the table at the same time. It's a race to be the first to get rid of your deck of ten cards! Each player's round score then accumulates. So every round, your score will be added or subtracted from the last. Scores get to high numbers in this game!

If you'd like to learn more about the game, you can check out the [Dutch Blitz website](https://dutchblitz.com/).

## How this app works

This web app is a scorekeeper for Dutch Blitz. The group must designate one player to create a new game in the app. The player who creates the game is called the 'Gamemaster'. Once the game is created, there are two ways to use the app.

1. The Gamemaster can manually add players with the lower-left "add player" icon. The players who are created by the Gamemaster will also be scored from the Gamemaster's interface via a "Submit Score" popup. Only one device is used for this method.

2. Using the game title and password (both case-sensitive), players on their own devices can join the live game server. When the gamemaster ends a round, a "Submit Score" popup will appear on each players' devices where they can enter their own score for that round. The users' interfaces will **live update** every time any game data is updated (new round, winner selected, score submitted, etc.).

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
- If the gamemaster created any offline players, the "Submit Score" popup will remain, and the Gamemaster may enter the round score for any created players. If no Gamemaster-created players are present, the popup will close.

6. Go to New Round

- Once all players' scores are submitted for that round, the disabled "Next Round" button will be enabled, and Gamemaster may proceed to the next round.
- "Next Round" button DOES NOT start the round. Only initiates the game to the next round.
- Once "Next Round" is pressed, the round lifecycle will go back to step 4 and repeat as many times and established by Gamemaster or until the game is ended.

7. Ending the Game

- The game will automatically end after the number of rounds set by Gamemaster. At the start of last round, players will be noitified via the information banner below navigation that it is the last round. Once all players have submitted scores for the last round, game automatically ends and Gamemaster footer disappers.
- The gamemaster may manually end the game via the red "End Game" button in the Gamemaster footer. This button is only enabled at the end of each round after all players have submitted their scores.

## Tech Talk

As a web developer of about 2 years, this is by far the most fun I've had building something. It's certainly the most complex application I've worked on.

### The Stack

Why did I choose this particular stack?

#### Backend

- Node
- Express
- MongoDB
- Pusher
- Heroku

#### Frontend

- React
- Redux
- react-router
- Pusher
- Material UI
