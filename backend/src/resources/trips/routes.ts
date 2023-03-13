import { Express, Request, Response } from "express";
import { startFavoritesRoutes } from "./favorites/routes";
import { Trip } from "./trip";
import {
  getTripById,
  postTrip,
  putTrip,
  getTrips,
  getTopRatedTrips,
  getLatestTrips,
} from "./firestore";

export const startTripRoutes = (app: Express) => {
  //"trips/favorites/"
  startFavoritesRoutes(app);

  app.get("/trips/highestRated", async (req: Request, res: Response) => {
    try {
      const topTrips: Trip[] = await getTopRatedTrips();
      res.json(topTrips);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.get("/trips/latest", async (req: Request, res: Response) => {
    try {
      const latestTrips: Trip[] = await getLatestTrips();
      res.json(latestTrips);
    } catch (error) {
      res.status(404).send(error);
    }
  });
  app.get("/trips/:tripId/", async (req: Request, res: Response) => {
    try {
      const tripId = req.params.tripId;
      const trip: Trip = await getTripById(tripId);
      res.json(trip);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.get("/trips/", async (req: Request, res: Response) => {
    try {
      const trips: Trip[] = await getTrips();
      res.json(trips);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.put("/trips/:tripId/", async (req: Request, res: Response) => {
    try {
      const tripId = req.params.tripId;
      await putTrip(tripId, req.body);
      res.json({ message: "OK" });
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.post("/trips/", async (req: Request, res: Response) => {
    try {
      const trip: Trip = await postTrip(req.body);
      res.json(trip);
    } catch (error) {
      res.status(404).send(error);
    }
  });
};
