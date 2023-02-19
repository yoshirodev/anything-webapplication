async function sendUserMessage() {
    const userMessage = document.getElementById("messageBot").value;
    if (userMessage.trim() === "") {
    return;
    }

    const chatbotResponse = await getChatbotResponse(userMessage);

    addBotMessage(chatbotResponse);

    document.getElementById("messageBot").value = "";
}

async function getChatbotResponse(userMessage) {
    try {
        const [data1, data2, data3] = await Promise.all([
            fetch('data1.json').then(response => response.json()),
            fetch('data2.json').then(response => response.json()),
            fetch('data3.json').then(response => response.json())
        ]);
        
        const allIntents = [...data1.intents, ...data2.intents, ...data3.intents];
        
        for (let i = 0; i < allIntents.length; i++) {
            const intent = allIntents[i];
            for (let j = 0; j < intent.patterns.length; j++) {
                const pattern = intent.patterns[j];
                if (userMessage.toLowerCase().includes(pattern.toLowerCase())) {
                    const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
                    return response;
                }
            }
        }
        return "I'm sorry, I didn't understand that, I'm still being trained so there might be some words that I don't understand yet.";
    } catch (error) {
        console.error(error);
    }
}



function addBotMessage(message) {
    const chatList = document.getElementById("chatList");
    const messageItem = document.createElement("li");
    messageItem.classList.add("bot-message");
    messageItem.textContent = message;
    chatList.appendChild(messageItem);
}
  