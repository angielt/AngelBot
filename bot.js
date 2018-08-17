var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const auth = require('./auth.json');
const Discord = require('discord.js');
const data = require('./response.json');

const bot = new Discord.Client({disableEveryone: true})
var heart = 0;
var random = 2;
var gifs;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online! `)
  bot.user.setActivity("with the Devil's heart");
})
bot.login(auth.token);

httpGetAsync("https://api.tenor.com/v1/search?q=pout+anime&media_filter=minimal",tenorCallback_searchSuggestion);

bot.on('message', async message => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  if(cmd == `!msg`){ // testing
    let emb = new Discord.RichEmbed()
    .setDescription("PLZ WORK OMG")
    .setColor("#b8d8fcs");
    return message.channel.send(emb);
  }
  else if (cmd == `!heart`){ // testing
    let emb = new Discord.RichEmbed()
    .setDescription(message.author.username + " !" )
    .setColor("#b8d8fcs")
    .setImage(gifs[Math.floor((Math.random() * gifs.length) )].media[0].tinygif.url);
    return message.channel.send(emb);
  }
  for(i = 0 ; i < data.insults.length; i++){
   if(message.content.includes(data.insults[i])){
     let emb = new Discord.RichEmbed()
     .setDescription(data.insult_res[Math.floor((Math.random() * data.insult_res.length) )] )
     .setColor("#b8d8fcs")
     .setImage("https://media.tenor.com/images/46c9b8da42a62778fb37f89513c8af0e/tenor.gif");
     return message.channel.send(emb);
     heart = 0;
     break;
   }
 }

});

function httpGetAsync(theUrl, callback)
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

function tenorCallback_searchSuggestion(responsetext)
{
    var response_objects = JSON.parse(responsetext);
    gifs = response_objects['results'];
    console.log(gifs[0].media[0].tinygif.url);

}
