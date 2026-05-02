# 🎂 The Waffle Pastry - Cake 'N' Pastry

A premium, full-stack e-commerce platform for a gourmet bakery. Built with a modern aesthetic, smooth animations, and a robust management dashboard.

![Bakery Aesthetic](https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)

## 🚀 Features

- **Premium Design**: Warm, homemade bakery aesthetic using a curated color palette (#F5D6D6, #4A2C2A, #E07A5F).
- **Dynamic Shop**: Category-based filtering for Cakes, Waffles, and Pastries.
- **Admin Dashboard**: Secure management system to add, edit, or delete menu items and update prices in real-time.
- **Full-Stack Integration**: 
  - **Payments**: Integrated with Razorpay for secure Indian transactions.
  - **Images**: Cloudinary integration for professional image hosting.
  - **Database**: MongoDB Atlas for persistent storage.
- **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.

---

## 🏗️ Architecture & Flow

### Frontend (Client)
- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS for high-performance, utility-first design.
- **State Management**: React Context API (`AuthContext`, `CartContext`).
- **Animations**: Framer Motion for premium, smooth transitions.

### Backend (Server)
- **Framework**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM.
- **Security**: JWT (JSON Web Tokens) for secure authentication and Admin-only route protection.
- **API**: Modular MVC (Model-View-Controller) structure.

### System Flow
1. **User Flow**: Browse -> Add to Cart -> Secure Checkout (Razorpay) -> Order Confirmation.
2. **Admin Flow**: Secure Login -> AdminGuard Protection -> CRUD operations on Products via API.

---

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas Account
- Razorpay & Cloudinary API Keys

### 2. Clone and Install
```bash
# Clone the repository
git clone https://github.com/Muthu1828/The-Waffle-Pastry.git

# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4. Running the Project
```bash
# Start Backend (from /server)
npm run dev

# Start Frontend (from /client)
npm run dev
```

---

## 🔒 Security
- **Frontend Guard**: `AdminGuard` component prevents unauthorized access to the management dashboard.
- **Backend Guard**: JWT middleware verifies user roles before allowing data mutations.

## 📄 License
This project is for personal/commercial use by **The Waffle Pastry**.

---
*Crafted with ❤️ by Muthu1828*
