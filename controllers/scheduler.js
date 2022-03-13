
const services = require("../services/mail");

let controller = {};


controller.sendInfo = async(req,res,next) => {
  try{
    const {email} = req.body;
    let data = await services.mappingPass(email);
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
