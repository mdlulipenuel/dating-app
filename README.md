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
