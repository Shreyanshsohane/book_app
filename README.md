
# Peer-to-Peer Book Exchange Portal

A full-stack web application that connects two types of users – **Book Owners** and **Book Seekers** – to facilitate the sharing, renting, or exchanging of books. This project features advanced authentication (with password encryption and JWT-based login), image handling through Cloudinary SDK, dynamic search and filter capabilities, and a robust MongoDB backend.

# Project Overview

This project is a peer-to-peer book exchange portal where:

- **Book Owners** can create an account and list books they wish to give away or rent.
- **Book Seekers** can browse available listings using powerful search and filter features.

While the original assignment specification outlines very basic authentication, this implementation enhances the experience by incorporating advanced features such as:
- **Storing passwords with encryption** for added security using bcrypt.
- **JWT tokens** for secure login sessions.
- **Uploading book cover images to Cloudinary** via Cloudinary SDK.
- **Advanced search and filtering** for improved discoverability.
- **Express & Node.js** backend for API handling.
- **MongoDB** as a scalable NoSQL backend database.

## Features

### User Profiles
- **Two Types of Users:**  
  - **Book Owner:** Can list and manage books.
  - **Book Seeker:** Can browse and search listings.
- **Profile Details:**
  - Name
  - Mobile Number
  - Email
  - Encrypted Password
  - Role (Owner or Seeker)

### Book Listings
- **For Book Owners:**  
  - Create listings with title, author, genre (optional), city/location, and contact info.
  - Upload book cover images using Cloudinary SDK.
  - Edit or delete existing listings.
- **For Book Seekers:**  
  - Browse listings with intuitive UI.
  - Search and filter by title, genre, or location.

### Authentication & Authorization
- **JWT-based login system** for secure sessions.
- **Password encryption** using bcrypt to store user credentials securely.
- **Role-based redirection** to send users to the appropriate dashboard post-login.

### Image Handling
- **Cloudinary Integration (via SDK):**  
  - Upload book images easily.
  - Image URLs are stored in MongoDB with the listing.

### Search & Filter
- Full-text search based on title and location.
- Genre-based filtering to refine results.

## Tech Stack

- **Frontend:** React & Next.js
- **Backend:** Node.js with Express
- **Database:** MongoDB (using Mongoose)
- **Authentication:** JWT + bcrypt
- **Cloud Storage:** Cloudinary SDK
- **Deployment:**  
  - Frontend: Render  
  - Backend: Render


## Bonus Features & Future Improvements

- ✅ Owners can edit/delete listings.
- ✅ Cloudinary SDK used for image upload.
- ✅ Secure auth with JWT and bcrypt.
- ✅ Search and filter with multiple criteria.
- ✅ Responsive layout and UI polish.
- 🟡 Future: CI/CD pipeline for automatic deployment.
- 🟡 Future: Role-specific dashboards.
- 🟡 Future: Push notifications for listing updates.

## Acknowledgements

- Thanks to the open-source community and AI tools used during development.
- Built as an extended version of a Peer-to-Peer Book Exchange Portal assignment.
