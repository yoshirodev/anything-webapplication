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
    const files = ['data1.json', 'data2.json', 'data3.json'];
    let bestMatch = {
        index: -1,
        score: 0,
        responses: [],
        similarPatterns: []
    };

    for (const file of files) {
        const response = await fetch(file);
        const data = await response.json();

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
                } else if (similarity > 0.6 && similarity === bestMatch.score) {
                    bestMatch.similarPatterns.push({ pattern, similarity });
                }
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
