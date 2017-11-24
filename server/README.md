# Server

## Brief description

THe server is created to support and provides basic functionality to
real-time-data client application.
It use webSocket and random generated data pursuant to the given data model.

`The values are random generated.`

## Specifics

* The server handle one client connection.
* Server needs to be started before the Client, otherwise you`ll need to refresh the client because
the client establish the connection on initial load.