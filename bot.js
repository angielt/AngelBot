var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const auth = require('./auth.json');
const Discord = require('discord.js');
const data = require('./response.json');

const bot = new Discord.Client({disableEveryone: true})
const sql = require("sqlite");
sql.open("./score.sqlite");

var heart = 0;
var random = 2;
var insultGifs;
var complimentGifs;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online! `)
  bot.user.setActivity("with your sins");
})
bot.login(auth.token);
// query gifs
httpGetInsults("https://api.tenor.com/v1/search?q=sad+anime&media_filter=minimal",processInsults);
httpGetCompliments("https://api.tenor.com/v1/search?q=cute+anime&media_filter=minimal", processCompliments) ;

// message
bot.on('message', async message => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  if (cmd == `!heart`){ // for testing
    let emb = new Discord.RichEmbed()
    .setDescription(message.author.username + " !" )
    .setColor("#b8d8fcs")
    return message.channel.send(emb);
  }
  if (message.channel.type === "dm") return; // Ignore DM channels.
  // friend scores



  //angel responses to positivity and negativity
  for(i = 0 ; i < data.insults.length; i++){
   if(message.content.includes(data.insults[i])){
     let emb = new Discord.RichEmbed()
     .setDescription(data.insult_res[Math.floor((Math.random() * data.insult_res.length) )] )
     .setColor("#b8d8fcs")
     .setImage(insultGifs.results[Math.floor((Math.random() * insultGifs.results.length) )].media[0].tinygif.url);
     return message.channel.send(emb);
     heart = 0;
     break;
   }
   if(message.content.includes(data.compliments[i])){
     let emb = new Discord.RichEmbed()
     .setDescription(data.compliment_res[Math.floor((Math.random() * data.compliment_res.length) )] )
     .setColor("#f4e842")
     .setImage(complimentGifs.results[Math.floor((Math.random() * complimentGifs.results.length) )].media[0].tinygif.url);
     return message.channel.send(emb);
     heart = 0;
     break;
   }
 }

});

function httpGetInsults(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }
    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

function processInsults(responsetext)
{
    var response_objects = JSON.parse(responsetext);
    insultGifs = response_objects;
}

function httpGetCompliments(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }
    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

function processCompliments(responsetext)
{
    var response_objects = JSON.parse(responsetext);
    complimentGifs = response_objects;
}
