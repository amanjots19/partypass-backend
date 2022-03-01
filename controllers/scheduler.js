
const services = require("../services/mail");

let controller = {};


controller.sendInfo = async(req,res,next) => {
  try{
    const {name, enrollmentNo, email, contactNo,className} = req.body;
    let data = await services.mappingPass(name,enrollmentNo,email,contactNo, className);
    console.log(data)
    res.json({
      success : true,
      res:data
    })
  }catch(e){
    console.log(e)
  }
}


module.exports = controller;
