from flask import Flask
from flask import render_template, session, request, redirect
from functools import wraps
from passlib.hash import pbkdf2_sha256
import os
import json
from localsettings import DEBUG, PASSWORD_HASH
from stuff_to_do_data import STUFF_TO_DO


app = Flask(__name__)
app.secret_key = os.urandom(12)


# context processors and decorators
# ------------------------------------------------------------------------------

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


def login_required(f):
    @wraps(f)

    def decorated_function(*args, **kwargs):
        if not DEBUG and not session.get('is_authenticated'):
            return redirect('/')

        return f(*args, **kwargs)

    return decorated_function


# pages
# ------------------------------------------------------------------------------

@app.route('/')
def index():
    if session.get('is_authenticated'):
        return redirect('/home')
    else:
        return render_template('login.html',
            authentication_error=session.get('authentication_error'),
            show_login=request.args.get('show_login'))


@app.route('/login', methods=['POST'])
def login():
    if pbkdf2_sha256.verify(request.form['password'], PASSWORD_HASH):
        session['is_authenticated'] = True
        session['authentication_error'] = False
        return redirect('/home')
    else:
        session['authentication_error'] = True
        return redirect('/')


@app.route("/logout")
def logout():
    session['is_authenticated'] = False
    session['authentication_error'] = False

    return redirect('/')


@app.route('/home')
@login_required
def home():
    return render_template('home.html')


@app.route('/location')
@login_required
def location():
    return render_template('location.html')


@app.route('/schedule')
@login_required
def schedule():
    return render_template('schedule.html')


@app.route('/hotels')
@login_required
def hotels():
    return render_template('hotels.html')


@app.route('/stuff-to-do')
@login_required
def stuff_to_do():
    return render_template('stuff_to_do.html', stuff_to_do=STUFF_TO_DO)


@app.route('/gifts')
@login_required
def gifts():
    return render_template('gifts.html')


@app.route('/contact')
@login_required
def contact():
    return render_template('contact.html')


if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0')
