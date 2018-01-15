from flask import Flask
from flask import render_template, session, request
from passlib.hash import pbkdf2_sha256
import os
import json
from localsettings import DEBUG, PASSWORD_HASH, SECRET_KEY


app = Flask(__name__)
app.secret_key = os.urandom(12)


@app.context_processor
def static_path_processor():
    if DEBUG:
        css_path = 'app.css'
        js_path = 'app.js'
    else:
        dir_path = os.path.dirname(os.path.realpath(__file__))
        manifest_path = dir_path + "/static/build/manifest.json"

        with open(manifest_path) as data:
            data = json.load(data)
            css_path = "build/" + data['app.css']
            js_path = "build/" + data['app.js']

    return {
        'css_path': css_path,
        'js_path': js_path,
    }


@app.route('/')
def index():
    if session.get('is_authenticated'):
        return render_template('home.html')
    else:
        return render_template('login.html',
            authentication_error=session.get('authentication_error'),
            show_login=request.args.get('show_login'))


@app.route('/login', methods=['POST'])
def login():
    if pbkdf2_sha256.verify(request.form['password'], PASSWORD_HASH):
        session['is_authenticated'] = True
        session['authentication_error'] = False
    else:
        session['authentication_error'] = True

    return index()


@app.route("/logout")
def logout():
    session['is_authenticated'] = False
    session['authentication_error'] = False

    return index()


if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0')
