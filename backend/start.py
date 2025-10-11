"""
Startup script for the Job Listing backend
This script initializes the database, populates it with sample data, and starts the Flask server
"""
import os
import subprocess
import sys
import time

def setup_database():
    """Initialize the database and create tables"""
    print("Setting up database...")
    try:
        from app import app, db
        with app.app_context():
            db.create_all()
            print("Database tables created successfully!")
        return True
    except Exception as e:
        print(f"Error setting up database: {e}")
        return False

def populate_sample_data():
    """Populate the database with sample job listings"""
    print("Populating database with sample data...")
    try:
        subprocess.run([sys.executable, "scrape_jobs.py"], check=True)
        print("Sample data added successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error populating database: {e}")
        return False

def start_flask_server():
    """Start the Flask development server"""
    print("Starting Flask server...")
    try:
        # Set Flask environment variables
        os.environ["FLASK_APP"] = "app.py"
        os.environ["FLASK_ENV"] = "development"
        
        # Run Flask
        subprocess.run(["flask", "run", "--host=0.0.0.0"], check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error starting Flask server: {e}")
        return False
    except KeyboardInterrupt:
        print("\nServer stopped by user")
        return True

if __name__ == "__main__":
    print("=" * 50)
    print("Job Listing Backend - Startup Script")
    print("=" * 50)
    
    # Setup database
    if not setup_database():
        sys.exit(1)
    
    # Populate with sample data
    if not populate_sample_data():
        choice = input("Failed to add sample data. Continue anyway? (y/n): ")
        if choice.lower() != 'y':
            sys.exit(1)
    
    # Start Flask server
    print("\nBackend API will be available at http://localhost:5000")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    time.sleep(1)
    
    start_flask_server()