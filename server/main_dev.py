from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView

load_dotenv()

from core import routes
try:
    from core.sio import sio
except ModuleNotFoundError:
    pass
from core.schema import schema

build_path=join(dirname(__file__), '..', 'frontend', 'build')
app = Flask(__name__, static_url_path='', static_folder=build_path, template_folder=build_path)
CORS(app)
app.register_blueprint(routes.bp)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

sio.init_app(app)

if __name__ == '__main__':
    # development server
    sio.run(app, host='localhost', port=8080, debug=True)