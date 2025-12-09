const { KontextAds } = window.KontextSdk;

const PUBLISHER_TOKEN = "<your publisher token>";

const USER_ID = 'user-unique-id-123';
const CONVERSATION_ID = 'conversation-unique-id-123';

const messages = [];

const ads = KontextAds()

const session = ads.createSession({
  publisherToken: PUBLISHER_TOKEN,
  userId: USER_ID,
  conversationId: CONVERSATION_ID,
})

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('chat-input');
const chatContainer = document.getElementById('chat-container');
const chatLoader = document.getElementById('chat-loader');
const chatSubmit = document.getElementById('chat-submit');

let lastAssistantMessageId = null;

const getRandomId = () => Math.random().toString(36).substring(2, 15);

const addUserMessage = () => {
  const msg = messageInput.value;
  messageInput.value = '';

  const message = {
    id: getRandomId(),
    createdAt: new Date(),
    role: 'user',
    content: msg
  }
  messages.push(message);
  session.addMessage(message);
  updateChatContainer();
}

const simulateAssistantResponse = () => {
  chatLoader.style.display = 'block';
  chatSubmit.disabled = true;
  setTimeout(() => {
    lastAssistantMessageId = getRandomId();
    const message = {
      id: lastAssistantMessageId,
      createdAt: new Date().toISOString(),
      role: 'assistant',
      content: 'This is a response from the assistant'
    }
    messages.push(message);
    session.addMessage(message);
    chatLoader.style.display = 'none';
    chatSubmit.disabled = false;
    updateChatContainer();
    renderAd();
  }, 1);
}

const updateChatContainer = () => {
  chatContainer.innerHTML = messages.map((message, index) => `
    <div class="message">
      <div class="message-role"><strong>${message.role}</strong></div>
      <div class="message-content">${message.content}</div>
      ${index === messages.length - 1 ? `<div id="ad-container"></div>` : ''}
    </div>
  `).join('');
}

const renderAd = async () => {
  const element = document.getElementById('ad-container');
  if (!element) {
    return;
  }
  session.render({
    messageId: lastAssistantMessageId,
    element
  })
}

const handleForm = () => {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addUserMessage();
    simulateAssistantResponse();
  });
}

handleForm();