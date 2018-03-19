# Lemon Party 2018
This repo holds the website for Katherine and Michael's wedding. Let's see if
this goes off with a hitch...

lemonparty2018 is a pretty basic static site; the only dynamic thing going on
is the RSVP form. In searching for an RSVP solution of the right "weight", we
settled on emailing when a form is submitted, along with writing a flat file to
disk for backup (to the`./rsvps` foler). A database felt too heavy, and
submitting to a google form with some weird unsupported ajax felt too brittle.

## Back end

The back end is written in Python, and served with Flask. To get started,
assuming you have pip, virtualenv, and virtualenvwrapper installed:

* clone the repo
* `mkvirtualenv lemonparty2018`
* `workon lemonparty2018`
* `pip install -r requirements.txt`
* add a file in the root of the project called `localsettings.py`. example
  contents are listed below.
* run the server with `python lemonparty2018.py`

Then you should be able to load localhost:5000 and see the site.

### `localsettings.py`

`localsettings` stores information specific to a particular environment. Here
is an example file:

```.py
DEBUG = True # should be false in prod
SECRET_KEY = 'a secret key' # see below for generating a secret key
PASSWORD_HASH = 'a hashed password' # see below for generating a password hash

EMAIL_CONFIG = {
    'MAIL_SERVER': 'smtp.gmail.com', # or whatever your server is
    'MAIL_PORT': 465, # or whatever port your mail server uses
    'MAIL_USE_SSL': True,
    'MAIL_DEFAULT_SENDER': 'the email address sending from',
    'MAIL_USERNAME': 'the username for the email account',
    'MAIL_PASSWORD': 'the password for the email account'
}

EMAIL_RECIPIENTS = [
    'first email address to send rsvp confirmation',
    'another email address to send rsvp confirmation'
]
```

To generate a password hash (used to verify user logins), start your python
console while in the project's virtualenv, enter the following (replacing
"[your password here]" with your password), and copy the output to
`localsettings.py`:

```.py
from passlib.hash import pbkdf2_sha256
pbkdf2_sha256.hash("[your password here]")
```

To generate a secret key (used by Flask to encrypt its session data), we
suggest entering the following in the python console:

```.py
import os
os.urandom(24)
```

## Front end

The CSS is written using SASS, and the JS is written in ES6. Both are managed
with webpack.

Our desired node version is specified in `.nvmrc`. Assuming you have that
installed and activated (e.g. with `nvm use`), run `yarn install` to install
the JS packages required for this app.

Then to start webpack watching and compiling the files, run `npm run watch`. To
compile the minified files for use in production, run `npm run build`. The
minified files are used in the templates if the `DEBUG` variable in
`localsettings` is false. Cachebusting is built into the `npm run build`
command; it adds a hash to the filename and stores the current hash in a json
file for python to read.
