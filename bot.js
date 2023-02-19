async function sendUserMessage() {
    const userMessage = document.getElementById("messageBot").value;
    if (userMessage.trim() === "") {
    return;
    }

    const chatbotResponse = await getChatbotResponse(userMessage);

    addBotMessage(chatbotResponse);

    document.getElementById("messageBot").value = "";
}

const stringSimilarity = require('string-similarity');

async function getChatbotResponse(userMessage) {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        let bestMatch = {
            index: -1,
            score: 0,
            responses: []
        };

        for (let i = 0; i < data.intents.length; i++) {
            const intent = data.intents[i];
            for (let j = 0; j < intent.patterns.length; j++) {
                const pattern = intent.patterns[j];
                const similarity = stringSimilarity.compareTwoStrings(userMessage.toLowerCase(), pattern.toLowerCase());
                if (similarity > bestMatch.score) {
                    bestMatch.index = i;
                    bestMatch.score = similarity;
                    bestMatch.responses = intent.responses;
                }
            }
        }

        if (bestMatch.index > -1) {
            const response = bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
            return response;
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
  