const express = require("express");
const route = express.Router();

const controller = require("../controller/controller");

const resourseAllocation = require("../controller/resourseAllocation");

const verify = require("../controller/verifytoken");

const workforceController = require("../controller/workforceAllocation");

const labController = require("../controller/labAllocation");

const publicController = require("../controller/publicController");
const medicineAllocation = require("../controller/medicineAllocation");

route.post("/login", controller.login);

route.post("/add/user", controller.addUser);

route.post("/add/admin", controller.addAdmin);

route.post("/hostpitalAllocation", resourseAllocation.hostpitalAllocation);

// hospital related routes
route.post("/add/hospital", workforceController.createHosptal);

route.get("/get/hospitals", workforceController.getHospitals);

route.patch("/update/hospitals", workforceController.updateHospitals);

route.post("/get/nearHospitals", publicController.nearHospitals);


// lab related routes
route.post("/add/lab", labController.createLab);

route.put("/update/lab/:id", labController.updateLab);

route.get("/get/labs", labController.getAllLabs);

route.post("/labsAllocation", labController.labsAllocation);

// Medical related routes
route.post("/add/medical", medicineAllocation.addMedical);

route.post("/medicineAllocation", medicineAllocation.medicineAllocation);

module.exports = route;
