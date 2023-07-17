import express from "express";
import asyncHandler from "express-async-handler";
import Contact from "../Models/contactModel.js";
const contactRoute = express.Router();
contactRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const newques=new Contact(req.body);
    try{
        const savedreq= await newques.save()
        res.status(200).json(savedreq);
    }
    catch(err)
    {
        next(err);
    }
  })
);
contactRoute.get(
  "/",
  // protect,
  // admin,
  asyncHandler(async (req, res) => {
    const get = await Contact.find({});
      // .sort({ _id: -1 })
      // .populate("user", "id name email");
    res.json(get);
  })
);
contactRoute.delete("/:id",
asyncHandler(async(req,res)=>{
  try{
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json("deleted the contact");
    }
    catch(err)
    {
        res.status(404).json(err)
    }
}));
export default contactRoute;