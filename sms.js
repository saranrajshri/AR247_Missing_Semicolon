const client = require("twilio")(
  "AC987642e062b8abd817200b4f5021148c",
  "749e71e33617dccde9cb37688e3ac9ea"
);

client.messages
  .create({
    from: "+12029335106",
    to: "+919500149967",
    body: "You just sent an SMS from Node.js using Twilio!"
  })
  .then(messsage => console.log(message.sid));
