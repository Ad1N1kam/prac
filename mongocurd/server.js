const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')

const app=express()
app.use(bodyParser.json());

const MONGO_URL = "mongodb+srv://username:password@cluster0.xnax9as.mongodb.net/database_name";

mongoose.connect(MONGO_URL)
    .then(() => console.log(" MongoDB Connected"))
    .catch((err) => console.log(" MongoDB Connection Error:", err));


const StudentSchema=new mongoose.Schema({
    name:String,
    marks:Number
})

const Student=mongoose.model('Student',StudentSchema);

app.get('/student',async(req,res)=>{
    
    const stud=await Student.find();
    res.send(stud);
    
});


app.post('/add-student',async(req,res)=>{
        const{name,marks}=req.body;
        const newStudent=new Student({name,marks});
        await newStudent.save();
        console.log(req.body);
        



})
app.delete('/del-student/:name',async(req,res)=>{
    const {name}=req.params;
    const student=await Student.findOneAndDelete({name});


})

app.put("/update", async (req, res) => {
    const { name, marks } = req.body;
    const updated = await Student.findOneAndUpdate(
      { name },
      { $set: { marks } },
      { new: true }
    );
    res.send(updated);
  });


    app.listen(3000, () => console.log(" Server running on port 3000"));
