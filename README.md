# Hostel Management System

A comprehensive hostel management system built with Node.js, Express, React, and MongoDB.

## ��� Features

- **Admin Management**: Complete admin panel for managing the hostel
- **Student Registration**: Student registration and profile management
- **Room Management**: Room allocation and status tracking
- **Authentication**: Secure JWT-based authentication
- **Real-time Updates**: Live updates for room and student status
- **Responsive Design**: Mobile-friendly interface

## ���️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Helmet for security
- Rate limiting
- Input validation and sanitization

### Frontend
- React 18
- React Router
- Axios for API calls
- React Toastify for notifications
- CSS3 for styling

## ��� Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## ��� Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Hostel_management-main
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:
```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/hostel_management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Application Configuration
NODE_ENV=development
PORT=3500

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Email Configuration (if using nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 4. Frontend Setup
```bash
cd frontend
npm install
```

### 5. Frontend Environment Configuration
Create a `.env` file in the frontend directory:
```env
# API Configuration
VITE_API_URL=http://localhost:3500

# For production, change to your deployed backend URL
# VITE_API_URL=https://your-backend-url.vercel.app
```

## ��� Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:3500`

2. **Start the Frontend Development Server**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**
```bash
cd frontend
npm run build
```

2. **Start the Backend**
```bash
cd backend
npm start
```

## ��� Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Server-side validation and sanitization
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Proper cross-origin resource sharing
- **Helmet**: Security headers for Express
- **Error Handling**: Comprehensive error handling and logging

## ��� Project Structure

```
Hostel_management-main/
├── backend/
│   ├── config/
│   │   └── DBConnect.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── roomController.js
│   │   └── studentController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── adminModel.js
│   │   ├── roomModel.js
│   │   └── studentModel.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── room.js
│   │   └── student.js
│   ├── utils/
│   │   ├── generateUniqueId.js
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── Component/
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── context/
│   │   └── App.jsx
│   ├── .env
│   └── package.json
└── README.md
```

## ��� API Endpoints

### Authentication
- `POST /admin/register` - Admin registration
- `POST /admin/login` - Admin login
- `POST /admin/logout` - Admin logout

### Students
- `POST /students/registerStudent` - Student registration
- `GET /students/` - Get all students (Admin only)
- `GET /students/:id` - Get student by ID
- `PATCH /students/:id` - Update student profile
- `DELETE /students/delete-student/:id` - Delete student (Admin only)

### Rooms
- `POST /room/create-room` - Create new room (Admin only)
- `GET /room/get-all-room` - Get all rooms
- `GET /room/get-single-room/:id` - Get room by ID
- `PATCH /room/update-room/:id` - Update room (Admin only)
- `DELETE /room/delete-room/:id` - Delete room (Admin only)

## ��� Security Considerations

1. **Change Default JWT Secret**: Always use a strong, unique JWT secret in production
2. **Database Security**: Use MongoDB authentication and network security
3. **HTTPS**: Always use HTTPS in production
4. **Environment Variables**: Never commit sensitive data to version control
5. **Regular Updates**: Keep dependencies updated for security patches

## ��� Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGO_URI in your .env file
   - Verify network connectivity

2. **CORS Errors**
   - Check FRONTEND_URL in backend .env
   - Verify VITE_API_URL in frontend .env

3. **Authentication Issues**
   - Ensure JWT_SECRET is set
   - Check token expiration
   - Verify user permissions

## ��� License

This project is licensed under the ISC License.

## ��� Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## ��� Support

For support, please open an issue in the repository or contact the development team.

---

**Note**: This application has been updated with security fixes and improvements. Make sure to update your environment variables and dependencies as specified in this README.
