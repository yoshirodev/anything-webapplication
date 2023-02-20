//const stringSimilarity = require('string-similarity');

async function sendMessage() {
    const userMessage = document.getElementById("messageBot").value;
    if (userMessage.trim() === "") {
        return;
    }

    const chatbotResponse = await getChatbotResponse(userMessage);

    addBotMessage(chatbotResponse.response);
    if (chatbotResponse.similarPatterns.length > 0) {
        console.log("Similar patterns found: ");
        console.log(chatbotResponse.similarPatterns);
    }

    document.getElementById("messageBot").value = "";
}

window.sendMessage = sendMessage;

async function getChatbotResponse(userMessage, similarityThreshold = 0.6) {
    try {
        const response = await fetch('data1.json');
        const data = await response.json();

        let bestMatch = {
            index: -1,
            score: 0,
            responses: [],
            similarPatterns: []
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
                    bestMatch.similarPatterns = [{ pattern, similarity }];
                } else if (similarity > similarityThreshold && similarity === bestMatch.score) {
                    bestMatch.similarPatterns.push({ pattern, similarity });
                }
            }
        }

        if (bestMatch.index > -1) {
            const response = bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
            return { response, similarPatterns: bestMatch.similarPatterns };
        }

        return {
            response: "I'm sorry, I didn't understand that, I'm still being trained so there might be some words that I don't understand yet.",
            similarPatterns: []
        };
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
