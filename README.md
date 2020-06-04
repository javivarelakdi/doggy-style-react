# README
​
# Project Name
​
Doggy Style React App
​
## Description
​
Social Network for dogs with Geolocation using Express and Mongoose. Provided with real time chat using socket.io FrontEnd made with ReactJS

## Instructions how to start

create `.env` file like the example `.env.sample`

start with `npm run start`​

Frontend **http://localhost:3000**

Backend **https://doggy-style-api.herokuapp.com**

## User Stories (MVP)
​
**Sign up** - As a user I want to sign up on the webpage so that I can access to app functionalities
​
**Login** - As a user I want to be able to log in on the webpage so that I can get access to homepage.
​
**Homepage - Dogs grid** - As a user I want to be able to access the homepage so that I see a grid of closer dogs sort by distance.
​
**Favourites** - As a user I want to be able to access to a grid with dogs that added me as favourite, and another with my favourite dogs .
​
**Own profile** - As a user I want to be able to access to a page with info about my dog, and be able to edit it.
​
**Others profile** - As a user I want to be able to access to a page with info about other dogs with distance from me by geolocation, a button to chat and a button to make it favourite.
​
**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Events list** - As a user I want to see all the events available so I can choose which ones I want to attend
​
**Events create** - As a user I want to create my own event.
​
**Events detail** - As a user I want to see the event details and attendees profiles list 
​
**Attend event** - As a user I want to be able to attend to event so that the organizers can count me in

**Geolocation** - As I user I want to see grid sorted by location (featuring first those closer to me). This information must be available also for events.
​
**Chat** - As a user I want to chat with other dog owners featured in my grid

**Filters** - As a user I want to filter the main page according to different criteria (gender, breed, age)

## ROUTES Backend:

### Backend Endpoints

| Method | Path                   | description           | Body |
| :----: | ---------------        | --------------------  | ---- |
|  GET   | `/users/:id`           | fetch user profile    |      |
|  GET   | `/users/`              | fetch users data      |      |
|  GET   | `/events/:id`          | fetch event profile   |      |
|  GET   | `/events/`             | fetch events data     |      |
|  POST  | `/events/new`          | create event          | `{ owner, name, description, location, date, initTime, endTime }` |
|  POST  | `/events/:id`          | Update event profile  | `{ name, description, location, date, initTime, endTime }` |
|  POST  | `/events/:id/delete`   | Delete event profile  |      |
|  POST  | `/users/:id`           | Update profile        | `{ about, imgUrl, favs, fans, location }` |
|  GET   | `/messages/`           | fetch chat list       |      |
|  GET   | `/messages/:id`        | fetch 1 chat data     |      |
|  POST  | `/messages/:id`        | update 1 chat data    | `{ conversation, content, owner, timeStamp }`  |

### Backend Auth endpoints

| Method | Path      | description    | Body                     |
| :----: | --------- | -------------- | ------------------------ |
|  GET   | `/whoami` | who am i       |                          |
|  POST  | `/signup` | signup a user  | `{ username, password, imgUrl, breed, birth, gender, about }` |
|  POST  | `/login`  | login a user   | `{ username, password }` |
|  GET   | `/logout` | logout session |                          |


## Frontend Views

| View (Component)  | Path             | description     |
| :---------------: | ------------     | --------------  |
| Home              | `/`              | profiles grid   |
| Login             | `/login`         | login page      |
| Profile           | `/:id`           | profile view    |
| Favourites        | `/favs`          | favs grid view  |
​| Events            | `/events`        | Events list     |
​| Events            | `/events/:id`    | Event view      |​
​| Chat List         | `/messages`      | Messages list   |​
​| Chat one to one   | `/messages/:id`  | individual chat |​

## Data Models
​
### User model
​
   {
    	username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        imgUrl: String,
        breed: String,
        birth: Date,
        about: String,
        location: {type: Schema.Types.ObjectId, ref: 'Location'},
        gender: { type: String, enum: ['female', 'male', 'non-binary'] },
        favs:[{ type: Schema.Types.ObjectId, ref: 'User' }],
        fans:[{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
	{ timestamps: true }

### Event model
​
	{
		owner: { type: Schema.Types.ObjectId, ref: "User" },
		name: { type: String, required: true },
		description: String,
		location: { type: Schema.Types.ObjectId, ref: "Location" },
		date: { type: Date, required: true },
		initTime: { type: String, required: true },
		endTime: { type: String, required: true },
		attendees: [{ type: Schema.Types.ObjectId, ref: "User" }]
  	},
	{ timestamps: true }	

### Location model

	{
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point',
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	{ timestamps: true }

### Chat Room model

	{
		users: [{ type: Schema.Types.ObjectId, ref: "User" }],
		messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
	},
	{ timestamps: true }

### Chat Message model

	{
		sender: { type: Schema.Types.ObjectId, ref: "User" },
		content: String
	},
	{ timestamps: true }
​

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/javivarelakdi/doggy-style-react)

[Deploy Link](https://doggy-style.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1AW-UOcVg-8gADT0Gihq1Q9JnJjMtGPZ6BZayNAXQKQA/edit?usp=sharing)

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

