async function sendUserMessage() {
    // Get user's message from input box
    const userMessage = document.getElementById("messageBot").value;
    if (userMessage.trim() === "") {
    return;
    }

    // Send user's message to chatbot and wait for response
    const chatbotResponse = await getChatbotResponse(userMessage);

    // Display chatbot's response in the chat window
    addBotMessage(chatbotResponse);

    // Clear user's message from input box
    document.getElementById("messageBot").value = "";
}

async function getChatbotResponse(userMessage) {
    try {
    // Load data from two JSON files
    const response1 = await fetch('data1.json');
    const response2 = await fetch('data2.json');
    const data1 = await response1.json();
    const data2 = await response2.json();

    // Combine data from both files into one object
    const data = {
        intents: [...data1.intents, ...data2.intents]
    };

    for (let i = 0; i < data.intents.length; i++) {
        const intent = data.intents[i];
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
  