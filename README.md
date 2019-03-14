# Grade Keeper

This is the grade keeper coding exercise for LogRhythm. See `instructions.md` for assignment

## Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

There are two ways to run this app; with or without docker.  
If docker and docker-compose are installed on your system, just run

```
docker-compose up
```

Navigate to `http://localhost:3000` to use the grade keeper

If you want to run this locally without docker, ensure you have [Node](https://nodejs.org/en/) installed on your system. I tested this with Node v11.11.0.  
Next, ensure you have yarn installed

```
npm i -g yarn
```

Finally, navigate to the `frontend` folder and run

```
yarn install
yarn start
```

Navigate to `http://localhost:3000` to use the grade keeper.

## Assumptions

- The student size will remain relatively small (< 100 or so). If the student size grew anymore than this, then it would be better to implement paging for the student table. If the student size was incredibly large, it would be better to calculate the statistics (like average) in a DB
- There is only 1 test. This application does not allow a teacher to input data for more than 1 test. If we needed that, then I could create functionality to add tests, and have grades linked to a testId and studentId.

## Design

All of the code is located in the `frontend` directory. This is because I really like the [monorepo](https://danluu.com/monorepo/) setup for projects, so if this were to require and API, DB, or any other services, they could all reside in this folder.

I'm using the default Create React App scripts, however for more customization, I would likely eject to customize webpack configs.

I opted to use localstorage to store all of the student data for this application. I've wrapped each call to localstorage with a `Promise` as this would make it easier in the future to offload all of the data management to an API without having to change the frontend. Localstorage was the simplest way to store data for such a small application. If more data was needed (i.e. multiple tests with student scores for those tests), it would be better to store those in some sort of relational DB with a restful API sitting in front of it.

I use lodash's `get` method in many places as it helps ensure that I deal with potentially undefined data upfront (which can reduce runtime errors)

I used the new React `useState` hook in a few places as it is helpful to have local state to control showing / hiding elements local to an element without having to clutter the redux state with that information.

I used `redux-thunk` to handle dispatching asynchronous actions for all of the CRUD actions on a student. Because I'm using localstorage, everything resolves pretty much immediately, so I do not include any kind of `Loading...` icon in the app. However the state does update, so if moved to an API it would be simple to add in the loading UI.

`redux-act` is used to help keep actions creators and reducers consistent, plus it reduces some of the boilerplate necessary to create actions and reducers.

I only have 1 reducer because the app state is so small; breaking this out into more reducers and using `combineReducers` would be preferred as the app state continues to grow.

I used `bootstrap` without any customization. This makes the app look very generic, however I think that it is great for getting POC apps off the ground. Spending time overriding bootstrap defaults would help to make this app look unique.

## Improvements

UX - Figuring out how the user is actually using this would help drive better design choices

Responsive design - this doesn't look great on mobile

Unit tests - Using jest to test individual components as well as the api methods would help ensure the quality of this code

More reusable components. Right now there is just one form component used to create and edit. Tables, Forms, Buttons, etc... should all be generic components with a unified style that can be used throughout the app.

Sorting and filtering on the table to find students if the list grows large enough.

More validation - There are definitely more things I have not validated against which would be good to catch in the UI. Stripping out leading and trailing spaces, no special characters, etc...
