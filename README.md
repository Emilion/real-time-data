# Real Time Data - demo app

Real time data demo app was required by Relay42.

## Description

For more info about [Client](https://github.com/Emilion/real-time-data/tree/master/client)

For more info about [Server](https://github.com/Emilion/real-time-data/tree/master/server)

## Specifics

* The server handle one client connection.
* Server needs to be started before the Client, otherwise you`ll need to refresh the client because
the client establish the connection on initial load.

* Once web-socket is opened it could be broken by refreshing the client. (no error handling on server side)

# Installation Guide

Installation is separated on 2 parts - Client and Server

## server installation guide

* open a terminal and navigate to ` ${project-folder}/server`
* execute `>npm i` to install all dependencies
#### Run server
* execute `>npm run serve` or `node index.js`

## client installation guide

* open a terminal and navigate to ` ${project-folder}/client`
* execute `>npm i` to install all dependencies

#### Development server
* execute `npm start` or run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Build

* Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Known issues

Chart.js has issue with tick rendering on chart data update. They work on this issue.