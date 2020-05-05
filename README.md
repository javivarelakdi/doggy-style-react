# README
​
# Project Name
​
Doggy Style React App
​
## Description
​
Doggy Style is a social network for dog owners who want to make connections with other dog owners in their neighbourhoods

## Instructions how to start

create `.env` file like the example `.env.sample`

start with `npm run start`​

Frontend **http://localhost:3000**

Backend **http://localhost:5000**

## User Stories (MVP)
​
### ***Sign up** - As a user I want to sign up on the webpage so that I can access to app functionalities
​
### **Login** - As a user I want to be able to log in on the webpage so that I can get access to homepage.
​
### **Homepage - Dogs grid** - As a user I want to be able to access the homepage so that I see a grid of closer dogs sort by distance.
​
### **Favourites** - As a user I want to be able to access to a grid with dogs that added me as favourite, and another with my favourite dogs .
​
### **Own profile** - As a user I want to be able to access to a page with info about my dog, and be able to edit it.
​
### **Others profile** - As a user I want to be able to access to a page with info about other dogs with distance from me by geolocation, a button to chat and a button to make it favourite.
​
### **Events list** - As a user I want to see all the events available so I can choose which ones I want to attend
​
### **Events create** - As a user I want to create my own event.
​
### **Events detail** - As a user I want to see the event details and attendees profiles list 
​
### **Attend event** - As a user I want to be able to attend to event so that the organizers can count me in
​
### **Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
​
### **Geolocation** - As I user I want to see grid sorted by location (featuring first those closer to me). This information must be available also for events.
​
### **Chat** - As a user I want to chat with other dog owners featured in my grid
​
### **Filters** - As a user I want to filter the main page according to different criteria (gender, breed, age)
​

## ROUTES Backend:

### Endpoints

| Method | Path                   | description           | Body |
| :----: | ---------------        | --------------------  | ---- |
|  GET   | `/protected`           | protected route       |      |
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

### Auth endpoints

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
| Protected         | `/protected`     | protected view  |
| Profile           | `/users/:id`     | profile view    |
| Favourites        | `/favs/:id`      | favs grid view  |
​| Events            | `/events/`       | Events list     |
​| Events            | `/events/:id`    | Event view      |​
​| Chat List         | `/messages`      | Messages list   |​
​| Chat one to one   | `/messages/:id`  | individual chat |​

## Models
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
    }

### Event model
​
	{ 
    	owner: { type: Schema.Types.ObjectId, ref: 'User'},
		name: { type: String, required: true },
		description: String,
		location: {type: Schema.Types.ObjectId, ref: 'Location'},
		date: { type: Date, required: true },
		initTime: { type: String, required: true },
		endTime: { type: String, required: true },
		attendees:[{ type: Schema.Types.ObjectId, ref: 'User' }]
	}

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
	}

### Message model

	{
		owner: { type: Schema.Types.ObjectId, ref: 'User'}, 
		content: String,
		timeStamp: String
	}
​
### Trello

Link to Trello

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com/)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](http://slides.com/)



