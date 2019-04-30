# Wolverine

This application is a simple maze game.

## Configuring the Application

- If using the Azure-hosted maze service, then no changes are needed.
- If using a local version of the maze services, then update the `src/environments/url.json` file to point to the localhost services.

## Running the Application

- Type the command `ng serve` to start up the development server
- Navigate to `http://localhost:33333/`. 


## Building the Application

- Run `ng build` to build the project. 
  - The build artifacts will be stored in the `dist/` directory.
  - Use the `--prod` flag for a production build.

## Running the Unit Tests

- Type the command `ng test common` to run the common library unit tsts.
- Type the command `ng test` to test run the main program's unit tests.

## Running End-to-End Tests

Not implemented yet

## Known Issues

- The game state does not save on refresh.  This could be stored in session storage.
- The game has not been localized.  Adding ngx-translate (or the newly built-in Angular i18n) would fix this.
- The exit should be placed in the furthest point from the starting point in the maze.  Currently, it is always placed in the lower right corner.
- The maze generation algorithm tends to create long, winding paths, but does not usually have many path options.  This results in fairly trivial mazes to solve.  A different maze generation algorithm could be used to generate more interesting mazes.
