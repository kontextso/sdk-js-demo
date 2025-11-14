import { fetchAd } from 'https://server.megabrain.co/sdk/js';
import { PUBLISHER_TOKEN, PLACEMENT_CODE } from './constants.mjs';
import { getRandomId } from './utils.mjs';

const messages = [];

const USER_ID = getRandomId();
const CONVERSATION_ID = getRandomId();

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('chat-input');
const chatContainer = document.getElementById('chat-container');
const chatLoader = document.getElementById('chat-loader');
const chatSubmit = document.getElementById('chat-submit');

const addUserMessage = () => {
  const msg = messageInput.value;
  messageInput.value = '';
  messages.push({
    id: getRandomId(),
    createdAt: new Date().toISOString(),
    role: 'user',
    content: msg
  });
  updateChatContainer();
}

const simulateAssistantResponse = () => {
  chatLoader.style.display = 'block';
  chatSubmit.disabled = true;
  setTimeout(() => {
    messages.push({
      id: getRandomId(),
      createdAt: new Date().toISOString(),
      role: 'assistant',
      content: 'This is a response from the assistant'
    });
    chatLoader.style.display = 'none';
    chatSubmit.disabled = false;
    updateChatContainer();
    generateAd();
  }, 3000);
}

const updateChatContainer = () => {
  chatContainer.innerHTML = messages.map((message, index) => `
    <div class="message">
      <div><strong>${message.role}</strong></div>
      <div>${message.content}</div>
      ${index === messages.length - 1 ? `<div id="ad-container"></div>` : ''}
    </div>
  `).join('');
}

const generateAd = () => {
  const fetchAdParams = {
    publisherToken: PUBLISHER_TOKEN,
    code: PLACEMENT_CODE,
    userId: USER_ID,
    conversationId: CONVERSATION_ID,
    messages,
    element: document.getElementById("ad-container")
  }
  fetchAd(fetchAdParams)
}

const handleForm = () => {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addUserMessage();
    simulateAssistantResponse();
  });
}

handleForm();