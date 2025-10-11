from flask import Flask
from flask_cors import CORS
from models import db
from routes import api
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    
    # Configure CORS with specific settings
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})
    
    # Register blueprints
    app.register_blueprint(api, url_prefix='/api')
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)