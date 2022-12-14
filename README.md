# Quest

## Description
Quest is a social media application which aims to encourage interactions outside of social media through gamification. Users are encouraged to level up their pokemons by meeting and socializing with other users in their neighbourhood through quests. Quests can be anything from a request to perform a task together to an invitation to explore a place to simply completing chores together.

Watch a demo of this app here: https://www.linkedin.com/posts/nandini-asokan_concordia-bootcamp-finalproject-activity-7005643718493908993-ZxDV?utm_source=share&utm_medium=member_desktop

Try it out here: https://poke-quest.onrender.com/

## Pages
- **Avatar Setup**
Users will be able to choose from a set of un-evolved pokemon sprites. Once chosen, they will be redirected to the home page with their new profile all setup.

- **Home**
    - Map of neighborhood (QuestMap) with markers displaying location of open tasks. 
    - Clicking on a marker will show details of the quest (SingleQuest), directions to the quest and points(karma) to be earned. 
    - Quest creator's avatar can be clicked to redirect to the user's profile page(Profile). 
    - Clicking on a map will open a form(NewQuest) for user to create a new quest. Address will be taken from coordinates of location on the map. User can also choose to create a new quest and input the address.

- **Profile**
    - Display the user's current avatar as well as how many tasks need to be completed to “level up”. 
    - Display user’s karma points:
        - Karma points are earned by completing quests from other users. 
        - Karma points can be used to post quests for other users. 
    - Display the user’s list of quests owned (QuestAdmin). User can choose to delete the quest if no other users have joined OR complete the quest if there are other users on the quest.
    - Report button can be used to report users breaching community rules. (ReportUser)
    - Player stats which is a rating system for others in the community to rate users i.e. on charisma, kindness etc. (UserRatings)). 

- **Leaderboard**
    - Page displaying users with karma points. 

- **Admin**
     - Manage reports from the community on any users who are not complying with community rules.


## Server Endpoints
	| Endpoint | Method| Description |
    | ----------- | ----------- |
    | /cred | GET | Endpoint to send API credentials required by front end |
    | /new-user | POST | Endpoint to create new User |
    | /user/:id | PATCH | Endpoint to add ratings |
    | /user-level/:id | PATCH | Endpoint to update user level |
    | /user | POST | Endpoint to get logged in user details on log in |
    | /user/:id | GET | Endpoint to get logged in user details by Id |
    | /users | GET | Endpoint to send all users |
    | /report/:id | POST | Endpoint to report a user to Admin |
    | /reports | GET | Endpoint to get all user reports |
    | /new-quest/:ownerId | POST | Endpoint to create new quest |
    | /quest/:id | PATCH | Endpoint to add participant to quest |
    | /completed-quest/:id | PATCH | Endpoint to mark quest as complete |
    | /quest/:id | DELETE | Endpoint to delete quest |
    | /quest/:id | GET | Endpoint to get particular quest |
    | /quests/:id | GET | Endpoint to get all logged in user's quests |
    | /quests | GET | Endpoint to get all quests |
    | /avatar | GET | Endpoint to get all first gen pokemon sprites|

## Mongo Collections
- **Users**
    - Stores all user details including first name, last name, user email, user profile picture, user avatar, level, karma points, task points and timestamps on creation/update.
- **Quests**
    - Stores all quest details including title, description, karma points, difficulty, participants count and ids, owners id, owner's pokemon type and timestamps on creation/update.

## Next Steps
    - Move googlemaps and cloudinary credentials to front end to hide them from appearing in network tab.
    - Users should be able to leave quests.
    - Notifications on users joining/leaving quests. Notifications on quest completion.
    - Internal chat app for users to communicate with each other.