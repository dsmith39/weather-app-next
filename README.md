# Weather Api Application
[See A Demo](http://ec2-18-206-253-28.compute-1.amazonaws.com/)
## Objective
To use a weather information API to create a browser application
## Tech Stack
- Node.js
- Next.js
- Mapbox API
- Weatherstack API
## Description
This is an application that provides the user with weather information. The user can input a city, zip code, or even longitude and latitude, and will be shown weather information for that location. I originally built the backend with Express.js and Node.js. I rebuilt the site to be served with Next.js. I used the Mapbox API to translate the location information that the user inputs into the longitude and latitude that the WeatherStack API needs to function properly. I originally used an html templating system called Handlebars in order to provide the user with a GUI view in the browser. Now, after rebuilding the page, Next.js handles all views and routing. I decided to change to Next.js because I started using it for my portfolio site, and I really like the way it works.
## Future Considerations
In the future, I would like to allow a user to save their location information as a default, and other location if they want to save those. I would also like to improve the styling of the application, as it kinda plain, in my opinion. It would be pretty cool to be able to pay for a subscription to the WeatherStack API, and then be able to provide the user with more detailed weather information and serve over HTTPS for better deployment options.
