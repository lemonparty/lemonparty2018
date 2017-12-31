from flask import Flask
from flask import render_template, session, request
import os

app = Flask(__name__)


@app.route('/')
def index():
    if session.get('logged_in'):
        return render_template('home.html')
    else:
        return render_template('login.html', login_error=session.get('login_error'))


@app.route('/login', methods=['POST'])
def do_admin_login():
    if request.form['password'] == 'password':
        session['logged_in'] = True
        session['login_error'] = False
    else:
        session['login_error'] = True

    return index()


@app.route("/logout")
def logout():
    session['logged_in'] = False
    session['login_error'] = False

    return index()


if __name__ == '__main__':
    app.secret_key = os.urandom(12)
    app.run(debug=True, host='0.0.0.0')
