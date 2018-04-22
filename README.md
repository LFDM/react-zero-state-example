# What is this?

This code was presented during a talk at [JSUnconf
2018](https://2018.jsunconf.eu) under the title **You don't need state
management - Concepts for rapid and bug-free web development in React**.

It documents how thinking about ownership of data/state can lead to a
clean separation of concers and allows you to move almost all of your
state handling out of your actual application code/features.



# Setup

- `npm install & npm start`
- Open your browser at
  [http://localhost:8080/praise](http://localhost:8080/praise)


# How to navigate this repo

- `src/features/Praise` contains the main code you want to see here. It
  implements the page you navigated to in *less than 280 Lines of Code*!
- The entry point to the application is in `index.js` and
  `src/routing/App.js`
- `src/api` contains the configuration for
  [Ladda](https://github.com/ladda-js)
- `src/components` and `src/layout` contains re-usable UI components - treat
  them as if they were coming from an external library
- `src/mockBackend` contains some code which pretends to be a backend which
  gives and perists data for you



Watch this repository and the [tech blog at Small
Improvements](https://tech.small-improvements.com). We'll add a
schematic overview and a full written explanation of this code soon!
