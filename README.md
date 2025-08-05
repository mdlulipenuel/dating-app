# Dating App – Connect & Match

This repository contains a simple full‑stack dating application reminiscent of popular platforms like Badoo. The aim is to demonstrate a complete solution with user registration, login, profile browsing, liking users (swiping), matching, and real‑time messaging between matched users.

## Features

### Backend (Python/Flask)

* **User registration and login** – Users can create accounts and log in securely. Passwords are hashed using Werkzeug.
* **Browse profiles** – Users can view the profiles of other users and see basic details such as name, age, gender, location and bio.
* **Like & match** – When a user likes another user, the like is recorded. If both users like each other, a match is created.
* **Matches list** – Users can see all their current matches.
* **Messaging** – Matched users can exchange text messages. Messages are stored in the database and retrieved when the chat window is opened.

### Frontend (HTML/CSS/JavaScript)

* **Responsive UI** – A clean, responsive interface built with vanilla HTML, CSS and JavaScript (no frameworks) for ease of customization.
* **Login & registration forms** – Simple forms for authentication and account creation.
* **Profile cards** – Browse other users with profile cards, each containing a like button.
* **Matches & chat** – View matches and open a chat window to send and receive messages in real time (auto‑refreshes every few seconds).
* **SPA‑like navigation** – Basic navigation without reloading the page; toggles between browsing, matches and chat sections.

## Project Structure

```
dating_app/
├── backend/
│   ├── app.py            # Flask application and API endpoints
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── index.html        # Main web page
│   ├── script.js         # Front‑end logic to call the API and update the UI
│   └── styles.css        # Styles for the web page
└── README.md             # This file
```

## Setup & Running

> **Note:** This app was built and tested with Python 3.10+ and requires installing a few dependencies. If you don’t already have Flask installed, follow the instructions below. You will also need a modern web browser (such as Chrome or Firefox) to open the front‑end page.

1. **Clone the repository**

   ```bash
   git clone https://github.com/your‑username/dating_app.git
   cd dating_app/backend
   ```

2. **Create a virtual environment (optional but recommended)**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use 'venv\\Scripts\\activate'
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server**

   The server stores its data in a local SQLite database file (`dating_app.db`) in the `backend` directory.

   ```bash
   python app.py
   ```

   The API will start on port 5000 by default (http://localhost:5000).

5. **Open the front‑end**

   Simply open `frontend/index.html` in your browser. Since the page communicates with the backend on `localhost:5000`, it will function if you run both on the same machine.

   *If you host the backend on another domain or port, update the `API_BASE` constant at the top of `frontend/script.js` accordingly.*

## Extending the App

This project is intentionally kept simple for demonstration purposes. To turn it into a production‑ready dating app, consider the following improvements:

* **Authentication tokens** – Use JWT or session cookies instead of passing user IDs directly.
* **Input validation & error handling** – Sanitize inputs, validate email addresses, and handle database errors gracefully.
* **Profile photos & media** – Allow users to upload photos and display them in profile cards.
* **Match criteria** – Implement advanced matching algorithms based on interests, location proximity, preferences, etc.
* **Real‑time messaging** – Integrate WebSockets (e.g. Flask‑SocketIO) for live chat instead of periodic polling.
* **Deployment considerations** – Set up a proper production environment with HTTPS, database migrations, and environment variables for configuration.

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.

## Executive Summary & Expanded Scope

The following is a comprehensive scope for a new dating app with both web and mobile platforms. The goal is to create a more useful and engaging experience than existing "swipe" apps like Tinder and Badoo, addressing common user pain points like fake profiles, low-quality matches, and the pressure to be constantly "on." The app will prioritize genuine connections, user safety, and a fun, gamified experience that encourages meaningful interaction beyond a simple "like".

### Core Features & Functionality

#### User Profile & Onboarding
- **Social & Standard Sign-in**: Users can sign up and log in via phone number, email, or social media accounts (Facebook, Google, Instagram, Spotify).
- **Detailed Profile Creation**: Beyond basic information (age, gender, location), the app will prompt users with creative questions, prompts, and quizzes to build a rich, multi-faceted profile.
- **De-gaming the Bio**: Encourage users to create bios that go beyond generic phrases. Prompts ask users to share specific stories, opinions, or "hot takes" to make their profile more engaging.
- **Media Integration**: Users can upload photos, short videos, and connect their Instagram and Spotify accounts to share their aesthetic and musical taste.
- **Profile Verification**: Robust verification (photo verification, phone number) to combat fake profiles and catfishing, with visible verified badges.

#### Matching & Discovery
- **Enhanced Matching Algorithm**: Goes beyond location and basic preferences. Incorporates machine learning to suggest matches based on shared interests, personality quiz results, and user behavior.
- **Interactive Discovery**: Includes gamified discovery processes like Question of the Day (users answer a daily question and see others who answered similarly), Shared Interest highlighting, and a location-based "Crush" feature.
- **Advanced Filtering**: Filter matches by more than age and distance, including shared values, lifestyle habits, and relationship goals.
- **Second Chance Feature**: Allows users to get a daily or weekly "rewind" to re-evaluate a profile they swiped left on.

#### Communication & Interaction
- **In-App Messaging**: A secure chat system with text, emojis, and photo sharing.
- **Conversation Starters**: Context-based conversation starters or fun icebreaker games once a match is made.
- **Voice & Video Calls**: Secure in-app voice and video calls for matched users.
- **Post-Date Feedback**: Optional anonymous feedback after a date to help improve the community and user reputation.

### Advanced Features & Monetization

#### Premium Subscription Model
- The app operates on a freemium model with a premium tier offering an ad-free experience, "Who Likes Me?" feature, unlimited swipes/interactions, advanced filters, profile boosts, and "Super Like" equivalents.

#### In-App Purchases
- A-la-carte boosts and virtual gifts that users can purchase without a subscription.

### Platform and Technical Scope
- **Native Mobile Apps**: Native iOS and Android applications.
- **Web-Based Platform**: A fully functional web version mirroring the mobile experience.
- **Robust Backend**: Built with modern technologies to handle a high volume of users and data.
- **Database**: High-performance database (e.g., PostgreSQL or MongoDB) to store user profiles, matches, and chat history.
- **Security & Privacy**: End-to-end encryption for messaging, GDPR compliance, and strong user-reporting and moderation systems.

### User Experience & Design
- Minimalist, intuitive design with accessibility considerations.
- Gamified elements like badges for completing profiles, having a first video call, or sending a certain number of messages.

### Post-Launch Plan
- **Dedicated Moderation Team** for reviewing reports and ensuring community safety.
- **Regular Updates** based on user feedback and market trends.
- **Community Building**: Potential virtual or local events for users to meet and strengthen the community.
