# 🛠️ FakeItApi

**FakeItApi** is a powerful full-stack developer tool that allows users to create custom fake APIs with dynamic responses perfect for frontend development, testing, or prototyping.

Built with Node.js and React.js, and powered by **Faker.js**, this tool lets users define their own API endpoint structure and the desired response schema. Once defined, the app auto-generates fake data and hosts the API, allowing users to call it just like any real backend.

---

## 🌐 Live Demo

🔗 [FakeItApi Live](https://your-live-url.com)

---

## ⚙️ Features

- 🚀 Generate **fake APIs** instantly based on user-defined schema
- 🧪 Use in frontend or mobile app testing
- 📦 Powered by **Faker.js** for realistic data (names, emails, images, etc.)
- ✍️ Define request structure and preview response
- 🔐 Authenticated user access
- 🎨 Modern responsive UI with theme support
- ☁️ **AWS-hosted** with full scalability & high availability

---

## 🧱 Tech Stack

### 🖥️ Frontend
- React.js + Tailwind CSS
- Form validation + schema input
- Axios for API calls

### 🧠 Backend
- Node.js + Express
- Faker.js for data generation
- MongoDB for storing schemas
- JWT Authentication

### ☁️ DevOps & Deployment
- AWS VPC with:
  - Public Subnet → ALB
  - Private Subnet → EC2 (Frontend & Backend)
  - Isolated Subnet → MongoDB on EC2
- Auto Scaling Group (ASG) for backend
- NAT Gateway, Bastion Host
- Security Groups
- Infrastructure as Code using **Terraform**

---


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/saimon4u/FakeItApi.git
cd FakeItApi
```

### 2. Install frontend & backend dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

```
### 3. Set up environment variables
Create a **.env** file in the backend directory and add the following:
```bash
MONGO_URI=
PORT=
JWT_SECRET=
SALT=
```
### 4. Run the app
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```
## ☁️ Infrastructure Overview

Chatty is deployed with a production-grade AWS architecture designed for **high availability**, **security**, and **scalability**.

### 🏗️ Architecture Highlights

- **VPC with 3-tier architecture:**
  - 🟢 **Public Subnet** → Application Load Balancer (ALB)
  - 🟡 **Private Subnet** → EC2 instances running Frontend & Backend
  - 🔴 **Isolated Subnet** → EC2 instance hosting MongoDB (no internet access)

- **Application Load Balancer (ALB)**  
  - Routes traffic to frontend and backend services

- **Auto Scaling Group (ASG)**  
  - Ensures backend EC2 instances scale dynamically based on load

- **Bastion Host**  
  - Provides secure SSH access to private EC2 instances via the public subnet

- **NAT Gateway**  
  - Allows instances in private subnets to access the internet for updates, etc.

- **Security Groups**  
  - Fine-grained control of traffic between subnets and services

---

✅ **Built for:**
- High availability
- Network isolation & security
- Auto scalability & reliability
- Infrastructure as Code (Terraform)

---

## 🧪 Future Improvements

- 📤 Add export/share functionality for generated APIs
- 🧩 Add support for multiple endpoints per schema
- ⚙️ Integrate **CI/CD pipeline** using:
  - GitHub Actions
  - Amazon S3 (for static assets)
  - Amazon ECS or EKS (for container orchestration)

## 🧑‍💻 Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

## 👨‍💻 Developed  by Saimon Bhuiyan
