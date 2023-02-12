const express = require("express");
const CORS = require("cors");
const connect = require("./db/db");
const PORT = process.env.PORT || 8080;
const adminRouter = require("./routes/admin.routes");
const homeRouter = require("./routes/home.rooutes");
const contactRouter = require("./routes/contact.routes");
const app = express();

app.use(express.json());
app.use(CORS());

app.use("/admin", adminRouter);
app.use("/home", homeRouter);
app.use("/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("welcome to studetn portal site");
});

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`server started at ${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
});
