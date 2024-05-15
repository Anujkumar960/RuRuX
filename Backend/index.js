const express = require("express");
const cors = require("cors");
const { ConnectToDb } = require("./src/Config/config");
const { authRouter } = require("./src/Router/authorization.router");
const { adminRouter } = require("./src/Router/admin.Router");
const { performanceRouter } = require("./src/Router/user.route");


const PORT = process.env.PORT || 4500;

const app = express();
app.use(cors());
app.use(express.json());


app.use("/", authRouter);
app.use("/admin", adminRouter);
app.use("/",performanceRouter);

app.get("/", async (req, res) => {
  res.send("let it go");
});


app.listen(PORT, async () => {
  await ConnectToDb();
  console.log(`Your server is running on http://localhost:${PORT}`);
});