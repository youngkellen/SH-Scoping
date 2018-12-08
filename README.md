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

### Making requests to the backend API

For convenience, we have a live API server running at http://ocapp-dev.us-west-2.elasticbeanstalk.com/brand/api/v1 for the application to make requests against. You can view [the API spec here](http://ocapp-dev.us-west-2.elasticbeanstalk.com/docs/brand/) which contains all routes & responses for the server.


## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo over at https://redux.productionready.io/

## Notes for editing CSS

Please make edits for the CSS in the .scss files. Running `npm run watch-css` will compile the .scss files to .css in styles/app.css

## Deployment
