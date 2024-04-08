require("dotenv").config();
require("express-async-errors");
import express from "express";

import { sequelize } from './models/index.ts'
import userRouter from "./routes/user.ts";
import NotFoundMiddleware from "./middlewares/notFound.ts";
import errorMiddleware from "./middlewares/error.ts";
import adminRouter from "./routes/admin.ts";
import superAdminRouter from "./routes/superAdmin.ts";
import companyRouter from "./routes/company.ts";
import busRouter from "./routes/bus.ts";
import tripRouter from "./routes/trip.ts";
import tripDayRouter from "./routes/tripDay.ts";
import userTripsRouter from "./routes/userTrips.ts";
import swaggerUi from 'swagger-ui-express'
import docs from './docs/docs.ts'

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs))

app.use('/users', userRouter)
app.use('/admins', adminRouter)
app.use('/superAdmins', superAdminRouter)
app.use('/companies', companyRouter)
app.use('/buses', busRouter)
app.use('/trips', tripRouter)
app.use('/tripDays', tripDayRouter)
app.use('/userTrips', userTripsRouter)
app.use(NotFoundMiddleware)
app.use(errorMiddleware)

async function start() {
  await sequelize.authenticate()
  await sequelize.sync()
  app.listen(process.env.SERVER_PORT, () => console.log("server is now listening..."))
}

start();