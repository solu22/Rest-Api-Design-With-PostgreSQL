require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dogsRouter = require('./routes/routes')

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, res)=>{
  res.send('This is for dog front index page')
})

app.use("/dogs", dogsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
