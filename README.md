# Workshop 05 - Building a REST API with Express and MongoDB

This project is part of Laurea's Full Stack Development course.  
The goal of this workshop is to build a fully functional **REST API** to handle blog postings. 

## Topics Covered
- Express.js routing for API endpoints
- MongoDB & Mongoose schema design
- CRUD operations (Create, Read, Update, Delete)
- HTTP status codes and REST conventions
- Mongoose validation
- Error handling middleware (404 & 500)
- Using Postman / curl to test API endpoints
- Server startup and logging

## Features
The REST API supports:
- Creating new blog posts
- Fetching all posts
- Fetching a single post by ID
- Updating an existing post
- Deleting a post
- Validating MongoDB ObjectIds
- Returning proper HTTP status codes
- Custom 404 and 500 error pages
- Organized routing using Express Router

## server.js Task (`connectToDatabase`)
In `server.js`, the `connectToDatabase` function was completed so that the application establishes a MongoDB connection before starting the server. The server only begins listening on the defined port after a successful database connection, ensuring proper startup flow and preventing the app from running without database access.


## Model Task (`models/Post.js`)
In the model task, students must complete the `postSchema` definition for MongoDB using Mongoose. Define the post fields (`title`, `content`, `author`) with suitable validation rules (for example: `String`, `required: true`, and `trim: true`). Keep `timestamps: true` enabled so each document gets `createdAt` and `updatedAt` automatically. When this model is complete, the API routes can use it for create/read/update/delete operations and validation errors will be returned correctly during `POST` and `PUT` requests.

In this task, the `postSchema` in `models/Post.js` was completed so that MongoDB documents can be created, validated, and managed through Mongoose. The schema defines the required fields for a blog post:

- `title` — String, required, trimmed  
- `content` — String, required, trimmed  
- `author` — String, required, trimmed  

The schema also keeps `timestamps: true` enabled so each document automatically receives `createdAt` and `updatedAt` fields. Once this model was implemented, all API routes (POST, GET, PUT, DELETE) were able to use it for database operations, and validation errors were correctly returned during `POST` and `PUT` requests.

## Browser Routes
- `GET /`
   - Purpose: Serve the home page (`index.html`).
   - Source file: `routes/pages.js`
   - Expected result: HTTP `200` + HTML page.

- `GET /about`
   - Purpose: Serve the about page (`about.html`).
   - Source file: `routes/pages.js`
   - Expected result: HTTP `200` + HTML page.

- `GET /contact`
   - Purpose: Serve the contact page (`contact.html`).
   - Source file: `routes/pages.js`
   - Expected result: HTTP `200` + HTML page.

- `GET /blog`
   - Purpose: Serve the blog page (`blog.html`) where API usage is demonstrated.
   - Source file: `routes/pages.js`
   - Expected result: HTTP `200` + HTML page.

If a browser route does not match any page route, the app should return your `404.html` file.

## API Routes
- `POST /api/posts`
   - Purpose: Create a new blog post document in MongoDB.
   - Request body: JSON with `title`, `content`, `author`.
   - Success: HTTP `201` + created post JSON.
   - Common errors: HTTP `400` for validation errors.

- `GET /api/posts`
   - Purpose: Fetch all posts.
   - Success: HTTP `200` + JSON array of posts.

- `GET /api/posts/:id`
   - Purpose: Fetch one post by MongoDB ObjectId.
   - Success: HTTP `200` + post JSON.
   - Common errors:
      - HTTP `400` when `:id` is not a valid ObjectId format.
      - HTTP `404` when no post exists with that id.

- `PUT /api/posts/:id`
   - Purpose: Replace/update one post by id.
   - Request body: full post fields (`title`, `content`, `author`).
   - Success: HTTP `200` + updated post JSON.
   - Common errors:
      - HTTP `400` invalid id or validation error.
      - HTTP `404` post not found.

- `DELETE /api/posts/:id`
   - Purpose: Remove one post by id.
   - Success: HTTP `200` + success message JSON.
   - Common errors:
      - HTTP `400` invalid id.
      - HTTP `404` post not found.
