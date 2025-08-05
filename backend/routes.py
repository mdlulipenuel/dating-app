from flask import Flask, jsonify, request
from flask_cors import CORS
from typing import Optional, List
from .models import db, User, Like, Match, Message
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import and_, or_


def register_routes(app: Flask) -> None:
    CORS(app, resources={r"/*": {"origins": "*"}})

    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json() or {}
        required = ['username','password','name','age','gender']
        missing = [f for f in required if f not in data]
        if missing:
            return jsonify({'error': f"Missing fields: {', '.join(missing)}"}), 400
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
        try:
            age = int(data['age'])
        except ValueError:
            return jsonify({'error': 'Age must be integer'}), 400
        user = User(
            username=data['username'],
            password_hash=generate_password_hash(data['password']),
            name=data['name'],
            age=age,
            gender=data['gender'],
            interests=data.get('interests'),
            bio=data.get('bio'),
            location=data.get('location'),
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'Registration successful', 'user_id': user.id}), 201

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json() or {}
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return jsonify({'error': 'Username and password required'}), 400
        user: Optional[User] = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid credentials'}), 401
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200

    @app.route('/profiles/<int:user_id>', methods=['GET'])
    def get_profiles(user_id: int):
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        others = User.query.filter(User.id != user_id).all()
        return jsonify({'profiles': [u.to_dict() for u in others]}), 200

    def has_match(u1: int, u2: int) -> bool:
        return Match.query.filter(
            or_(and_(Match.user1_id == u1, Match.user2_id == u2),
                and_(Match.user1_id == u2, Match.user2_id == u1))
        ).first() is not None

    @app.route('/like', methods=['POST'])
    def like_user():
        data = request.get_json() or {}
        try:
            user_id = int(data['user_id'])
            target_id = int(data['target_id'])
        except (KeyError, ValueError):
            return jsonify({'error': 'user_id and target_id required as integers'}), 400
        if user_id == target_id:
            return jsonify({'error': 'Cannot like yourself'}), 400
        user = User.query.get(user_id)
        target = User.query.get(target_id)
        if not user or not target:
            return jsonify({'error': 'User not found'}), 404
        if Like.query.filter_by(user_id=user_id, target_id=target_id).first():
            return jsonify({'message': 'Already liked'}), 200
        like = Like(user_id=user_id, target_id=target_id)
        db.session.add(like)
        reciprocal = Like.query.filter_by(user_id=target_id, target_id=user_id).first()
        match_created = False
        if reciprocal and not has_match(user_id, target_id):
            match = Match(user1_id=min(user_id,target_id), user2_id=max(user_id,target_id))
            db.session.add(match)
            match_created = True
        db.session.commit()
        return jsonify({'message': 'Like recorded', 'match': match_created}), 201

    @app.route('/matches/<int:user_id>', methods=['GET'])
    def get_matches(user_id: int):
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        matches = Match.query.filter(or_(Match.user1_id == user_id, Match.user2_id == user_id)).all()
        match_ids = [m.user2_id if m.user1_id == user_id else m.user1_id for m in matches]
        matched_users = User.query.filter(User.id.in_(match_ids)).all() if match_ids else []
        return jsonify({'matches': [u.to_dict() for u in matched_users]}), 200

    @app.route('/messages/<int:user_id>/<int:target_id>', methods=['GET', 'POST'])
    def messages(user_id: int, target_id: int):
        user = User.query.get(user_id)
        target = User.query.get(target_id)
        if not user or not target:
            return jsonify({'error': 'User not found'}), 404
        if request.method == 'POST':
            data = request.get_json() or {}
            content = data.get('content')
            if not content:
                return jsonify({'error': 'Content required'}), 400
            msg = Message(sender_id=user_id, receiver_id=target_id, content=content)
            db.session.add(msg)
            db.session.commit()
            return jsonify({'message': 'Message sent'}), 201
        msgs = Message.query.filter(
            or_(and_(Message.sender_id==user_id, Message.receiver_id==target_id),
                and_(Message.sender_id==target_id, Message.receiver_id==user_id))
        ).order_by(Message.timestamp).all()
        return jsonify({'messages': [
            {
                'id': m.id,
                'sender_id': m.sender_id,
                'receiver_id': m.receiver_id,
                'content': m.content,
                'timestamp': m.timestamp.isoformat(),
            } for m in msgs
        ]}), 200

    @app.route('/')
    def index():
        return 'Welcome to the Dating App API.'
