import { Express, Request, Response } from "express";
import { getUserData, putUserData } from "../db/user";
import { isValidUserType } from "../model/UserData";

export const startUserRoutes = (app: Express) => {
  app.get("/user/:userUid/", (req: Request, res: Response) => {
    const userUid = req.params.userUid;
    getUserData(userUid)
      .then((user) => {
        res.json(user.data());
      })
      .catch((error) => {
        res.status(500).send("Error");
      });
  });

  app.put("/user/:userUid/", (req: Request, res: Response) => {
    const userUid = req.params.userUid;
    if (isValidUserType(req.body.userType)) {
      console.log("Adding user data");
      putUserData({
        userUid: userUid,
        ...req.body,
      });
      res.send("OK!");
    } else {
      console.log("Rejecting because invalid userType: " + req.body.userType);
      res.status(500).send("Invalid userType.");
    }
  });
};
