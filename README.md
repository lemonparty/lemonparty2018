# Lemon Party 2018
Let's see if this goes off with a hitch...

## Backend

The back end is written in Python, and served with Flask. To get started,
assuming you have pip, virtualenv, and virtualenvwrapper installed:

* clone the repo
* `mkvirtualenv lemonparty2018`
* `workon lemonparty2018`
* `pip install -r requirements.txt`
* run the server with `python lemonparty2018.py`

Then you should be able to load localhost:5000 and see the site.


## Frontend

The CSS is written using SASS, and the JS is written in ES6. Both are managed
with webpack. Assuming you already have node and npm installed, run `npm install`
to install the JS packages required for this app.

Then to start webpack watching and compiling the files, run `npm run watch`. To
compile the minified files for use in production, run `npm run build`. TODO:
use the minified files.
