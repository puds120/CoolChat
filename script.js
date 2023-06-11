const chatLogElement = document.getElementById('chat-log');
const userInputElement = document.getElementById('user-input');

const OPENAI_API_KEY = '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'; // Replace with your OpenAI API key

async function sendMessageToBot(message) {
    appendUserMessage(message);
    userInputElement.value = '';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                'messages': [
                    { 'role': 'system', 'content': 'You are a helpful assistant.' },
                    { 'role': 'user', 'content': message },
                ],
            }),
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        appendBotMessage(botMessage);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

function appendUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('user-message');
    messageElement.innerText = message;
    chatLogElement.appendChild(messageElement);
}

function appendBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('bot-message');
    messageElement.innerText = message;
    chatLogElement.appendChild(messageElement);
}

function handleUserInput(event) {
    if (event.key === 'Enter') {
        const message = userInputElement.value;
        if (message.trim() !== '') {
            sendMessageToBot(message);
        }
    }
}
