from os.path import join, dirname

from flask import Flask
import routes
from sio import sio

build_path=join(dirname(__file__), '..', 'frontend', 'build')
app = Flask(__name__, static_url_path='', static_folder=build_path, template_folder=build_path)
app.register_blueprint(routes.bp)

sio.init_app(app)

if __name__ == '__main__':
    # development server
    sio.run(app, host='0.0.0.0', port=8080, debug=True)