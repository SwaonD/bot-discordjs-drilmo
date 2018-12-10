const Eris = require('eris')
const text = require('./text.json')
var bot = new Eris(process.env.BOT_TOKEN);

bot.on('voiceStateUpdate', async (member,oldState) => { // create the channel
    const leChannel = member.guild.channels.get(member.voiceState.channelID)
    if (leChannel !== undefined) {
        if (leChannel.id === text.channels.creationChannel.id) {
            if (leChannel.parentID === text.category.creationCategory.id) {
                try { 
                    creerLeChannelNumber = text.channels.createdChannel.number.shift()
                    if (creerLeChannelNumber !== undefined) {
                        creerLeChannel = await member.guild.createChannel(text.channels.createdChannel.name + creerLeChannelNumber, 'voice', null, text.category.creationCategory.id)   
                        member.edit({channelID: creerLeChannel.id})
                    }
                } catch (e) {
                    console.error(e);
                } 
            }       
        }
    }
});
bot.connect();
