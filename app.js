// Task1: initiate app and run server at 3000
const express=require('express');
const app=express();
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

app.use(express.json());//to parse json
app.use(express.urlencoded({extended:true}));

const EmpData=require('./model/employee')
// Task2: create mongoDB connection 
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://Ayisha123:ayisha123@cluster0.puomspg.mongodb.net/CaseStudyDB?retryWrites=true&w=majority')
.then(()=>{
    console.log('Database connected successfully');
})
.catch(error=>{

console.log('Connection error'+error);
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',(req,res)=>{
    EmpData.find()
    .then((data)=>{
        
            res.send(data);
         
        })
    .catch(error=>{
        console.log(error)
    })
    
})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', (req, res)=> {
    const empId=req.params.id
    EmpData.findOne({"_id":empId} )
    .then((data)=>{
        res.send(data);
    })
    .catch(error=>{
        console.log(error)
    })
    
    });  
    



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async (req,res)=>{
    try {
        let item=req.body
        console.log(item)
        const emp=new EmpData(item)
        const savedEmployee=await emp.save()
        res.send(savedEmployee);
        
    } catch (error) {
        console.log(error)
        
    }
    
})


//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',(req,res)=>{
    let empid=req.params.id
    EmpData.findByIdAndRemove(empid).then((data)=>{
        res.send(data);
    })
    .catch(error=>{
        console.log(error)
    })  
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',(req,res)=>{
    let id=req.body._id
    EmpData.findByIdAndUpdate({"_id":id},req.body).then((data)=>{
        res.send(data);
    })
    .catch(error=>{
        console.log(error)
    }) 
    })  


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,()=>{
    console.log('server is connected at port 3000');
})



