const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json());
url="mongodb+srv://T400290497:23456789@cluster0.xnax9as.mongodb.net/student-api";
mongoose.connect(url)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("error in database conncetuvity",err));
const StudentSchema=new mongoose.Schema({
    name:String,
    marks:Number
})

const Student=mongoose.model('Studnet',StudentSchema);

app.get('/student',async(req,res)=>{
    const x=await Student.find();
    res.send(x);
});
app.post('/add-student',async(req,res)=>{
    const {name,marks}=req.body;
    const newx= Student({name,marks});
    await newx.save();
    res.send(newx,console.log("new studnet added sucsessfully"));
});
app.delete('/delete-student/:name',async(req,res)=>{
    const{name}=req.params;
    const x=await Student.findOneAndDelete({name});
    res.send(x,console.log("requested student deleted"));
});
app.put('/update/student',async(req,res)=>{
    const{name,marks}=req.body;
    const updatedx=await Student.findOneAndUpdate(
        {name},
        {$set:{marks}},
        {new:true}
    );
    res.send(updatedx,console.log("student updated succsellfully"));
});
app.listen(3000,console.log("app listining on 3000 port"));
