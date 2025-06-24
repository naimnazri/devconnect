# DevConnect – Open API Developer Portal 🧩

DevConnect is a full-featured frontend app inspired by real-world API marketplaces like Stripe, Twilio, and MAS API Portal. Built with React, Tailwind CSS, and JSON Server.

## 🌟 Features

- 🔐 JWT-based Auth (Login, Register)
- 📚 Browse & subscribe to APIs
- 🪜 Multi-step subscription form
- 🔑 View/manage API keys and client credentials
- 📥 Upload `.pem` certificates with X.509 parsing
- 👥 Invite team members per subscription
- 🔁 Token expiry and auto logout
- 📱 Responsive layout with Sidebar navigation
- ✅ Powered by Redux Toolkit

## 🧰 Tech Stack

- React + Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Swagger UI
- react-dropzone, @peculiar/x509
- JSON Server (mock backend)

## 🚀 Getting Started

```bash
npm install
npm run dev     # frontend
npm run server  # json-server
```

=======

## Configuration

Create a `.env` file in the project root to override the backend URL:

```bash
# defaults to http://localhost:3001 if not set
VITE_API_URL=http://your-api-server:3001
```
