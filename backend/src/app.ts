import express = require("express");
import { startUserRoutes } from "./routes/user";
import { startTripRoutes } from "./routes/trip";

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

startUserRoutes(app);
startTripRoutes(app);

app.listen(3001, () => {
  console.log("Listening on port 3001.");
});
