from datetime import datetime
from functools import wraps
import json
import os

from flask import (
    Flask, jsonify, render_template, session, request, redirect, url_for
)
from flask_mail import Mail, Message
from passlib.hash import pbkdf2_sha256

from helpers import format_rsvp_field, get_valid_filename
from localsettings import (
    DEBUG, PASSWORD_HASH, EMAIL_SERVER, EMAIL_PORT, EMAIL_USE_TLS,
    EMAIL_USE_SSL, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_RECIPIENT
)
from stuff_to_do_data import STUFF_TO_DO


app = Flask(__name__)
app.secret_key = os.urandom(12)

app.config['MAIL_SERVER'] = EMAIL_SERVER
app.config['MAIL_PORT'] = EMAIL_PORT
app.config['MAIL_USE_TLS'] = EMAIL_USE_TLS
app.config['MAIL_USE_SSL'] = EMAIL_USE_SSL
app.config['MAIL_USERNAME'] = EMAIL_USERNAME
app.config['MAIL_PASSWORD'] = EMAIL_PASSWORD
mail = Mail(app)


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
            return redirect(url_for('splash'))

        return f(*args, **kwargs)

    return decorated_function


# pages
# ------------------------------------------------------------------------------

@app.route('/')
def splash():
    if session.get('is_authenticated'):
        return redirect(url_for('home'))
    else:
        return render_template('login.html',
            authentication_error=session.get('authentication_error'),
            show_login=request.args.get('show_login'))


@app.route('/login', methods=['POST'])
def login():
    if pbkdf2_sha256.verify(request.form['password'], PASSWORD_HASH):
        session['is_authenticated'] = True
        session['authentication_error'] = False
        return redirect(url_for('home'))
    else:
        session['authentication_error'] = True
        return redirect(url_for('splash'))


@app.route("/logout")
def logout():
    session['is_authenticated'] = False
    session['authentication_error'] = False

    return redirect(url_for('splash'))


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


@app.route('/where-to-stay')
@login_required
def where_to_stay():
    return render_template('where_to_stay.html')


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


@app.route('/rsvp')
@login_required
def rsvp():
    return render_template('rsvp.html')


@app.route('/rsvp-response-handler', methods=['POST'])
@login_required
def rsvp_response_handler():
    body = '<br><br>'.join(
        [format_rsvp_field(k, v) for k, v in request.form.items()] +
            ['- Sincerely,<br>The Happy Lemon Party RSVP Robot']
    )

    # write to a flat file
    # -------------------------------------------------------------------------

    rsvps_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'rsvps')

    if not os.path.exists(rsvps_dir):
        os.makedirs(rsvps_dir)

    time = datetime.now().strftime("%Y-%m-%d--%H-%M-%S-%f")
    name = request.form.get('data[name]')

    output_file = os.path.join(
        rsvps_dir,
        get_valid_filename('{}--{}.html'.format(time, name))
    )

    with open(output_file, 'w') as f:
        f.write(body)


    # send an email
    # -------------------------------------------------------------------------

    msg = Message('[lemonparty2018-rsvp]',
                  sender=EMAIL_USERNAME,
                  recipients=[EMAIL_RECIPIENT],
                  html=body)

    try:
        mail.send(msg)
        return jsonify({ 'success': True })

    except:
        return jsonify({ 'success': False })


if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0')
