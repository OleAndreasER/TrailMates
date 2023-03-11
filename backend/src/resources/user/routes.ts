import { Express, Request, Response } from "express";
import { getUserData, putUserData } from "./firestore";
import { isValidUserType } from "./user";

export const startUserRoutes = (app: Express) => {
  app.get("/user/:userUid/", async (req: Request, res: Response) => {
    try {
      const userUid = req.params.userUid;
      const userDocument = await getUserData(userUid);
      res.json(userDocument.data());
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.put("/user/:userUid/", async (req: Request, res: Response) => {
    try {
      const userUid = req.params.userUid;
      if (isValidUserType(req.body.userType)) {
        console.log("Adding user data");
        putUserData({
          userUid: userUid,
          ...req.body,
        });
        res.json({ message: "OK" });
      } else {
        console.log("Rejecting because invalid userType: " + req.body.userType);
        res.status(500).send("Invalid userType.");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
};
