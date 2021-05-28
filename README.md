# Spotify-Album-Radar

***Project Description:***
This project is for anyone who loves listening to music and wants to keep track of their favourite artists’ latest songs. Users will be able to connect their Spotify account to our website and store their favourite artists in the database. Users can find a list of newly-released songs created by their favourite artists in the past week. If time permits, users may be able to schedule to receive notifications/updates when a new song is released.

***Who is it for?***
- Avid Music Listeners/ Spotify Users!

***What will it do? (What "human activity" will it support?)***
- Retrieve the latest songs from selected artists from Spotify

***What type of data will it store?***
- Artists and their new songs (from the past week)

***What will users be able to do with this data?***
- Listen to the song
- Add these songs to existing playlists

***What is some additional functionality you can add/remove based on time constraints?***
- Grabbing artists from a playlist
- Get the latest songs from an Artist you follow.
- Project Task Requirements:

***Minimum Requirements (3-5)***
```
- User + Artist tracking
- User authentication for spotify should work to link user account
- User should be able to see a per-user home/profile page
- User should to able to manually add artists to track
- DB should be able to save user’s tracked artists
- Link DB to Users
- Add entry to DB when user adds new artist
- The release retrieval job should be functional
- Release retrieval should pull all tracked artists from DB
- Job should find the most recent song released by artists, check whether the date of release is within the past week (past 7 days from when Job was run)
- If so, then job updates DB with “most recent” song, else nothing happens
- Users should be able to see a “new releases” page/section, where songs fitting the criterion from 3) appear. Songs must be from user’s tracked list of artists
- Pull entries from DB and display newly released songs
- Songs should be listed underneath the correct artist
```

***Standard (2-4):***
```
- User should be able to specify playlist from which to pull tracked artists from (Automated artist parsing)
- Release retrieval job can be scheduled to run once a week
- User should be able to play a newly released-song from an artist on the website
- User should be able to remove an artist from their favourite artists
```

***Stretch (2-3):***
```
Have the job update a user specified playlists with the filtered “most recent” songs.
User should specify a playlist for app to update
Have the job send an email summary of weekly updates
```

***Task Breakdown***
```
- Log in with spotify account
  - Account can keep track of a list of artists
- Should be able to track an artist
  - Should be able to look up an artist
  - Should have a list of artists to track
- Should return an artist’s new songs every week
  - Display and maybe save to account
```

