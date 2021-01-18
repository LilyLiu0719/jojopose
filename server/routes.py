from flask import Blueprint, render_template

bp = Blueprint('routes', __name__, '/api')

@bp.route('/')
def root():
    return render_template('index.html')
