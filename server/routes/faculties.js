// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const faculties = require("../models/faculties");

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
  let faculties = faculty({
});
res.render('faculties/details)', {title: 'Add a new faculty', faculties:faculties})

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/add", (req, res, next) => {
  //creating an object
  let new_faculty=faculty({   
    "Id": req.body.id,
    "Name": req.body.name,
    "Department": req.body.department,
    "Subject": req.body.subject
  /*****************
   * ADD CODE HERE *
   *****************/
});
// passing the object to create method 
faculty.create(new_faculty,(err,new_faculty)=>{
  if(err){
    console.log(err);
    res.render(err);
  }
  else{
    //Rediecting back to the FacultyList Page
    res.redirect('/faculties')
  }
});
});
});
// GET the faculty  Details page in order to edit an existing faculty
router.get("/:id", (req, res, next) => {
  let id=req.params.id;
  // finding the faculty to edit using object id
  faculty.findById(id,(err,faculty_to_edit)=>{
    if(err){
      console.log(err);
      res.end(err);
  }
  else{
    res.render('faculties/details', {id:'faculty-edit', faculties: faculty_to_edit});
  }
})
  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  let id=req.params.id;
  let faculty_edited=faculty({
    _id:id,
    "Id": req.body.id,
    "Name": req.body.name,
    "Department": req.body.department,
    "Subject": req.body.subject
  })
  // editing the faculty using the updateOne function
faculty.updateOne({_id:id}, faculty_edited,(err)=>{
  if(err){
    console.log(err);
    req.end(err);
  }else{
    res.redirect('/faculties');
  }
});

  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET - process the delete
router.get("/delete", (req, res, next) => {
  let id = req.params.id;
  //deleting a faculty using remove function 
  faculty.remove({_id:id},(err) =>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      //redirecting back to FacultyList Page after deletion
      res.redirect('/faculties');
    }
  })
  /*****************
   * ADD CODE HERE *
   *****************/
});

module.exports = router;
