
const services = require("../services/mail");

let controller = {};


controller.sendInfo = async(req,res,next) => {
  try{
    const {name, enrollmentNo, email, contactNo} = req.body;
    let data = await services.mappingPass(name,enrollmentNo,email,contactNo)
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
