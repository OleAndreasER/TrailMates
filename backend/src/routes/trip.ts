import { Express, Request, Response } from "express";
import { getTripById, postTrip, putTrip, getTrips } from "../db/trip";

export const startTripRoutes = (app: Express) => {
  app.get("/trips/:tripId/", (req: Request, res: Response) => {
    const tripId = req.params.tripId;
    getTripById(tripId)
      .then((trip) => {
        res.json(trip);
      })
      .catch((error) => {
        res.status(500).send("Error");
      });
  });

  app.get("/trips/", (req: Request, res: Response) => {
    getTrips()
      .then((trips) => {
        res.json(trips);
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  });

  app.put("/trips/", (req: Request, res: Response) => {
    putTrip(req.body)
      .then(() => {
        res.status(200).send("OK");
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  });

  app.post("/trips/", (req: Request, res: Response) => {
    postTrip(req.body)
      .then(() => {
        res.status(200).send("OK");
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  });
};
