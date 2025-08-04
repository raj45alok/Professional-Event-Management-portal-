# Professional  Event Management  Portal

A full-stack event management platform that allows organizers to create, customize, and showcase their professional events with dynamic templates, media integration, and AWS-backed image storage.

---

## 🚀 Features

### 🔧 Event Creation
- Multi-step form for creating events.
- Upload banner image, agenda, speakers, videos, and contact info.
- Dynamic confirmation for each step.
- Supports both **classic** and **modern** templates.

### 🎨 Dynamic Templates
- **Classic Template**: Elegant layout with sepia-toned hero image.
- **Modern Template**: Sleek, colorful layout with sticky navbar and embedded video support.

### 📦 Media Support
- Uploads banner and speaker/partner images to **Amazon S3**.
- Supports speaker images, partner logos, and YouTube video embeds.

### 🗃️ AWS Lambda + DynamoDB
- Event summaries stored in `EventTable`.
- Full event details stored in `EventDetailsTable`.
- Images are stored securely in **S3**, and links are used dynamically.

### 🔍 Manage Events
- Search and filter events by organizer, date, and keywords.
- View upcoming events with banners and metadata.

### 🛡️ Secure Data Handling
- `.env` used for secrets (excluded from Git).
- Uses base64 encoding for image uploads.

---

## 📁 Folder Structure (Client Side)
event-portal/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ ├── assets/
│ ├── App.jsx
│ └── main.jsx
├── .env (excluded from Git)
├── .gitignore
├── package.json
├── README.md
└── vite.config.js


---

## 🧪 Technologies Used

### Frontend
- React + Vite
-  CSS 
- React Router
- Date Picker
- HTML5 File Upload APIs

### Backend (Serverless)
- AWS Lambda (Node.js)
- DynamoDB (Event summary and full event data)
- Amazon S3 (for storing banner and speaker images)
- Mongo DB
---

## 🌍 Environment Variables (`.env`)

> ⚠️ **DO NOT COMMIT THIS FILE** — It's listed in `.gitignore`.
> 
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
VITE_API_BASE_URL=https://your-api-url
VITE_S3_IMAGE_URL=https://your-s3-bucket.s3.amazonaws.com



---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/event-portal.git
cd event-portal

2. Install Dependencies
npm install
3. Add .env File
Create a .env file in the root directory with the following:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
VITE_API_BASE_URL=https://your-api-url
VITE_S3_IMAGE_URL=https://your-s3-bucket.s3.amazonaws.com

4. Start the App
npm run dev
 Debugging Notes
✅ Ensure S3 bucket policy allows public GET access to uploaded images.

✅ Lambda must correctly parse base64 images and return proper S3 URLs.

✅ Event image key must be populated in both summary and detail tables.

🚧 Future Improvements
User authentication (JWT)

Attendee registration system

Admin dashboard with analytics

RSVP and email reminders

📄 License
MIT License — open for educational and commercial use.

🙌 Acknowledgements
AWS (Lambda, S3, DynamoDB)

React + Vite + Tailwind ecosystem

Helpful guidance from the open source community

👨‍💻 Author
Alok Raj
📧 rajalok10375@gmail.com



---

✅ After pasting and saving this as `README.md`, run:

```bash
git add README.md
git commit -m "Add full project README"
git push






