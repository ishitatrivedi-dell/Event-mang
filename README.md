# 🎓 CampusEvents Pro  
### Integrated College Event & Finance Management Platform (MERN)

> A full-stack MERN application designed to manage **college events end-to-end**, including participant registrations, team management, certificate generation, and **event-level financial control** with budget tracking and approvals.


---

## 🚀 Why This Project?

College events are usually managed using spreadsheets, WhatsApp groups, and manual approvals.  
**CampusEvents Pro** solves this by providing a **single, structured platform** for:

- Event creation & lifecycle management  
- Participant registrations & hackathon teams  
- Automated certificate generation  
- Budget allocation, expense approvals & financial reporting  

This project focuses on **real college workflows**, avoiding unnecessary features and emphasizing **clean system design**.

---

## 🧠 Key Highlights

- Modular MERN architecture  
- Role-Based Access Control (RBAC)  
- Event-level financial constraints  
- Approval workflows  
- PDF generation (certificates & reports)  
- Clean separation of Event & Finance modules  

---

## 🧩 Core Modules

Auth & Roles
│
├── Clubs
│ └── Events
│ ├── Registrations
│ ├── Team Management (Hackathons)
│ ├── Winners
│ └── Certificates
│
└── EventLedger (Finance)
├── Budgets
├── Expense Requests
├── Approval Workflow
└── Financial Reports


---

## 👥 User Roles & Permissions

| Role | Responsibilities |
|----|----|
| **Super Admin** | Platform oversight, club approvals |
| **Club Admin** | Create events, manage registrations, raise expenses |
| **Finance Head** | Approve budgets & expenses |
| **Volunteer** | Assist with registrations |
| **Participant** | Register for events, join teams, download certificates |

---

## 🔄 Event Lifecycle

1. **Club creates an event**
2. **Budget is allocated** for the event
3. Participants register / form teams
4. Expenses are raised & approved
5. Winners are declared
6. Certificates & financial reports are generated
7. Event is marked as completed

---

## 💰 EventLedger (Finance System)

### Budget Management
- Total budget per event
- Category-wise limits (Food, Logistics, Prizes)
- Budget locking after approval

### Expense Workflow
Expense Raised → Pending → Approved / Rejected

### Financial Reports
- Budget vs spent
- Category-wise breakdown
- Profit / loss summary
- Downloadable PDF report

---

## 🧾 Certificate Generation

Certificates are automatically generated for:
- Registered participants
- Team members (hackathons)
- Winners
- Volunteers (optional)

📄 Certificates are generated as PDFs and available for download after event completion.

---

## 🏗️ Tech Stack

### Frontend
- React
- React Router
- Chart.js
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Utilities
- PDF generation
- Email notifications
- RBAC middleware

---

## 📁 Project Structure

### Backend
backend/
├── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ ├── modules/
│ │ ├── auth/
│ │ ├── users/
│ │ ├── clubs/
│ │ ├── events/
│ │ ├── registrations/
│ │ ├── teams/
│ │ ├── winners/
│ │ ├── certificates/
│ │ └── finance/
│ │ ├── budgets/
│ │ ├── expenses/
│ │ └── reports/
│ ├── middlewares/
│ ├── utils/
│ └── routes.js


### Frontend
frontend/
├── src/
│ ├── pages/
│ │ ├── auth/
│ │ ├── dashboard/
│ │ ├── events/
│ │ ├── finance/
│ │ ├── certificates/
│ │ └── admin/
│ ├── components/
│ ├── services/
│ ├── context/
│ └── App.jsx



## 🔐 Security & Design Decisions

- JWT-based authentication
- Role-based route protection
- Event-level authorization
- Budget overflow prevention
- One-time expense approvals
- Modular and scalable architecture

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/campusevents-pro.git
cd campusevents-pro
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
npm run dev
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
4️⃣ Environment Variables
Create a .env file in backend:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
🧪 API Overview (Sample)
bash
Copy code
POST   /auth/login
POST   /events
POST   /registrations
POST   /finance/budgets
POST   /finance/expenses
PATCH  /finance/expenses/:id/approve
GET    /finance/reports/:eventId
📺 Demo & Walkthrough Videos
🎥 Complete Demo Video: [ADD LINK HERE]

🧠 System Design Explanation: [ADD LINK HERE]

💰 Finance Module Walkthrough: [ADD LINK HERE]

📌 Resume Summary
Built a MERN-based platform for college event management integrating participant registrations, team management, certificate generation, and event-level financial tracking with role-based approvals and analytics.

🤝 Future Enhancements (Optional)
Event status locking

Audit logs for approvals

In-app notifications

Admin analytics dashboard

🧑‍💻 Author
Your Name
🔗 LinkedIn: [ADD LINK HERE]
💻 GitHub: [ADD LINK HERE]
📧 Email: [ADD EMAIL HERE]


