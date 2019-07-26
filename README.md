# sobriquets

Repository for my [Sobriquets](https://jamescalixto.com/site/wp-content/uploads/media/sobriquets/main.html) project. Check it out!

## Background
My friends and I are big fans of [Codenames](https://boardgamegeek.com/boardgame/178900/codenames), a team board game where you try to pick out your team's words based on hints. (It's hard to explain, read the game rules for more!)

Nothing about Codenames is particularly difficult to code, and it can be implemented in JavaScript fairly easily. Thus I decided to create an implementation myself, which I named Sobriquets.

## Design decisions and other notes
### Local multiplayer only
While having actual rooms and synchronized browser gameplay would be nice, it was prohibitively technically difficult to implement and also defeats the point of Codenames. The point of the game may be to win, as my high school gym teacher loved to say, but on a higher level it's to enjoy the company of other people. Codenames is best played in-person, and I wanted my implementation to facilitate in-person gameplay rather than supplant it.

### Synchronization
I used something slightly more sophisticated than the honor system to ensure synchronization. Namely, the random seeds are designed to synchronize everyone's boards while still 
