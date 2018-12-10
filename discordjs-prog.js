const Discord = require('discord.js');
const client = new Discord.Client();
const text = require('./text.json')
const prefix = "!"
require('./erisjs-prog.js')

client.on('voiceStateUpdate', async (oldMember,newMember) => {   
    const leChannelSortie = oldMember.voiceChannel
    if (leChannelSortie !== undefined) { //delete the channel
        try {
            if (leChannelSortie.parent.id === text.category.creationCategory.id) {
                if (leChannelSortie.id !== text.channels.creationChannel.id) {
                    if (oldMember.voiceChannel.members.size === 0) {
                        listLeChannelSortie = Array.from(leChannelSortie.name)
                        text.channels.createdChannel.number.push(listLeChannelSortie[listLeChannelSortie.length-1])
                        text.channels.createdChannel.number.sort()
                        leChannelSortie.delete()
                    }
                }
            }
        }
        catch(e) {}
    }
})
client.on('message', async (message) => {
    if (message.author.bot) return
    
    function renameChannel() {
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        if (args.length > 0 ) {
            listNomDuChannel = Array.from(message.member.voiceChannel.name)
            channelNumber = listNomDuChannel[listNomDuChannel.length-1]
            let world = ""
            for (let i = 0; i < args.length; i++) world += `${args[i]} `
                message.member.voiceChannel.setName('🔹 ' + world.slice(`${args[0].length}`) + '#' + channelNumber)      
            }
    }
    function closeChannel() {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.setUserLimit(message.member.voiceChannel.members.size)
        }
    }
    function openChannel() {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.setUserLimit(0)
        }
    }
    for (i=0; i<text.commands.createdChannel.length; i++) {
        if (message.content.startsWith(`${prefix}${text.commands.createdChannel[i]} `)) { // commands
            message.channel.send('reussi')
            if (message.channel.id === text.channels.commandChannel.id) {
                if (message.member.voiceChannel !== undefined) {  
                    if (message.member.voiceChannel.parent !== null) {
                        if (message.member.voiceChannel.parent.id === text.category.creationCategory.id) {
                        
                            if (message.content.startsWith(`${prefix}${text.commands.createdChannel.rename} `)) { // !rename
                                renameChannel()
                            }   
                            if (message.content.startsWith(`${prefix}${text.commands.createdChannel.close}`)) { // !close
                                closeChannel()
                            }
                            if (message.content.startsWith(`${prefix}${text.commands.createdChannel.open}`)) { // !open
                                openChannel()
                            }      
                        }
                        else {
                            message.channel.send("Cette action n'est pas autorisée avec ce channel !")
                        }
                    }
                    else {
                        message.channel.send("Cette action n'est pas autorisée avec ce channel !")
                    }
                }
                else {
                    message.channel.send('Vous devez être connecté à un un channel vocal !')
                }
            }
            else {
                message.channel.send("Cette action n'est possible que dans le channel 'commandes' !")
            }
        }
    }
});
client.login(process.env.BOT_TOKEN);
