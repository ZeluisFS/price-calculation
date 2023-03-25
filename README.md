# price-calculation

## Instructions

Using the command line, clone the project (make sure you have git installed): `git clone https://github.com/ZeluisFS/price-calculation.git`

### Backend

First we need to run the backend in order for the project to run:

1. Now go to the root project folder: `cd price-calculation/`
2. Now go the backend project folder: `cd PriceCalculationBackend/` `cd PriceCalculation`
3. Run the backend project (make sure you have -net 6 installed): `dotnet run`

### Frontend

Open another terminal on the project folder (price-calculation) as you did on the first step of the backend:

1. Now go to the frontend folder: `cd frontend/`
2. Now run npm install (Make sure you have node js installed): `npm i`
3. Now run the frontend: `npm run start`
4. Open a browser tab on: `http://localhost:4200`


### Additional Notes

You will see the application is covered by unit tests, not only on the frontend, but also on the backend

I have also tried to show what kind of architecture I like to have on my projects (frontend and backend)

On the frontend a well organized folder structure, organized by the application modules that are lazy loaded

On the backend a CQRS with Mediatr pattern in this case with only projects (Controller, Business, Unit tests)