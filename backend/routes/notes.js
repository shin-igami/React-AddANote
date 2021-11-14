const express = require('express');
const router = express.Router();
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/Users');

//Route 1  get all the notes of a user  LOGIN required
router.get('/fetchnotes',fetchuser,async (req,res)=>{
   try {
    const note = await Note.find({user:req.user.id})
    res.json({Note:note})
   } catch (error) {
    console.log(error.message)
    res.status(500).json("Internal server Error")
   }
})

//Route 2 create a note    Login Required

router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
  ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,description,tags} = req.body;
    try {
        const note = new Note({title,description,tags,user:req.user.id})
        await note.save();
        res.json(note)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal server Error")
    }
})

//Route 3 Updating a route  Login required
router.put("/updatenote/:id",fetchuser,async (req,res)=>{
    const {title,description,tags} = req.body;
    const newNote = {}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tags){newNote.tags=tags}

    try {
    const note = await Note.findById(req.params.id)
    if(!note){return res.status(401).res("Not Found")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).res("Forbidden")
    } 
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true})
    res.json(updatedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal server Error")
    }

})

//Route 4 to delete a note   Login Required


router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
    try {
    const note = await Note.findById(req.params.id)
    if(!note){return res.status(401).res("Not Found")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).res("Forbidden")
    } 
    const updatedNote = await Note.findByIdAndDelete(req.params.id)
    res.send("Success")
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal server Error")
    }

})



module.exports = router;