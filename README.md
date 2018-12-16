# Flutterfly

This project was created for devPractice internship program. It uses Amadeus Self-Service API Air and Google Places API.

## Development instructions
1. Clone this repo
2. Run `npm install`
3. Open src/environments/environment.ts and change GOOGLE_API_KEY value to your google API key
4. Open docker.compose.dev.yml and change AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to your keys
5. Make sure you have docker installed and running on your computer
6. Run `npm run dev`

**Important:** if you are getting erros run `npm run dev:down` to bring everything down and start over

## Production instructions
1. Clone this repo
2. Run `npm install`
3. Open src/environments/environment.ts and change GOOGLE_API_KEY value to your google API key
4. Open docker.compose.prod.yml and change AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to your keys
5. Make sure you have docker installed and running on your computer
6. Run `npm run prod`

**Important:** if you are getting erros run `npm run prod:down` to bring everything down and start over
