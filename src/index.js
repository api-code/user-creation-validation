const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const mongoose = require("mongoose");

app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

// app.listen(PORT, () => {
//   console.log(`server started on port ${PORT}`);
// });

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.fbtamn2.mongodb.net/")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
