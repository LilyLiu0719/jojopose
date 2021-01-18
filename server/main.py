from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask
from flask_graphql import GraphQLView

load_dotenv()

from core import routes
from core.sio import sio
from core.schema import schema

build_path=join(dirname(__file__), '..', 'frontend', 'build')
app = Flask(__name__, static_url_path='', static_folder=build_path, template_folder=build_path)
app.register_blueprint(routes.bp)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=False))

sio.init_app(app)

if __name__ == '__main__':
    # development server
    sio.run(app, host='0.0.0.0', port=8080, debug=True)