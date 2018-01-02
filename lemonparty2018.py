from flask import Flask
from flask import render_template
import os
import json
from localsettings import DEBUG


app = Flask(__name__)


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
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0')
