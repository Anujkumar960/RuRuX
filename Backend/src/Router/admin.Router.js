const express = require("express");


const {
  AddStudents,
  getStudents,
  singleStudent,
  updateStudent,
  deleteStudent,
  addStream,
  updateStream,
  deleteStream,
  addSubject,
  updateSubject,
  deleteSubject,
  addMarks,
  updateMarks,
  deleteMarks,
  getStream,
  getSubject,
  getMarks,
} = require("../Controller/admin.controller");
const { auth } = require("../middleware/auth.middleare");
const { access } = require("../middleware/rolebased.middleware");


const adminRouter = express.Router();


// Students routes
adminRouter.post("/students", auth, access("admin"), AddStudents);
adminRouter.get("/students", auth, access("admin"), getStudents);
adminRouter.get("/students/:id", auth, access("admin"), singleStudent);
adminRouter.patch("/students/:id", auth, access("admin"), updateStudent);
adminRouter.delete("/students/:id", auth, access("admin"), deleteStudent);


// Streams routes
adminRouter.get("/streams", auth, access("admin"), getStream);
adminRouter.post("/streams", auth, access("admin"), addStream);
adminRouter.patch("/streams/:id", auth, access("admin"), updateStream);
adminRouter.delete("/streams/:id", auth, access("admin"), deleteStream);


// Subjects routes
adminRouter.get("/subjects", auth, access("admin"), getSubject);
adminRouter.post("/subjects", auth, access("admin"), addSubject);
adminRouter.patch("/subjects/:id", auth, access("admin"), updateSubject);
adminRouter.delete("/subjects/:id", auth, access("admin"), deleteSubject);


// Marks routes
adminRouter.get("/marks", auth, access("admin"), getMarks);
adminRouter.post("/marks", auth, access("admin"), addMarks);
adminRouter.put("/marks/:id", auth, access("admin"), updateMarks);
adminRouter.delete("/marks/:id", auth, access("admin"), deleteMarks);


module.exports = { adminRouter };



