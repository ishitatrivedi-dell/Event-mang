# Event Management Backend API

A production-ready Node.js + Express + MongoDB backend for managing events.

## 🚀 Features

- **RESTful API** with proper HTTP methods and status codes
- **MongoDB Integration** with Mongoose ODM
- **Error Handling** with comprehensive middleware
- **Input Validation** using Mongoose schemas
- **Pagination** for large datasets
- **Search & Filtering** capabilities
- **Business Logic** separation in services layer
- **Production Ready** with environment variables

## 📁 Project Structure

```
Backend/
├── server.js                 # Main server entry point
├── config/
│   └── db.js               # Database configuration
├── models/
│   └── Event.js            # Event data model
├── controllers/
│   └── eventController.js   # Event business logic
├── routes/
│   └── eventRoutes.js      # API endpoints
├── services/
│   └── eventService.js     # Complex operations
├── middlewares/
│   └── errorMiddleware.js # Error handling
├── utils/
│   └── helpers.js          # Utility functions
└── package.json
```

## 🛠️ Installation

1. **Install Dependencies**
   ```bash
   npm install express mongoose dotenv
   ```

2. **Environment Variables**
   Create `.env` file in root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/eventmanagement
   PORT=5000
   NODE_ENV=development
   ```

3. **Start Server**
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Events Collection

| Method | Endpoint | Description | Request Body |
|---------|-----------|-------------|--------------|
| POST | `/api/events` | Create new event | Event object |
| GET | `/api/events` | Get all events | Query params for filtering |
| GET | `/api/events/:id` | Get single event | Route param |
| PUT | `/api/events/:id` | Update event | Event object + Route param |
| DELETE | `/api/events/:id` | Delete event | Route param |

## 📝 Request/Response Examples

### Create Event
**POST** `/api/events`

**Request Body:**
```json
{
    "title": "Tech Summit 2024",
    "date": "2024-03-15T10:00:00Z",
    "location": "Conference Center",
    "description": "Annual technology conference",
    "maxAttendees": 500
}
```

**Response (201):**
```json
{
    "success": true,
    "data": {
        "_id": "60f7b3b3b3b3b3b3b3b3b",
        "title": "Tech Summit 2024",
        "date": "2024-03-15T10:00:00Z",
        "location": "Conference Center",
        "description": "Annual technology conference",
        "maxAttendees": 500,
        "currentAttendees": 0,
        "status": "upcoming",
        "createdAt": "2024-01-20T12:00:00Z",
        "updatedAt": "2024-01-20T12:00:00Z"
    },
    "message": "Event created successfully"
}
```

### Get All Events
**GET** `/api/events?page=1&limit=10&status=upcoming`

**Response (200):**
```json
{
    "success": true,
    "count": 2,
    "total": 25,
    "page": 1,
    "pages": 3,
    "data": [
        {
            "_id": "60f7b3b3b3b3b3b3b3b3b",
            "title": "Tech Summit 2024",
            "date": "2024-03-15T10:00:00Z",
            "location": "Conference Center",
            "status": "upcoming"
        }
    ]
}
```

### Get Single Event
**GET** `/api/events/60f7b3b3b3b3b3b3b3b3b`

**Response (200):**
```json
{
    "success": true,
    "data": {
        "_id": "60f7b3b3b3b3b3b3b3b3b",
        "title": "Tech Summit 2024",
        "date": "2024-03-15T10:00:00Z",
        "location": "Conference Center",
        "description": "Annual technology conference",
        "maxAttendees": 500,
        "currentAttendees": 150,
        "status": "upcoming"
    }
}
```

### Update Event
**PUT** `/api/events/60f7b3b3b3b3b3b3b3b3b`

**Request Body:**
```json
{
    "title": "Updated Tech Summit 2024",
    "maxAttendees": 600
}
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "_id": "60f7b3b3b3b3b3b3b3b3b",
        "title": "Updated Tech Summit 2024",
        "date": "2024-03-15T10:00:00Z",
        "location": "Conference Center",
        "maxAttendees": 600,
        "currentAttendees": 150,
        "status": "upcoming"
    },
    "message": "Event updated successfully"
}
```

### Delete Event
**DELETE** `/api/events/60f7b3b3b3b3b3b3b3b3b`

**Response (200):**
```json
{
    "success": true,
    "message": "Event deleted successfully"
}
```

## 🧪 Testing with Postman

### 1. Create Event
- **Method**: POST
- **URL**: `http://localhost:5000/api/events`
- **Headers**: `Content-Type: application/json`
- **Body**: Raw JSON with event data

### 2. Get All Events
- **Method**: GET
- **URL**: `http://localhost:5000/api/events`
- **Query Params** (optional):
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status (upcoming/ongoing/completed/cancelled)

### 3. Get Single Event
- **Method**: GET
- **URL**: `http://localhost:5000/api/events/{event_id}`
- **Replace**: `{event_id}` with actual MongoDB ObjectId

### 4. Update Event
- **Method**: PUT
- **URL**: `http://localhost:5000/api/events/{event_id}`
- **Headers**: `Content-Type: application/json`
- **Body**: Raw JSON with updated fields

### 5. Delete Event
- **Method**: DELETE
- **URL**: `http://localhost:5000/api/events/{event_id}`

## 🔧 Error Responses

### Validation Error (400)
```json
{
    "success": false,
    "message": "Please add a title for the event",
    "error": {
        "name": "ValidationError",
        "message": "Event validation failed"
    }
}
```

### Not Found (404)
```json
{
    "success": false,
    "message": "Event not found"
}
```

### Server Error (500)
```json
{
    "success": false,
    "message": "Server error occurred",
    "error": {
        "name": "Error",
        "message": "Internal server error"
    }
}
```

## 📊 Advanced Features

### Search Events
**GET** `/api/events?keyword=tech&location=nyc&startDate=2024-01-01`

### Pagination
- **Page**: `/api/events?page=2`
- **Limit**: `/api/events?limit=20`

### Status Filtering
- **Upcoming**: `/api/events?status=upcoming`
- **Completed**: `/api/events?status=completed`

## 🎯 Production Considerations

1. **Environment Variables**: Never commit `.env` file to version control
2. **Input Validation**: All inputs are validated against Mongoose schemas
3. **Error Handling**: Comprehensive error handling with proper HTTP status codes
4. **Security**: Basic XSS protection in utility functions
5. **Performance**: Pagination for large datasets, indexed queries
6. **Logging**: Error logging for debugging and monitoring

## 🚀 Deployment Notes

1. **Set NODE_ENV=production** in production
2. **Use MongoDB Atlas** for production database
3. **Add rate limiting** middleware for production
4. **Implement authentication** for real-world applications
5. **Add CORS** configuration for frontend integration

## 📝 Next Steps

1. **User Authentication** - Add user registration/login
2. **File Upload** - Add event images/attachments
3. **Email Notifications** - Send event reminders
4. **Real-time Updates** - WebSocket integration
5. **Admin Dashboard** - Backend admin interface
6. **API Documentation** - Swagger/OpenAPI integration
