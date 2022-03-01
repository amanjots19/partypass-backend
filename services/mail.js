
const nodemailer = require("nodemailer");
const Mailer = require("../Objects/mail");
const { v5: uuidv5 } = require('uuid');
var request = require('request');
var nodeHtmlToImage = require('node-html-to-image')
const date = require('date-and-time');
var fs = require('fs');
const Student = require("../models/Students");
const now = new Date();

const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gtbitfreshers2022@gmail.com',
    pass: 'gtbitofficial'
  }
});
let services = {};
services.sendMail = function (Obj,filePath) {
  return new Promise(async (resolve, reject) => {
    try {
      let mail = await transporter.sendMail(
        {
          to: Obj.to,
          from: Obj.from,
          subject: Obj.subject,
          text: Obj.text,
          html: Obj.html,
          attachments: [
            {
                filename: 'pass.png',
                path: `${filePath}`, 
                cid: "pass.png"
            }
        ]
        },
        (err, info) => {
          if (err) {
            console.log(err);
            reject({ msg: err, code: "NOT SENT" });
          }
          
          resolve(info);
          // fs.unlinkSync(filePath);
        }
      );
    } catch (e) {
      console.log(e);
      reject({ msg: e, code: "NOT SENT" });
    }
  });
};

services.mappingPass = function (name, enrollNo, email, number) {
  return new Promise(async (resolve, reject) => {
    try {
      var passId = uuidv5(`${enrollNo}`, MY_NAMESPACE);
      console.log(passId)
      var filePath = await generatePass(name,passId,email)
     
      let from = 'amnsky19@gmail.com';
          to = `${email}`
          subject = 'Hurrayyyy!!!! Pass Successfully Booked';
          text = `Hurrayyyy!!!!`;
          html = `<div>
            <h4>
            Congratulations your entry for FIESTA 2022 has been confirmed now.
            You can find your pass attached to this email.  
            </h4>.

            <p>Use this email to verify your entry at the Venue.</p>
            </div>`;

      var Obj = new Mailer({ to: to, from: from, subject: subject, text: text, html: html });
      await services.sendMail(Obj,filePath);
      
      // saving student details
      var student = new Student({
        name: name,
        email: email,
        number: number,
        passId: passId,
        enrollmentNo: enrollNo
      })
      await student.save()
      
      
      resolve({message: "Email Sent"})
    } catch (error) {
      console.log(error);
      reject(error)
    }
  })
}

async function generatePass(name, passId, enrollNo) {
  try {

    await nodeHtmlToImage({
      output: `./assets/image${passId}.png`,
      html: `<html>
        <head>
      
        <style>
        .lotto-ticket{
          width: calc(100% - 34px);
          margin: 0px;
          padding:17px;
          background:whitesmoke;
        }
        .notification_ineer_chart{
            border-radius: 0px;
            padding: 15px 9px 15px 9px;
            background-color: white;
        }
        .schedule-first{
            display: flex;
            font-size: 20px;
            text-transform: capitalize;
            margin-bottom: 0px;
            margin-top: 12px;
        }
        b.schedule-first{
          justify-content: center;
        }
        b.schedule-first.binding_nubers {
          margin-top: 35px;
        }
        p.with_numbers {
          margin-bottom: 57px;
          color: gray;
        }
        h1.name-title{
            font-size: 22px;
            color: black;
            font-weight: 600;
            text-align:center;
            margin-bottom: 35px;
        }
        span.code-number {
            padding-left: 9px;
        }
        .bottom-last{
            padding-bottom: 10px;
            border-bottom: 2px currentcolor dashed;
        }
        .qr-code {
            margin-top:34px;
        }
        .qr-code ul{
            padding: 0;
            list-style-type: none;
            display: flex;
            justify-content: space-between;
            }
        .qr-code ul.last-list{
            justify-content: space-between;
            width: 41%;
            }
         li.qr-code-list , p.product-qty{
            font-size: 20px;
            text-transform: uppercase;
        }  
        p.product-qty {
            font-weight: 600;
            text-transform: capitalize;
            margin:0;
        }
        .amusement p{
            margin:3px;
            font-size: 20px;
            text-transform: capitalize;
        }
        img {
            width: 100%;
            height: 70px;
            object-fit: cover;
            padding-left: 12px;
        }
        
      </style>
        </head>
       <div class="lotto-ticket">
    <div class="notification_ineer_chart">
    <h1 class="name-title">FIESTA 2022</h1>
      <p class="schedule-first date_and_time">
        <span>Pass code:</span>
        <span class="code-number">${passId}</span>
      </p>
      <p class="schedule-first">
       <span>${date.format(now, 'YYYY/MM/DD HH:mm:ss')}</span>
     </p>
     <p class="schedule-first">
       <span class="bottom-last">POS ID:<span class="code-number">${name}</span></span>
     </p>
     <div class="qr-code">
     <ul>
     <li class="qr-code-list"><span>${enrollNo}</span></li>
     </ul>
     </div>
     </div>
   </div>
       </html>`,
       puppeteerArgs: { args: ["--no-sandbox"] }

    })

    var filePath = `./assets/image${passId}.png`;
    return filePath

  }
  catch (e) {
    console.log(e);
  }
}


module.exports = services;
