const express = require('express');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const fs = require('fs-extra');
var cors = require('cors')
const swaggerDocument = require('./swagger.json');
const app = express()
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))


const accessRoute = require("./route/accessRoute");
const adminRoute = require("./route/adminRoute");
const adminTypeRoute = require("./route/adminTypeRoute");
const loginRoute = require("./route/loginRoute");
const otpRoute = require("./route/otpRoute");
const priceManagementRoute = require("./route/priceManagementRoute");
const regionRoute = require("./route/regionManagementRoute");
const userRoute = require("./route/userRoute");
const walletRoute = require("./route/walletRoute");


const port = process.env.PORT;
const environment = process.env.environment;

const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
// let express to use this
console.log("environment",environment);
if(environment != 'production'){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/access",accessRoute);
app.use("/admin",adminRoute);
app.use("/adminType",adminTypeRoute);
app.use("/otp",otpRoute);
app.use("/priceManagement",priceManagementRoute);
app.use("/region",regionRoute);
app.use("/user",userRoute);
app.use("/wallet",walletRoute);
app.use("/login",loginRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})