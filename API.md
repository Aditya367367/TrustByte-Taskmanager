# TrustByte Task Manager API Documentation

This API powers the TrustByte Task Manager app.  
All endpoints are prefixed with `/api`.

---

## Authentication

### Register a New User

**POST** `/api/auth/signup`

**Body:**
```json
{
  "name": "Aditya Chauhan",
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "msg": "User registered successfully",
  "user": {
    "name": "Aditya Chauhan",
    "email": "user@example.com"
  }
}
```

---

### Login

**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "name": "Aditya Chauhan",
    "email": "user@example.com"
  }
}
```

---

### Get Current User

**GET** `/api/auth/me`  
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "_id": "...",
  "name": "Aditya Chauhan",
  "email": "user@example.com",
  "bio": "",
  "profileImage": "",
  "dateOfBirth": null,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### Update Profile

**PUT** `/api/auth/profile`  
**Headers:** `Authorization: Bearer <token>`  
**Form Data:**  
- `name` (string)
- `bio` (string, optional)
- `dateOfBirth` (date, optional)
- `profileImage` (file, optional)

**Response:**
```json
{
  "msg": "Profile updated successfully",
  "user": { ... }
}
```

---

## Tasks

### Get All Tasks

**GET** `/api/tasks`  
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "...",
    "title": "Task title",
    "description": "Task description",
    "image": "/uploads/filename.png",
    "completed": false,
    "user": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

### Create a Task

**POST** `/api/tasks`  
**Headers:** `Authorization: Bearer <token>`  
**Form Data:**  
- `title` (string, required)
- `description` (string, optional)
- `image` (file, optional)

**Response:**
```json
{
  "_id": "...",
  "title": "Task title",
  "description": "Task description",
  "image": "/uploads/filename.png",
  "completed": false,
  "user": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### Update a Task

**PUT** `/api/tasks/:id`  
**Headers:** `Authorization: Bearer <token>`  
**Body:**  
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

**Response:**
```json
{
  "_id": "...",
  "title": "Updated title",
  "description": "Updated description",
  "image": "/uploads/filename.png",
  "completed": true,
  "user": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### Delete a Task

**DELETE** `/api/tasks/:id`  
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{ "msg": "Task deleted" }
```

---

## Testimonials

### Get Testimonials

**GET** `/api/testimonials`

**Query Params (optional):**
- `page` (number)
- `limit` (number)

**Response:**
```json
{
  "testimonials": [
    {
      "_id": "...",
      "user": { "name": "Aditya", "profileImage": "/uploads/..." },
      "text": "Great app!",
      "rating": 5,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "currentPage": 1,
  "totalPages": 1,
  "totalTestimonials": 1
}
```

---

### Add Testimonial

**POST** `/api/testimonials`  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "text": "Your testimonial",
  "rating": 5
}
```

**Response:**
```json
{
  "_id": "...",
  "user": { "name": "Aditya", "profileImage": "/uploads/..." },
  "text": "Your testimonial",
  "rating": 5,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### Update Testimonial

**PUT** `/api/testimonials/:id`  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "text": "Updated testimonial",
  "rating": 4
}
```

**Response:**
```json
{
  "_id": "...",
  "user": { "name": "Aditya", "profileImage": "/uploads/..." },
  "text": "Updated testimonial",
  "rating": 4,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### Delete Testimonial

**DELETE** `/api/testimonials/:id`  
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{ "msg": "Testimonial removed successfully" }
```

---

## Image Access

- Uploaded images are available at:  
  `http://localhost:4000/uploads/<filename>`

---

## Error Responses

All error responses are in the form:
```json
{ "msg": "Error message" }
```
or
```json
{ "error": "Error message" }
```

---

## Auth

- All protected routes require a JWT token in the `Authorization` header:  
  `Authorization: Bearer <token>`

---

## Author

Made by
