from flask import Flask
from . import views
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    # @app.route('/try', methods=['GET', 'POST'])
    #  def list_users():
    #     return "user example"
    # app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'

    @app.route('/hello', methods=['GET', 'POST'])
    def hello():
        return 'Hello, World!'
    app.register_blueprint(views.bp)
    #app.add_url_rule('/', endpoint='index')
  
    return app