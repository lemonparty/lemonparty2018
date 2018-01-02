from flask import Flask
from flask import render_template
from localsettings import DEBUG, VERSIONS


app = Flask(__name__)


@app.context_processor
def static_path_processor():
    if DEBUG:
        css_path = 'app.css'
        js_path = 'app.js'
    else:
        css_path = 'app.min.css'
        js_path = 'app.min.js'

    return dict(css_path=css_path, js_path=js_path, VERSIONS=VERSIONS)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0')
