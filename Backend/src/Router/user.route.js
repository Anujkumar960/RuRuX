const express = require("express");
const { getPerformance } = require("../Controller/performance.controller");

const performanceRouter=express.Router();

performanceRouter.get("/student/:id",getPerformance)

module.exports={performanceRouter}