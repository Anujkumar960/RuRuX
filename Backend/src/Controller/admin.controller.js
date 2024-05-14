
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/user.schema");
const { StreamModel } = require("../Model/stream.model");
const { SubjectModel } = require("../Model/subject.schema ");

//for getting All Students 
const getStudents=async(req,res)=>{
    try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { sort, search } = req.query;
    const query = {};

      // Added search functionality for searching Student By name and email
      if (search) {
        query.$or = [
          { username: { $regex: search, $options: "i" } }, // Case-insensitive search by product name
          { email: { $regex: search, $options: "i" } }, // Case-insensitive search by product description
          { stream: { $regex: search, $options: "i" } }, // Case-insensitive search by product description}
        ];
      }

      const totalCount = await UserModel.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limit);

      // Adding sorting Based On the username
      const sortCriteria = {};
      if (sort === "desc") {
        sortCriteria.username = -1;
      }else if (sort === 'asc') {
        sortCriteria.username = 1;
      }
     
      //for skipping data on the basis of pages
      const skip = (page - 1) * limit;
      
      // Query products with filtering, searching, sorting, and pagination
      const users = await UserModel.find(query).skip(skip).sort(sortCriteria).limit(limit);
 
      res.status(200).json({users,totalPages});
    }catch(err){
        console.error("Error While filtering, searching, and paginating users:",err );      
        res.status(500).json({ error: "Internal Server Error , Failed To get User's Details" });
    }
}

//for getting Particular User Based On userID
const singleStudent=async(req,res)=>{
    const { id } = req.params;
    try{
    const userData= await UserModel.find({userID:id});
    if(!userData){
        return res.status(404).json({error:true,message:"User  Not Found"});
    }
    res.status(200).json({error:false,item:userData})
    }catch(error){
        console.log(error);
        res.status(404).json({error:true,message:error});
    }
}


//For Updating the User
const updateStudent=async(req,res)=>{
    const { id } = req.params;
    try{
    const userData= await UserModel.find({userID:id});
    if(!userData){
        return res.status(404).json({error:true,msg:"User  Not Found So We Can't Update it"});
    }
    await UserModel.findOneAndUpdate({userID:id},req.body);
    return res.status(200).json({ error: false});
    }catch(error){
    console.log(error);
    res.status(400).json({ error: true, msg:"user Not updated" });
    }
}


//for Deleting the User
const deleteStudent=async(req,res)=>{
    const { id } = req.params;
    try{
    const userData= await UserModel.find({userID:id});
    if(!userData){
        return res.status(404).json({error:true,msg:"User  Not Found So We Can't Update it"});
    }
    await UserModel.findOneAndDelete({userID:id});
    return res.status(200).json({ error: false,msg:"user Deleted Successfully"});
    }catch(error){
    console.log(error);
    res.status(400).json({ error: true, msg:"user Not Deleted" });
    }
}


//For Adding Students in db by admin
const AddStudents = async (req, res) => {
  const {username,email,role,password,stream} = req.body;
  try {
    // Checking if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(401).json({ msg: "User is already registered. Please try to login." });
    }
    const users=await UserModel.find();
        let id=1;
        if(users&&users.length>0){
          users.sort((a, b) => a.userID - b.userID)
             id=users[users.length-1].userID;
             id=id+1;
        }
    const userID=id;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserFields = {userID,username,email,role,password: hashedPassword,stream};
    if(role) {
      newUserFields.role = role;
    }
    const newUser = new UserModel(newUserFields);
    // Saving the new user
    await newUser.save();
    return res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      msg: "Failed to register user. Please provide correct details.",
    });
  }
};



// Streams controllers
const addStream = async (req, res) => {
    try {
        const { name } = req.body;
        const streams=await StreamModel.find();
        let id=1;
        if(streams&&streams.length>0){
          streams.sort((a, b) => a.streamId - b.streamId)
             id=streams[streams.length-1].streamId;
             id=id+1;
        }
        const streamId=id;
        const stream = new StreamModel({streamId, name });
        await stream.save();
        res.status(201).json({ message: "Stream added successfully", stream });
    } catch (error) {
        console.error("Error adding stream:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateStream = async (req, res) => {
  try {
      const { id } = req.params;
      const { name } = req.body;
      await StreamModel.findOneAndUpdate({ streamId: id }, { name });
      res.status(200).json({ message: "Stream updated successfully" });
  } catch (error) {
      console.error("Error updating stream:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};


const deleteStream = async (req, res) => {
    try {
        const { id } = req.params;
        await StreamModel.findOneAndDelete({streamId:id});
        res.status(200).json({ message: "Stream deleted successfully" });
    } catch (error) {
        console.error("Error deleting stream:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Subjects controllers
const addSubject = async (req, res) => {
    try {
        const { name, streamId } = req.body;
        const subjects=await SubjectModel.find();
        let id=1;
        if(subjects&&subjects.length>0){
          subjects.sort((a, b) => a.subjectId - b.subjectId)
             id=subjects[subjects.length-1].subjectId;
             id=id+1;
        }
    const subjectId=id;
        const subject = new SubjectModel({subjectId, name, streamId });
        await subject.save();
        res.status(201).json({ message: "Subject added successfully", subject });
    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        await SubjectModel.findOneAndUpdate({subjectId:id}, req.body);
        res.status(200).json({ message: "Subject updated successfully" });
    } catch (error) {
        console.error("Error updating subject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        await SubjectModel.findOneAndDelete({subjectId:id});
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        console.error("Error deleting subject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




// Marks controllers
const addMarks = async (req, res) => {
    try {
        const { studentName, streamId, subjectId, mark } = req.body;
        const marksData=await MarksModel.find();
        let id=1;
        if(marksData&&marksData.length>0){
          marksData.sort((a, b) => a.id - b.id)
             id=marksData[marksData.length-1].id;
             id=id+1;
        }
        const marks = new MarksModel({ studentName, streamId, subjectId, mark });
        await marks.save();
        res.status(201).json({ message: "Marks added successfully", marks });
    } catch (error) {
        console.error("Error adding marks:", error);
        res.status(500).json({ message: "Internal server error"});
    }
};

const updateMarks = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentName, streamId, subjectId, marks } = req.body;
        await MarksModel.findByIdAndUpdate(id, { studentName, streamId, subjectId, marks });
        res.status(200).json({ message: "Marks updated successfully" });
    } catch (error) {
        console.error("Error updating marks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteMarks = async (req, res) => {
    try {
        const { id } = req.params;
        await MarksModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Marks deleted successfully" });
    } catch (error) {
        console.error("Error deleting marks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { AddStudents,getStudents,singleStudent,updateStudent,deleteStudent,AddStudents,addStream, updateStream, deleteStream,addSubject, updateSubject, deleteSubject,addMarks, updateMarks, deleteMarks};

