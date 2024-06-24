# Bowling Score Calculator 🧮

This is a simple web application that calculates the score during a game of ten pin bowling.

## Brief rules explanation 🎳

A game consists of ten frames. Frame 1-9 are composed of two rolls. Frame 10
can be composed of up to three rolls depending on if the first rolls in the
frame is a strike or a spare.
 - Each frame can have one of three marks:
      - Strike: all 10 pins where knocked down with the first roll.
      - Spare: all 10 pins where knocked down using two rolls.
      - Open: some pins where left standing after the frame was completed.
- When calculating the total score, the sum of the score for each frame is used
     - For an open frame the score is the total number of pins knocked down.
     - For a strike, the score is 10 + the sum of the two rolls in the following frame.
     - For a spare, the score is 10 + the number of pins knocked down in the first roll of the following frame.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Clone repo ⬇️

Clone repository via https or ssh, then go to the cloned repo, and install dependencies.

## Install dependencies 📦

Run `npm i` to install all required dependencies. **Prerequisites - node at least v18.19.1, npm - 10.2.4**. For convenient managing 2 or more node/npm versions,
[NVM](https://github.com/nvm-sh/nvm) is recommended.

## Development server ⚙️

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests 🔬

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Navigate to `http://localhost:9876/`.


## Build 🛠️

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Developers hint 💾

Application uses [NgRx State Management](https://ngrx.io/) with provided store devtools [ Redux DevTools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?pli=1), which allows to track the application state via developer's tools (placed in the corresponded tab).
