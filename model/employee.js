const mongoose=require('mongoose')
const schema=mongoose.Schema;

const employeeData=new schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})

const empData=mongoose.model('employee',employeeData)
module.exports=empData;