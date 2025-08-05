// Simple frontend logic for the dating app

const API_BASE = 'http://localhost:5000'; // adjust if backend runs elsewhere

let currentUserId = null;
let currentChatPartner = null;

// Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const authFormsDiv = document.getElementById('auth-forms');
const navButtonsDiv = document.querySelector('.nav-buttons');
const profilesSection = document.querySelector('.profiles');
const matchesSection = document.querySelector('.matches');
const chatSection = document.querySelector('.chat');
const profilesContainer = document.getElementById('profiles-container');
const matchesContainer = document.getElementById('matches-container');
const chatWindow = document.getElementById('chat-window');
const chatPartnerNameSpan = document.getElementById('chat-partner-name');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Show/hide helper functions
function show(section) {
    profilesSection.style.display = 'none';
    matchesSection.style.display = 'none';
    chatSection.style.display = 'none';
    if (section === 'profiles') profilesSection.style.display = 'block';
    if (section === 'matches') matchesSection.style.display = 'block';
    if (section === 'chat') chatSection.style.display = 'block';
}

function showNav() {
    navButtonsDiv.style.display = 'block';
    authFormsDiv.style.display = 'none';
}

function resetUI() {
    navButtonsDiv.style.display = 'none';
    authFormsDiv.style.display = 'block';
    show('');
    currentUserId = null;
    currentChatPartner = null;
    profilesContainer.innerHTML = '';
    matchesContainer.innerHTML = '';
    chatWindow.innerHTML = '';
}

// Event listeners for form toggling
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Login submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
        currentUserId = data.user_id;
        showNav();
        loadProfiles();
        show('profiles');
    } else {
        alert(data.error || 'Login failed');
    }
});

// Registration submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        username: document.getElementById('reg-username').value,
        password: document.getElementById('reg-password').value,
        name: document.getElementById('reg-name').value,
        age: document.getElementById('reg-age').value,
        gender: document.getElementById('reg-gender').value,
        interests: document.getElementById('reg-interests').value,
        bio: document.getElementById('reg-bio').value,
        location: document.getElementById('reg-location').value
    };
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
        alert('Registration successful! Please log in.');
        // Show login form
        registerForm.reset();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    } else {
        alert(data.error || 'Registration failed');
    }
});

// Navigation buttons
document.getElementById('nav-browse').addEventListener('click', () => {
    loadProfiles();
    show('profiles');
});
document.getElementById('nav-matches').addEventListener('click', () => {
    loadMatches();
    show('matches');
});
document.getElementById('nav-logout').addEventListener('click', () => {
    resetUI();
});

// Load profiles
async function loadProfiles() {
    if (!currentUserId) return;
    profilesContainer.innerHTML = '';
    const res = await fetch(`${API_BASE}/profiles/${currentUserId}`);
    const data = await res.json();
    if (res.ok) {
        if (data.profiles.length === 0) {
            profilesContainer.innerHTML = '<p>No profiles available.</p>';
            return;
        }
        data.profiles.forEach(profile => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${profile.name} (${profile.age})</h3>
                <p><strong>Gender:</strong> ${profile.gender}</p>
                <p><strong>Location:</strong> ${profile.location || 'N/A'}</p>
                <p>${profile.bio || ''}</p>
                <button data-user-id="${profile.id}">Like</button>
            `;
            const likeButton = card.querySelector('button');
            likeButton.addEventListener('click', () => likeUser(profile.id));
            profilesContainer.appendChild(card);
        });
    } else {
        alert(data.error || 'Failed to load profiles');
    }
}

// Like a user
async function likeUser(targetId) {
    if (!currentUserId) return;
    const res = await fetch(`${API_BASE}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUserId, target_id: targetId })
    });
    const data = await res.json();
    if (res.ok) {
        if (data.match) {
            alert('It’s a match!');
        } else {
            alert('You liked this user');
        }
        // Refresh profiles to hide liked? For now we simply reload.
        loadProfiles();
    } else {
        alert(data.error || 'Failed to like user');
    }
}

// Load matches
async function loadMatches() {
    if (!currentUserId) return;
    matchesContainer.innerHTML = '';
    const res = await fetch(`${API_BASE}/matches/${currentUserId}`);
    const data = await res.json();
    if (res.ok) {
        if (data.matches.length === 0) {
            matchesContainer.innerHTML = '<p>No matches yet. Keep swiping!</p>';
            return;
        }
        data.matches.forEach(match => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${match.name} (${match.age})</h3>
                <p>${match.bio || ''}</p>
                <button data-user-id="${match.id}">Chat</button>
            `;
            const chatButton = card.querySelector('button');
            chatButton.addEventListener('click', () => openChat(match));
            matchesContainer.appendChild(card);
        });
    } else {
        alert(data.error || 'Failed to load matches');
    }
}

// Open chat with a match
function openChat(match) {
    currentChatPartner = match;
    chatPartnerNameSpan.textContent = match.name;
    show('chat');
    loadMessages();
}

// Load messages in chat
async function loadMessages() {
    if (!currentUserId || !currentChatPartner) return;
    chatWindow.innerHTML = '';
    const res = await fetch(`${API_BASE}/messages/${currentUserId}/${currentChatPartner.id}`);
    const data = await res.json();
    if (res.ok) {
        data.messages.forEach(msg => {
            const div = document.createElement('div');
            div.className = 'chat-message';
            const sender = msg.sender_id === currentUserId ? 'You' : currentChatPartner.name;
            div.innerHTML = `<span class=\"sender\">${sender}:</span> ${msg.content}`;
            chatWindow.appendChild(div);
        });
        chatWindow.scrollTop = chatWindow.scrollHeight;
    } else {
        alert(data.error || 'Failed to load messages');
    }
}

// Send a new message
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = messageInput.value;
    if (!content.trim()) return;
    const res = await fetch(`${API_BASE}/messages/${currentUserId}/${currentChatPartner.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });
    const data = await res.json();
    if (res.ok) {
        messageInput.value = '';
        loadMessages();
    } else {
        alert(data.error || 'Failed to send message');
    }
});

// Back to matches from chat
document.getElementById('back-to-matches').addEventListener('click', () => {
    show('matches');
    loadMatches();
});

// Periodically refresh messages when chat is open
setInterval(() => {
    if (chatSection.style.display === 'block') {
        loadMessages();
    }
}, 4000);
