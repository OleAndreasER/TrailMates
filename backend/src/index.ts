import express = require("express");
import { startUserRoutes } from "./routes/user";
//import handleSubmit from './handles/handlesubmit';

//handleSubmit("Tester kobling")
//Tester kobling til Firebase. Skal komme opp under FireStore Database

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

startUserRoutes(app);

app.listen(3001, () => {
  console.log("Listening on port 3001.");
});
