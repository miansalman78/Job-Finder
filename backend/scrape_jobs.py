import random
from datetime import datetime, timedelta
import sys
import os

# Add the current directory to the path so that we can import the models
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import db, Job
from app import create_app

# Job titles and companies
job_titles = [
    "Software Engineer", "Web Developer", "Data Scientist", "UI/UX Designer",
    "Product Manager", "DevOps Engineer", "Full Stack Developer", "Frontend Developer",
    "Backend Developer", "Mobile App Developer", "Machine Learning Engineer",
    "QA Engineer", "Database Administrator", "Systems Analyst", "IT Project Manager"
]

companies = [
    "Tech Solutions Inc.", "Digital Innovations", "Data Systems", "Web Creators",
    "Software House", "Tech Giants", "Cloud Solutions", "Mobile Tech",
    "AI Innovations", "Cyber Security Solutions", "Digital Marketing Agency",
    "E-commerce Solutions", "FinTech Innovations", "Health Tech", "EdTech Solutions"
]

locations = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", 
    "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
]

job_types = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]

skills_list = [
    "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Swift",
    "React", "Angular", "Vue.js", "Node.js", "Django", "Flask", "Spring Boot",
    "SQL", "MongoDB", "Firebase", "AWS", "Azure", "Docker", "Kubernetes",
    "Git", "TensorFlow", "PyTorch", "Figma", "Adobe XD", "Sketch"
]

def generate_random_date(start_date, end_date):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    return start_date + timedelta(days=random_number_of_days)

def generate_random_salary():
    min_salary = random.randint(30, 80) * 1000
    max_salary = min_salary + random.randint(10, 50) * 1000
    return f"{min_salary}-{max_salary}"

def generate_random_skills():
    num_skills = random.randint(3, 8)
    return random.sample(skills_list, num_skills)

def generate_job_description(title, skills):
    descriptions = [
        f"We are looking for a talented {title} to join our team. The ideal candidate should have experience with {', '.join(skills[:-1])} and {skills[-1]}.",
        f"Exciting opportunity for a {title} with expertise in {', '.join(skills[:-1])} and {skills[-1]}. Join our growing team!",
        f"Are you a {title} passionate about {skills[0]} and {skills[1]}? We want you on our team!",
        f"Join our innovative team as a {title}. Must have strong skills in {', '.join(skills[:3])}.",
        f"We're hiring a {title} with experience in {', '.join(skills[:4])}. Great opportunity for career growth!"
    ]
    return random.choice(descriptions)

def scrape_and_add_jobs(num_jobs=10):
    print(f"Starting to scrape and add {num_jobs} jobs...")
    
    # Create app context
    app = create_app()
    
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    
    jobs_added = 0
    
    with app.app_context():
        # Clear existing jobs if needed
        # Job.query.delete()
        # db.session.commit()
        
        for _ in range(num_jobs):
            title = random.choice(job_titles)
            company = random.choice(companies)
            location = random.choice(locations)
            job_type = random.choice(job_types)
            skills = generate_random_skills()
            
            new_job = Job(
                title=title,
                company=company,
                location=location,
                job_type=job_type,
                posting_date=generate_random_date(start_date, end_date),
                tags=", ".join(skills)
            )
            
            db.session.add(new_job)
            jobs_added += 1
            
        db.session.commit()
        print(f"Successfully added {jobs_added} jobs to the database!")

if __name__ == "__main__":
    # Get number of jobs to add from command line argument, default to 10
    num_jobs = 10
    if len(sys.argv) > 1:
        try:
            num_jobs = int(sys.argv[1])
        except ValueError:
            print("Invalid number of jobs. Using default (10).")
    
    scrape_and_add_jobs(num_jobs)