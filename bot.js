var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var data = require('./response.json');
//var random = Math.floor((Math.random() * 10000) + 1000);;
var random = 2;
var heart = 0;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
colorize: true});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
token: auth.token,
autorun: true
});

bot.on('ready', function (evt) {
logger.info('Connected');
logger.info('Logged in as: ');
logger.info(bot.username + ' – (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
  for(i = 0 ; i < data.insults.length; i++){
    if(message.includes(data.insults[i])){
      bot.sendMessage({
        to: channelID,
        message: data.insult_res[Math.floor((Math.random() * data.insult_res.length) )]
      });
      heart = 0;
      break;
    }
  }
  if (heart==random){
    //random = Math.floor((Math.random() * 10000) + 1000);
    temp = Math.floor((Math.random() * data.compliment_res.length) );
    heart = 0;
    bot.sendMessage({
      to: channelID,
      message: data.compliment_res[temp]
    });
  }
  else{
    heart++;
  }
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch(cmd) {
      case 'intro':
      bot.sendMessage({
        to: channelID,
        message: 'Greetings! Welcome to the server!'
      });
      break;
    }
  }
});
