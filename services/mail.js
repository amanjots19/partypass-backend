
const nodemailer = require("nodemailer");
const Mailer = require("../Objects/mail");
const { v5: uuidv5 } = require('uuid');
var request = require('request');
var nodeHtmlToImage = require('node-html-to-image')
const date = require('date-and-time');
var fs = require('fs');
const Student = require("../models/Students");
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
          fs.unlinkSync(filePath);
        }
      );
    } catch (e) {
      console.log(e);
      reject({ msg: e, code: "NOT SENT" });
    }
  });
};

services.mappingPass = function (name, enrollNo, email, number,className) {
  return new Promise(async (resolve, reject) => {
    try {
      var nme = name.toLowerCase().split(' ')[0]

      var passId = `${nme}${enrollNo}${className}`
      console.log(passId)
      var filePath = await generatePass(name,passId,email)
     
      let from = 'amnsky19@gmail.com';
          to = `${email}`
          subject = 'Hurrayyyy!!!! Pass Successfully Booked';
          text = `Hurrayyyy!!!!`;
          html = `<div>
            <h4>
            🌈✨GTBIT FIESTA 2022✨🌈

            Waiting for you to witness the most entertaining freshers on March 11,2022. 
            Timings: 1pm to 5pm 🌟 

            We’ve attatched your entry pass and other details below⬇️ .
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
        enrollmentNo: enrollNo,
        class: className
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
    const image = fs.readFileSync('./public/image/passImg.jpeg');
    const base64Image = new Buffer.from(image).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image
    await nodeHtmlToImage({
      output: `./public/image/${passId}.png`,
      html: `<html lang="en">
      <head>
        <style>
          * {
            padding: 0;
            margin: 0;
            font-family: "Roboto", sans-serif;
          }
          
          body {
            box-sizing: border-box;
            width: 684px;
            height: fit-content;
          }
     
          .outer-box {
            display: flex;
            flex: 1;
            flex-direction: column;
            position: relative;
          }
     
          .pass-img {
            margin: 0;
          }
          
          .text-box {
            display: flex;
            justify-content: end;
            margin: 0;
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 16px 58px;
          }
          
          .pass-number {
            margin-right: 78px;
            color: white;
            font-size: 15px;
            font-weight: 600;
          }
          </style>
          </head>
          <body>
          <div class="outer-box">
          <img class="pass-img" src="{{imageSource}}" alt="passImg" />
          <div class="text-box">
          <p class="pass-number">Pass Number: ${passId}</p>
          </div>
          </div>
          </body>
          </html>`,
          content: { imageSource: dataURI },
          puppeteerArgs: { args: ["--no-sandbox"] }
          
        })
        
    var filePath = `./public/image/${passId}.png`;
    return filePath

  }
  catch (e) {
    console.log(e);
  }
}


module.exports = services;
