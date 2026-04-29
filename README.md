💰 Personal Finance Tracker

A full-stack Personal Finance Tracker that helps you manage your income, expenses, and financial insights in one place.

Built with a modern tech stack and clean architecture, this app allows users to track transactions, analyze spending, and stay financially organized.

🚀 Features
📊 Add & track income and expenses
🗂️ Categorize transactions
📅 View financial data over time
📈 Dashboard with insights (can be extended with charts)
🔍 Filter and manage transactions
🌐 Full-stack architecture (Frontend + Backend)
⚡ Fast frontend using Vite
🛠️ Tech Stack

Frontend
React (Vite)
CSS / Tailwind (if you used it)
Axios / Fetch API

Backend
Node.js
Express.js

Database
Supabase (as seen in your project)


📂 Project Structure
Personal Finance Tracker/
│
├── backend/
│   ├── config/          # DB & environment config
│   ├── controllers/     # Business logic
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── server.js        # Entry point
│   ├── supabase.js      # Supabase connection
│   ├── .env             # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/             # React source code
│   ├── dist/            # Build files
│   ├── index.html
│   ├── vite.config.js
│   ├── .env
│   └── package.json
│
└── .gitignore

⚙️ Setup Instructions

1️⃣ Clone the Repository
git clone https://github.com/survekaran/personal-finance-tracker.git
cd personal-finance-tracker

2️⃣ Setup Backend
cd backend
npm install

Create a .env file:

PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

Run backend:

npm start
3️⃣ Setup Frontend
cd ../frontend
npm install
npm run dev

🌐 API Endpoints (Example)
Method	Endpoint	Description
GET	/transactions	Get all transactions
POST	/transactions	Add new transaction
DELETE	/transactions/:id	Delete transaction


💡 Example Usage
Add Income → ₹50,000
Add Expense → ₹10,000 (Food)
Remaining Balance → ₹40,000
View spending trends
🔮 Future Improvements
🔐 Authentication (Login/Signup)
📊 Advanced charts (Pie, Bar)
📱 Mobile responsiveness improvements
💸 Budget tracking & alerts
☁️ Cloud deployment (Render / Vercel)
🚀 Deployment

Frontend → Vercel / Netlify
Backend → Render / Railway
Database → Supabase

🤝 Contributing

Feel free to fork this project and improve it.

📜 License

MIT License

👨‍💻 Author

Karan Surve
📧 survekaran71@gmail.com
