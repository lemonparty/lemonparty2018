# Lemon Party 2018
Let's see if this goes off with a hitch...

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

```
DEBUG = True

VERSIONS = {
    'css': 0,
    'js': 0,
}
```

## Front end

The CSS is written using SASS, and the JS is written in ES6. Both are managed
with webpack. Assuming you already have node and yarn installed, run
`yarn install` to install the JS packages required for this app.

Then to start webpack watching and compiling the files, run `npm run watch`. To
compile the minified files for use in production, run `npm run build`. The
minified files are used in the templates if the `DEBUG` variable in
`localsettings` is false. To bust cache in production, increment the css or js
version as needed, then restart apache.