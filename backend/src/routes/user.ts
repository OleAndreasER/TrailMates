import { Express, Request, Response } from "express";
import { getUserData, putUserData } from "../db/user";

export const startUserRoutes = (app: Express) => {
  app.get("/user/:userUid/", (req: Request, res: Response) => {
    const userUid = req.params.userUid;
    getUserData(userUid)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        res.status(500).send("Error");
      });
  });

  app.put("/user/:userUid/", (req: Request, res: Response) => {
    const userUid = req.params.userUid;
    putUserData({
      userUid: userUid,
      name: req.body.name,
      type: req.body.type,
    });
    res.send("OK!");
  });
};
