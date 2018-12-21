# Flutterfly

This project was created for devPractice internship program. It uses Amadeus Self-Service API Air and Google Places API.

Live project: [flutterfly.tk](https://www.flutterfly.tk)

**Important:** test environment of Amadeus API returns inspirations only for relevant airports, so for testing purposes user coordinates will be overwrite by coordinates of Hamburg Airport (HAM). You can change the default behaviour by commenting out lines 63 and 64 in /server/controllers/flightController.js

## Development instructions
1. Clone this repo
2. Run `npm install`, cd into /server and run `npm install` once again
3. Open /src/environments/environment.ts and change GOOGLE_API_KEY value to your google API key
4. Open docker.compose.dev.yml and change AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET and GOOGLE_API_KEY to your keys
5. Make sure you have Docker and Docker Compose installed on your computer
6. Run `npm run dev`

**Important:** if you are getting erros run `npm run dev:down` to bring everything down and start over

## Production instructions
1. Clone this repo
2. Run `npm install`, cd into /server and run `npm install` once again
3. Open /src/environments/environment.prod.ts and change GOOGLE_API_KEY value to your google API key
4. Open docker.compose.prod.yml and change AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET and GOOGLE_API_KEY to your keys
5. Make sure you have docker installed and running on your computer
6. Run `npm run build --prod`
7. Run `npm run prod`

**Important:** if you are getting erros run `npm run prod:down` to bring everything down and start over
