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
        const response = await fetch('data1.json');
        const data = await response.json();
        for (let i = 0; i < data.intents.length; i++) {
            const intent = data.intents[i];
            for (let j = 0; j < intent.patterns.length; j++) {
                const pattern = intent.patterns[j];
                // Use Levenshtein distance algorithm to calculate the similarity
                const distance = levenshteinDistance(userMessage.toLowerCase(), pattern.toLowerCase());
                const similarity = 1 - (distance / Math.max(userMessage.length, pattern.length));
                // Define a threshold for the maximum allowed distance
                const threshold = 0.8;
                if (similarity >= threshold) {
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

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    return matrix[b.length][a.length];
}
  

function addBotMessage(message) {
    const chatList = document.getElementById("chatList");
    const messageItem = document.createElement("li");
    messageItem.classList.add("bot-message");
    messageItem.textContent = message;
    chatList.appendChild(messageItem);
}
