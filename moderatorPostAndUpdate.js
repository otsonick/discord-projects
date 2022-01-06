    /* This command set will allow you have your bot create a plain text post for you */
    /* And once created for you, it will allow you to update the post by replying to it 
       It will only successfully update if you have the correct permission level */
client.on('messageCreate', async message => {

    /* Checks the message to make sure that it begins with my chosen prefix, 
       this is stored in a json file for me but could be any string variable */
    if (!message.content.startsWith(prefix)) return;

    /* This is the typical way I extract the arguments provided with a text based command */
    const args = message.content.slice(prefix.length).split(/ /);
    /* The first arg will be the command I extract this for readability and lowercase it for consistency */
    const commandName = args.shift().toLowerCase();
    
    /* This check prevents this commands from being activated by regular users, 
       users with the 'MANAGE_MESSAGES' permission will be able to activate commands inside this statement */
    if (message.guild.members.cache.get(message.author.id).permissions.has('MANAGE_MESSAGES', true)){
    
        /* Can make the commandName whatever you like,
           make sure it's all lowercase here due to the earlier treatment to the string */
       if (commandName === 'modpost'){
        /* Will repeat the message (without the prefix, the commandName and the following space) */
        /* Then will delete the message that triggered this command */
        message.channel.send({content: message.content.slice(prefix.length + commandName.length + 1)});
        message.delete();
        return;
       }
       
        /* Same as above, the commandName can be whatever you want it to be */
        /* This command though is designed to function as a reply, 
           so will only work if there is a message being replied to when the command is called */
        if (commandName === 'update' && message.type === 'REPLY'){
            /* Searches for the message that is being referenced, ie the message we will be editing */
            let messageToEdit = await message.fetchReference();
            /* Check to make sure the message we have the bot can actually edit */
            if (messageToEdit.editable){
                /* We then change the content of the message to the new message,
                   removing the same front matter as before */
                messageToEdit.edit(message.content.slice(prefix.length + commandName.length + 1));
            }
            /* Deletes the message that called for the update,
               this could be handled differently if a different outcome was wanted */
            message.delete();
            return;
            /* For example, some potential ideas include having a confirmation message
               printed by the bot to confirm the update was successful, or the message
               could remain there and the bot replies to the reply */
        }
   }
