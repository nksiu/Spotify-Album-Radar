# Spotify-Album-Radar

**_Project Description:_**
Spotify Album Radar is for anyone who loves listening to music and keeping up to date with their favourite artists’ latest songs. Users will be able to connect their Spotify account to our website and follow their favourite artists for new releases. By subscribing to artists, Spotify Album Radar will show all the newest releases in the past week.

## Requirements

#### Minimum Requirements (3-5)

- [x] User + Artist tracking
  - [x] User authentication for spotify should work to link user account
  - [x] User should be able to see a per-user home/profile page
  - [x] User should to able to manually add artists to track
- [x] DB should be able to save user’s tracked artists
  - [x] Link DB to Users
  - [x] Add entry to DB when user adds new artist
- [x] The release retrieval job should be functional
  - [x] Release retrieval should pull all tracked artists from DB
  - [x] Job should find the most recent song released by artists, check whether the date of release is within the past week (past 7 days from when Job was run)
- [x] If so, then job updates DB with “most recent” song, else nothing happens
- [x] Users should be able to see a “new releases” page/section, where songs fitting the criterion from 3) appear. Songs must be from user’s tracked list of artists
  - [x] Pull entries from DB and display newly released songs
  - [x] Songs should be listed underneath the correct artist

#### Standard (2-4):

- [x] User should be able to specify playlist from which to pull tracked artists from (Automated artist parsing)
- [x] User should be able to play a newly released-song from an artist on the website
- [x] User should be able to remove an artist from their favourite artists

#### Stretch (2-3):

- [ ] Have the job update a user specified playlists with the filtered “most recent” songs.
- [x] User should have playlist updates based off subscribed artists
- [ ] Release retrieval job can be scheduled to run once a week
- [ ] Have the job send an email summary of weekly updates

## Description of Technology used:

#### CSS / HTML / JS:

- For HTML React uses index.html to create the document and we use actual html tags like divs.
- For CSS we used the styled-components library where we write our CSS as a component.
- For JavaScript our business logic heavily relies on it, such as ternary operators. JavaScript is also used heavily as React/Express serves as JS frameworks.

#### React

- All our frontend have been broken down using functional components and React Hooks. React Hooks are used to manage states for the UI and managing API calls.

#### Node & Express:

- Node and Express was used to set up APIs used for adding, deleting, update, and removing favourite artists.

#### NoSQL with MongoDB:

- When users add their favourite artists and log in with Spotify Auth, we use MongoDB using a NoSQL schema to persist all of the user data.

#### Release Engineering:

- Our production ready project is deployed on Heroku and can be found in the following [link](https://spotifyreleaseradar.herokuapp.com/). We also have a GitHub Workflow which automatically deploys all changes made when merged into the main branch.

## Above and Beyond Functionality

- As the complexity of our project grew, managing the states of all our components became increasingly difficult. This is where we decided to use Redux as it would help manage state but also help propagate the state changes across all of our components.

## Description of Next Steps

- We were unable to complete one of our stretch goals which was to add email notifications to the user of weekly updates. This would greatly enhance the user experience which is what we greatly value.

## List of Contributions

#### Barry Sin

-

#### Kelvin Lo

- In the frontend, I designed the Navbar with styled-components and used a router to link the different pages. In the backend, I implemented the user /me endpoint and setup the MongoDB schemas for storing data. Finally, I helped deploy the application, restructing files and code required to function in production.

#### Nicholas Siu

- I set up the initial project and its file structure. When we decided to move to Redux I set this up as well. For features, I developed OAuth handling on Express, login/logout on the platform, playlist dropdown, song parsing, and helped deploy the application to heroku

#### Tristan Lei

- I created and styled the initial user management page in the front-end, and eventually set the database up later on to save and update a user's changes to their subscribed artists. In the backend, I set up the playlist creation service, and also set up toggle management for when a user would like the app to start/stop actively managing a release playlist. Finally, I created a service in the backend to import artists from a user's playlist as well, and also assisted to create the MongoDB schemas.
