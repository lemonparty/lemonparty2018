# Lemon Party 2018
This repo holds the website for Katherine and Michael's wedding. Let's see if this goes off with a hitch...

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

`localsettings` stores information specific to a particular environment. Here is
an example file:

```.py
DEBUG = True # should be false in prod
PASSWORD_HASH = 'a hashed password' # see below for generating password hashes
EMAIL_SERVER = 'smtp.whatever.biz'
EMAIL_USERNAME = 'the username from which to send rsvp confirmations'
EMAIL_PASSWORD = 'the password for the email account'
```

To generate a password hash, start your python console while in the project's
virtualenv, enter the following, and copy the output to `localsettings.py`:

```.py
from passlib.hash import pbkdf2_sha256
pbkdf2_sha256.hash("your password")
```

## Front end

The CSS is written using SASS, and the JS is written in ES6. Both are managed
with webpack. Assuming you already have node and yarn installed, run
`yarn install` to install the JS packages required for this app.

Then to start webpack watching and compiling the files, run `npm run watch`. To
compile the minified files for use in production, run `npm run build`. The
minified files are used in the templates if the `DEBUG` variable in
`localsettings` is false. Cachebusting is built into the `npm run build`
command; it adds a hash to the filename and stores the current hash in a json
file for python to read.
