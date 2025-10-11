from flask import Blueprint, request, jsonify, render_template_string
from models import db, Job
from datetime import datetime
from sqlalchemy import desc, inspect

api = Blueprint('api', __name__)

@api.route('/database-view', methods=['GET'])
def view_database():
    # Get all jobs from database
    jobs = Job.query.all()
    
    # Create HTML template for displaying database
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Jobs Database Viewer</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2c3e50; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #4CAF50; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            tr:hover { background-color: #ddd; }
        </style>
    </head>
    <body>
        <h1>Jobs Database Contents</h1>
        <table>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Posting Date</th>
                <th>Job Type</th>
                <th>Tags</th>
            </tr>
            {% for job in jobs %}
            <tr>
                <td>{{ job.id }}</td>
                <td>{{ job.title }}</td>
                <td>{{ job.company }}</td>
                <td>{{ job.location }}</td>
                <td>{{ job.posting_date }}</td>
                <td>{{ job.job_type }}</td>
                <td>{{ job.tags }}</td>
            </tr>
            {% endfor %}
        </table>
    </body>
    </html>
    """
    
    return render_template_string(html, jobs=jobs)

@api.route('/jobs', methods=['GET'])
def get_jobs():
    # Get query parameters for filtering
    job_type = request.args.get('job_type')
    location = request.args.get('location')
    sort = request.args.get('sort')
    
    # Start with base query
    query = Job.query
    
    # Apply filters if provided
    if job_type:
        query = query.filter(Job.job_type == job_type)
    if location:
        query = query.filter(Job.location.contains(location))
    
    # Apply sorting
    if sort == 'date_desc':
        query = query.order_by(desc(Job.posting_date))
    elif sort == 'date_asc':
        query = query.order_by(Job.posting_date)
    else:
        # Default sort by newest first
        query = query.order_by(desc(Job.posting_date))
    
    # Execute query and convert to dict
    jobs = [job.to_dict() for job in query.all()]
    
    return jsonify(jobs)

@api.route('/jobs', methods=['POST'])
def create_job():
    data = request.json
    
    # Validate required fields
    required_fields = ['title', 'company', 'location', 'job_type']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Create new job
    new_job = Job(
        title=data['title'],
        company=data['company'],
        location=data['location'],
        job_type=data['job_type'],
        tags=','.join(data.get('tags', [])) if isinstance(data.get('tags'), list) else data.get('tags', ''),
        posting_date=datetime.fromisoformat(data['posting_date']) if 'posting_date' in data else datetime.utcnow()
    )
    
    db.session.add(new_job)
    db.session.commit()
    
    return jsonify(new_job.to_dict()), 201

@api.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({'error': 'Job not found'}), 404
    
    return jsonify(job.to_dict())

@api.route('/jobs/<int:job_id>', methods=['PUT', 'PATCH'])
def update_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({'error': 'Job not found'}), 404
    
    data = request.json
    
    # Update fields if provided
    if 'title' in data:
        job.title = data['title']
    if 'company' in data:
        job.company = data['company']
    if 'location' in data:
        job.location = data['location']
    if 'job_type' in data:
        job.job_type = data['job_type']
    if 'tags' in data:
        job.tags = ','.join(data['tags']) if isinstance(data['tags'], list) else data['tags']
    if 'posting_date' in data:
        job.posting_date = datetime.fromisoformat(data['posting_date'])
    
    db.session.commit()
    
    return jsonify(job.to_dict())

@api.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    job = Job.query.get(job_id)
    if not job:
        return jsonify({'error': 'Job not found'}), 404
    
    db.session.delete(job)
    db.session.commit()
    
    return jsonify({'message': 'Job deleted successfully'}), 200