    /* This command when activated, will collect messages matching a criteria */
    /* It will then reply to matching messages, and send a message at the end of collection based on what was collected */
client.on('messageCreate', async message => {

    /* Checks the message to make sure that it begins with my chosen prefix,
       this is stored in a json file for me but could be any string variable */
    if (!message.content.startsWith(prefix)) return;

    /* This is the typical way I extract the arguments provided with a text based command */
    const args = message.content.slice(prefix.length).split(/ /);
    /* The first arg will be the command I extract this for readability and lowercase it for consistency */
    const commandName = args.shift().toLowerCase();

    /* Collection Implementation - First message activates the collector, which waits on messages for a time limit */
    if (commandName === 'collect'){
        /* Responds to the message that activated it */
        message.channel.send({ content: "Reply with 'Bananas' in 15s to activate banana mode"});
        /* This is what we will be looking for, messages that match a certain criteria */
        const filter = m => m.content.startsWith('Bananas');
        /* This is the collector being created, we put in the filter, and we also configure the time */
        const collector = message.channel.createMessageCollector({filter, time: 15000});

        /* This is our collector function, it is active while the collector is alive */
        collector.on('collect', m =>{
            /* Simple reply if we collect a message */
            m.channel.send({content: ":banana: Banana Mode Activated :banana:"})
            });

        /* This is triggered on death of the collector */
        collector.on('end', collected => {
            if (collected.size > 0){
                /* Message sent at the end of the collection period if something was collected*/
                message.channel.send({content: "Banana Mode Ended"});
            } else {
                /* Message sent if nothing was collected */
                message.channel.send({content: "Banana Mode not activated"});
            }
        });
    }
});