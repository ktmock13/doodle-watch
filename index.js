const fetch = require('node-fetch');
const nodemailer = require("nodemailer");

let intervalID = 0;

let numberOfChecks = 0;

const checkSite = () => {
  fetch('https://gailsdoodles.com/current-litters')
    .then(res => res.text())
    .then(body => {
      // Load content of page to parser
      const hasBernaDoodle = body.includes('bernadoodle') || body.includes('Bernadoodle') || body.includes('Bernedoodle') || body.includes('bernedoodle');
      const hasOtis = body.includes('Otis');

      if (hasBernaDoodle && hasOtis || numberOfChecks ===4) {

        console.log('Turkey popped!')

        // in case of unexpected reboot, dont send the email again.
        // this will prevent the email being sent right after being booted up.
        if (true) {
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
          subject: `Hello From AWS`,
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
        }
        
      } else {
        numberOfChecks++;
        // still in the oven
        console.log(`still in the oven ${numberOfChecks}`)
      }
    });
  }

intervalID = setInterval(checkSite, 10000);

