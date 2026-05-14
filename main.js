import { createSession } from '@kontextso/sdk-js'

const PUBLISHER_TOKEN = '<your publisher token>'

const USER_ID = 'user-unique-id-123'
const CONVERSATION_ID = 'conversation-unique-id-123'

const session = createSession({
  publisherToken: PUBLISHER_TOKEN,
  userId: USER_ID,
  conversationId: CONVERSATION_ID,
  onEvent: (event) => {
    console.log('[Kontext]', event.name, event)
  },
})

const messages = []

const chatForm = document.getElementById('chat-form')
const messageInput = document.getElementById('chat-input')
const chatContainer = document.getElementById('chat-container')
const chatLoader = document.getElementById('chat-loader')
const chatSubmit = document.getElementById('chat-submit')

let lastAssistantMessageId = null

const getRandomId = () => Math.random().toString(36).substring(2, 15)

const addUserMessage = () => {
  const content = messageInput.value.trim()
  if (!content) return
  messageInput.value = ''

  const message = {
    id: getRandomId(),
    createdAt: new Date(),
    role: 'user',
    content,
  }
  messages.push(message)
  session.addMessage(message)
  updateChatContainer()
}

const simulateAssistantResponse = () => {
  chatLoader.style.display = 'block'
  chatSubmit.disabled = true

  setTimeout(() => {
    lastAssistantMessageId = getRandomId()
    const message = {
      id: lastAssistantMessageId,
      createdAt: new Date(),
      role: 'assistant',
      content: 'This is a response from the assistant.',
    }
    messages.push(message)
    session.addMessage(message)

    chatLoader.style.display = 'none'
    chatSubmit.disabled = false
    updateChatContainer()

    renderAd()
  }, 500)
}

const updateChatContainer = () => {
  chatContainer.innerHTML = messages
    .map(
      (message) => `
    <div class="message ${message.role}">
      <div class="message-role"><strong>${message.role}</strong></div>
      <div class="message-content">${message.content}</div>
      ${message.role === 'assistant' ? `<div id="ad-${message.id}" class="ad-container"></div>` : ''}
    </div>
  `
    )
    .join('')
}

const renderAd = () => {
  if (!lastAssistantMessageId) return
  const element = document.getElementById(`ad-${lastAssistantMessageId}`)
  if (!element) return

  session.render({
    messageId: lastAssistantMessageId,
    element,
  })
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault()
  addUserMessage()
  simulateAssistantResponse()
})
