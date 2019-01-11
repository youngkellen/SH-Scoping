# SH Scoping

## Getting started


To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)  

## Requirements

- Node v8.0.0 or greater
- Google Cloud Platform

### Making requests to the backend API

Using Google API endpoints for backend. 

https://cloud.google.com/storage/docs/object-versioning?hl=ar
https://cloud.google.com/storage/docs/json_api/v1/

The scopes are contained in the GCP bucket `sh-scoping-scopes`. The project is `sh-scoping`.
Each top level object in the GCP bucket is a folder that contains two files, a csv and a json for the details of the scope.
Both the csv and json must be updated during any write, or else bugs will happen!!!
the json file must be named: `scope.json`

If versioning is not working, make sure versioning is enabled in google cloud. 
gsutil versioning set on gs://sh-scoping-scopes

Allow up to a minute for eventual write/read consistency with creating new versions of project.

Delete bucket content with versions in gcp terminal using: gsutil -m rm -rf gs://sh-scoping-scopes/
Make sure to reenable versioning after deleting

## Functionality overview

View site on `https://sh-scoping.appspot.com/`

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
