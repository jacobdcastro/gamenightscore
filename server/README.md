# Order of Events

1. Create game

- Go to public route /create-game with form
- Fill out form for title, password, max number of rounds, and hide scores.
- On submit, send POST request to /api/games/new with formData as body
- Create new game in DB with GameSchema
- Return JWT + gameId so game creator can access protected route to create Player
- Promote game creator to "Gamemaster"

2. Gamemaster Player

- After response w/ JWT + gameId is recieved, redirected to private route /create-player with form
- Fill out form for name and pin (to re-login easier)
- On submit, send POST request to api/players/new
