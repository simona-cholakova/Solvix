# Solvix – Complaint Management System for Zalando

> A university project for the **Management of Information Technologies** course.  
> Solvix is a full stack web application that simulates a complaint management platform for the Zalando e-commerce ecosystem.

---

## Overview

Solvix provides a structured system for handling customer complaints related to orders, deliveries, and products on a Zalando like platform. It has two separate portals — one for customers to submit and track complaints, and one for managers to review, assign, update, and resolve them.

---

## Features

### Client Portal
- **Submit complaints** – Fill in name, complaint type, description, and optionally attach files (PDF, PNG, JPG) via click or drag & drop
- **Track complaints** – View all submitted complaints in a dashboard with status badges (Pending, In Progress, Resolved)
- **Complaint detail view** – See full complaint info including department, submission date, resolution date, and attachments
- **Search** – Filter complaints by ID or type

### Manager Portal
- **Dashboard** – Overview of all complaints with live counts by status, search, and filters by status and department
- **Complaints page** – Full complaints table with an inline status dropdown for quick updates without opening the detail view
- **Complaint detail** – View full complaint info, reassign department, update status, and add internal notes
- **Analytics** – Live charts showing resolution rate, average response time, customer satisfaction score, complaints by department (bar chart), top complaint types, and a full department status breakdown table
- **Departments** – Expandable cards per department showing assigned agents, complaint counts by status, and a scrollable list of complaints per department
- **Settings** – Four tab settings panel: Profile (name, email, role, phone), Notifications (event toggles + delivery channels), Security (password change with validation), Appearance (theme, language, timezone, date format)

### General
- **Role based access** – Separate login pages for Manager and Client
- **In memory data** – Complaint data is seeded on backend start; changes persist for the session
- **CORS enabled REST API** – Frontend and backend run on separate ports and communicate via HTTP

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Routing | React Router |
| Backend | Node.js, Express, TypeScript |
| State | React Context API |
| Icons | Lucide React |

---

## Project Structure

```
Solvix/
├── backend/
│   ├── src/
│   │   ├── index.ts        # Express server + all API routes
│   │   └── db.ts           # In-memory complaints data store
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── App.tsx                     # Root component with router + context
│   │   ├── components/
│   │   │   ├── LandingPage.tsx             # Home page with portal selection
│   │   │   ├── M.tsx                       # Manager login
│   │   │   ├── C.tsx                       # Client login
│   │   │   ├── Dashboard.tsx               # Manager dashboard
│   │   │   ├── ManagerSidebar.tsx          # Shared sidebar for all manager pages
│   │   │   ├── ManagerComplaints.tsx       # Manager complaints list page
│   │   │   ├── ManagerDepartments.tsx      # Departments overview page
│   │   │   ├── ManagerSettings.tsx         # Settings page (4 tabs)
│   │   │   ├── A.tsx                       # Analytics page
│   │   │   ├── ComplaintDetails.tsx        # Manager complaint detail view
│   │   │   ├── ClientDashboard.tsx         # Client complaints dashboard
│   │   │   ├── ClientComplaintDetails.tsx  # Client complaint detail view
│   │   │   └── SubmitComplaint.tsx         # Submit complaint form with file upload
│   │   ├── context/
│   │   │   └── ComplaintsContext.tsx       # Global complaints state
│   │   └── routes.tsx                      # All app routes
│   └── package.json
├── docs/                   # Project documentation and diagrams
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/allComplaints` | Returns all complaints |
| GET | `/getComplaintDetails/:complaintId` | Returns a single complaint by ID |
| POST | `/addComplaint` | Creates a new complaint |
| PUT | `/complaints/:id` | Updates status and/or department of a complaint |

The backend runs on `http://localhost:3000`. Data is stored in memory and resets on server restart.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/simona-cholakova/Solvix.git
cd Solvix
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

### Running the App

**Start the backend** (in one terminal):

```bash
cd backend
npm run test
```

**Start the frontend** (in a second terminal):

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Usage

### As a Manager
1. Go to the landing page and click **Enter as Manager**
2. Log in (any credentials work in the current demo)
3. Use the sidebar to navigate between Dashboard, Complaints, Analytics, Departments, and Settings
4. Click **View** on any complaint to open the detail page and update its status or department

### As a Client
1. Go to the landing page and click **Enter as Client**
2. Log in (any credentials work in the current demo)
3. View existing complaints on the dashboard
4. Click **Submit New Complaint** to file a complaint — fill in the form, optionally attach files, and submit
5. After submitting, a success confirmation is shown
6. Click **View Details** on any complaint to see its full status and information

---

## Documentation

Additional project documentation, architecture diagrams, and use case descriptions can be found in the [`/docs`](./docs) folder.

---

## Authors

- **Simona Cholakova** – [GitHub](https://github.com/simona-cholakova)
- **Nade Belovinova** - [GitHub](https://github.com/bel-n)
- **Ema Čikotić** - [GitHub](https://github.com/EmaCikotic)
- **Jaka Hrvatin** - [GitHub](https://github.com/ripi3nt)
---

## Academic Context

This project was developed as part of the **Management of Information Technologies** course. It demonstrates full stack web development applied to a real world e-commerce business problem; specifically complaint handling and customer service workflow management for a Zalando like platform.

---

## License

This project is for educational purposes only.