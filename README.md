# MooveIT API

<!-- > Backend API for in-house Pulse application for for managing employee progress tracking & appraisal application  -->

## Tech Stack
- Node (https://nodejs.org/)
- Express (https://expressjs.com/)
- MongoDB (https://mongodb.com/)

## Usage
- Clone this repo
- Copy .env.example to a new .env file
- Generate your environment variables

## Install dependencies
```
$ yarn install
```

## Run App
```
# Run in dev mode
$ yarn dev

# Run in prod mode
$ yarn start
```
## For API documentation
- Import pulse.postman_collection.json in postman
- After working on it API, always export your API folder to the root of this application with the same name as above *mooveit.postman_collection.json*
- Then run the command to auto generate the api documentation and automatically push to github
```
$ yarn git
```

## Deploy the API directly to Heroku

```
$ yarn deploy
```

<!-- ## Pushing to github repo
```
$ yarn git
``` -->

### Version: 1.0.0
### License: MIT License
