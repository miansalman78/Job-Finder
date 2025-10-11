# Job Listing Web Application

A full-stack job listing web application with an attractive, modern, and 3D-style UI built using React, Tailwind CSS, Framer Motion, Flask, and SQLAlchemy.

## Features

- **Modern UI**: Clean, interactive, and visually appealing interface with animated job cards, hover effects, and responsive layout
- **Full CRUD Operations**: Create, read, update, and delete job listings
- **Filtering & Sorting**: Filter jobs by title, company, job type, location, and sort by date
- **Responsive Design**: Optimized for both desktop and mobile devices
- **3D Effects & Animations**: Smooth transitions and hover effects using Framer Motion
- **Data Population**: Sample data generator to populate the database

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Framer Motion (for animations/3D transitions)
- Axios (for API requests)

### Backend
- Flask (Python) REST API
- SQLAlchemy ORM
- SQLite/PostgreSQL/MySQL database

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory with the following content:
   ```
   SECRET_KEY=your-secret-key
   DATABASE_URL=sqlite:///jobs.db
   ```

6. Initialize the database:
   ```
   python app.py
   ```

7. Populate the database with sample data:
   ```
   python scrape_jobs.py
   ```

8. Run the Flask server:
   ```
   flask run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The application will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/jobs`: Fetch all jobs (with optional filters)
- `POST /api/jobs`: Add a new job
- `PUT/PATCH /api/jobs/<id>`: Update job details
- `DELETE /api/jobs/<id>`: Delete a job

## Project Structure

```
/
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── routes.py
│   ├── config.py
│   ├── scrape_jobs.py
│   └── requirements.txt
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── JobCard.js
    │   │   ├── JobForm.js
    │   │   ├── FilterBar.js
    │   │   └── Navbar.js
    │   ├── App.js
    │   ├── api.js
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── tailwind.config.js
```

## Limitations and Future Improvements

- Currently using sample data generation instead of actual web scraping
- Authentication and user management could be added
- Job application functionality could be implemented
- Advanced search with more filters and sorting options
- Email notifications for new job postings

## Video Demo

A video demonstration of the application can be found at (https://drive.google.com/file/d/1r7BEfn528j8UX9yyR2jo9TCFo46mAvI8/view?usp=sharing).

## License

MIT
