from flask import Flask

from .models import db, ensure_tables
from .routes import register_routes


def create_app() -> Flask:
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dating_app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # Initialize the database with the app
    db.init_app(app)
    # Register API routes
    register_routes(app)
    # Create tables if they don't exist
    with app.app_context():
        ensure_tables()
    return app


if __name__ == '__main__':
    application = create_app()
    application.run(host='0.0.0.0', port=5000)
