# Robo-Tapper

As the sole-proprietor of the local Robot Saloon, you'll have to work quickly to ensure that all your customers are served before their thirst overtakes them...and they overtake you!

## Background

Tapper is a classic arcade game released in 1983 by Bally Midway, which originally required players to serve beer to unruly customers, before being rebranded shortly thereafter to Root Beer Tapper in 1984, at which time the alcoholic drinks were substituted with Root Beer.

The goal of the game is to slide drinks down the bar to all customers (who in turn slide a little bit down toward the exit doors with each received drink), until all customers have been "served" out of the building, at which time the next level is loaded with an increased difficulty. Customers continue to move slightly closer to the front of the bar when not being served.

The player can lose a life by:

 - Allowing any customer to reach the front of the bar (as the unruly and unserved customer will dispose of the player)

 - Serving a full stein to an empty bar (or to customers who already have drinks), such that the full stein falls to the floor

 - Failing to catch any of the customers' empty steins that they slide back down the bar upon finishing their drink, such that an empty steins fall to the floor

Once all three lives have been lost, the game resets automatically, such that the level and difficulty decrease while the three available lives are restored.

This implementation of Tapper, Robo-Tapper, also features a futuristic theme using all original artwork and animation, in which the player and customers are robots lounging in a Robot Saloon.

## Player Features:

  - Start and reset the game

  - Continue onto harder levels and difficulties

  - Earn and maintain a running high score between games

  - Serve drinks to robots

  - Clean up empty steins

  - Be assaulted by unruly customers who reach the front of the bar without being served

## Technologies Used

HTML 5 Canvas, Vanilla JavaScript, and the CreateJS library were used to implement this project.

In terms of decomposition, the source code is structured across 9 files, which is then bundled into a single file using webpack.

All collision detection functions were custom implemented to ensure complete control over functionality without reliance on an additional external library.

## Bonus features

With time permitting, I'd like to also pursue the following additions to this project:

  - Add mini-game between levels, as included in the original

  - Add additional levels, as related to the graphical background rather than solely the difficulty level

  - Add an intro that emulates the boot-up style of the classic arcade machines on which these were originally run
