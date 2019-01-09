# SH Scoping

## Getting started


To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use port 4100 instead of standard React's port 3000 to prevent conflicts with some backends like Node or Rails. You can configure port in scripts section of `package.json`: we use [cross-env](https://github.com/kentcdodds/cross-env) to set environment variable PORT for React scripts, this is Windows-compatible way of setting environment variables.
 
Alternatively, you can add `.env` file in the root folder of project to set environment variables (use PORT to change webserver's port). This file will be ignored by git, so it is suitable for API keys and other sensitive stuff. Refer to [dotenv](https://github.com/motdotla/dotenv) and [React](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env) documentation for more details. Also, please remove setting variable via script section of `package.json` - `dotenv` never override variables if they are already set.  

## Requirements

- Node v8.0.0 or greater
- Google Cloud Platform

### Making requests to the backend API

Using Google API endpoints for backend. 
App.js and Dashboard/index.js contain the url endpoints. 
The scopes are contained in the GCP bucket `sh-scoping-scopes`. The project is `sh-scoping`.
Each top level object in the GCP bucket is a folder that contains two files, a csv and a json for the details of the scope.

## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo over at https://redux.productionready.io/

## Notes for editing CSS

Please make edits for the CSS in the .scss files. Running `npm run watch-css` will compile the .scss files to .css in styles/app.css

## Deployment

Deploy using the google cloud console:

Run `npm run build`. 
Copy and paste build folder into gcp bucket (sh-scoping.appspot.com).
Put a yaml file into the gcp bucket.

Go into gcp, open the shell (Mkdir SH_Scope for new folder if needed)
Run : gsutil rsync -r gs://sh-scoping.appspot.com ./SH_Scope 
(./SH_Scope is folder name)

cd into SH_Scope (make sure app.yaml and build is there)
gcloud app deploy
