# Twitch Tracker Frontend

This is the frontend server of the Twitch tracker project.
The corresponding [Backend](https://github.com/ThomasProust/twitch-backend.git) of the application is needed for this to be able to run.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.

## Prerequisites and Setup

In order to to fetch the required data, you first need to modify the `baseUrl` in you environment files `src/environments` to match the one of the [BackEnd](http://github.com/ThomasProust/twitch-backend.git). Also verify that [Angular CLI](https://github.com/angular/angular-cli) is installed on your machine in order to run the commands hereafter.

Finally, before proceeding further, make sure that your [BackEnd](https://github.com/ThomasProust/twitch-backend.git) setup is totally done, including seeding the required data in to the database.
If you haven't already, you can use following curl commands:

```sh
curl -X POST http://localhost:5000/games -H "Content-Type: application/json" -d '{"name": "Far Cry 5"}'
curl -X POST http://localhost:5000/games -H "Content-Type: application/json" -d '{"name": "Assassin\s creed odyssey"}'
curl -X POST http://localhost:5000/games -H "Content-Type: application/json" -d '{"name": "Tom Clancy's Rainbow Six Siege"}'
```

In order to to fetch the required data, you first need to modify the `baseUrl` in you environment files `src/environments` to match the one of the [Backend](http://github.com/ThomasProust/twitch-backend.git). Also make sure [Angular CLI](https://github.com/angular/angular-cli) is installed on your machine in order to run the commands hereafter.

Install the application's dependencies by running `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
