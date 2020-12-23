const fetch = require('node-fetch');
const nodemailer = require("nodemailer");

let intervalID = 0;


const checkSite = () => {
  fetch('https://gailsdoodles.com/current-litters')
    .then(res => res.text())
    .then(body => {
      // Load content of page to parser
      const hasBernaDoodle = body.includes('bernadoodle') || body.includes('Bernadoodle') || body.includes('Bernedoodle') || body.includes('bernedoodle');
      const hasOtis = body.includes('Otis');

      if (hasBernaDoodle && hasOtis) {
        // Email peopple

        // create mail transporter
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "DustinAndMeguire@gmail.com",
            pass: "bernadoodle"
          }
        });

        let mailOptions = {
          from: "dustinandmeguire@gmail.com",
          to: "ktmock13@gmail.com",
          bcc:"ktmock13@gmail.com,meguire.broersma@gmail.com,dcbrout@gmail.com",
          subject: `Test - Pls ignore`,
          text: `Hello Gail’s Doodles!

We would like to take home one of new puppies in the newly posted Bernedoodle litter! We are very excited and hope mama and puppies are doing well!
Please let us know if we responded in time and what the next steps are. We can send the deposit ASAP.
                    
Many thanks,
Meguire & Dustin`
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            throw error;
          } else {
            console.log("Email successfully sent!");
          }
        });
        clearInterval(intervalID);
      } else {
        // still in the oven
        console.log('still in the oven')
      }
    });
  }

intervalID = setInterval(checkSite, 10000);

