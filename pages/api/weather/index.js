// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import geocode from "../../../utils/geocode";
import currentWeather from "../../../utils/weather";

export default function handler(req, res) {
  // res.status(200).json({ name: "John Doe" });
  if (!req.query.address) {
    res.status(400).json({ error: `You must provide an address.` });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          res.send({ error: `Enter a valid Address` });
        } else {
          currentWeather(latitude, longitude, (error, weatherData) => {
            if (error) {
              res.send(error);
            } else {
              res.send({
                temp: weatherData.temp,
                feelTemp: weatherData.feelTemp,
                description: weatherData.description,
                humidity: weatherData.humidity,
                windSpeed: weatherData.windSpeed,
                windDirection: weatherData.windDirection,
                location: location,
                address: req.query.address,
              });
            }
          });
        }
      }
    );
  }
}
