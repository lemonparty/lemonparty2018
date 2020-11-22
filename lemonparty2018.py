from datetime import datetime
from functools import wraps
import json
import os

from flask import (
    Flask, jsonify, render_template, session, request, redirect, url_for
)
from flask_mail import Mail, Message
from flask_wtf.csrf import CSRFProtect, CSRFError
from passlib.hash import pbkdf2_sha256

from helpers import (format_rsvp_field, get_ascii, get_valid_filename, photo_root)
from localsettings import (
    DEBUG, SECRET_KEY, PASSWORD_HASH, EMAIL_CONFIG, EMAIL_RECIPIENTS
)
from stuff_to_do_data import STUFF_TO_DO
from photos_data import (PHOTOS, PHOTO_MAX_DIMENSION)


app = Flask(__name__)
app.secret_key = SECRET_KEY
app.config['TEMPLATES_AUTO_RELOAD'] = DEBUG
csrf = CSRFProtect(app)

app.config.update(EMAIL_CONFIG)
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

@app.context_processor
def image_path_processor():
    def get_image_path(photo, size='large', id_key='id_color'):
        if not photo.get(id_key):
            return None

        return '{}/{}/{}.jpg'.format(photo_root(), size, photo[id_key])

    return dict(get_image_path=get_image_path)


def login_required(f):
    @wraps(f)

    def decorated_function(*args, **kwargs):
        if not DEBUG and not session.get('is_authenticated'):
            after = None

            if request.path != '/home':
                after = request.path.replace('/', '')

            return redirect(url_for('splash', after=after))

        return f(*args, **kwargs)

    return decorated_function


@app.template_filter('get_relative_photo_width')
def get_relative_photo_width(photo):
    return photo['x'] * (float(PHOTO_MAX_DIMENSION) / photo['y'])


@app.template_filter('get_relative_row_width')
def get_relative_row_width(row):
    # as a percentage; must match $gutter in photos.scss
    gutter = 0.01;

    return sum([get_relative_photo_width(photo) for photo in row]) * (
        1 + (gutter * (len(row) - 1))
    )

def chunk(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


@app.template_filter('get_section_display_name')
def get_section_display_name(section_id):
    return {
        'getting-ready': 'Getting Ready',
        'family-photos-toast-time': 'Formals',
        'details': 'Details',
        'ceremony': 'Ceremony',
        'reception': 'Reception',
        'katherine-michael': 'Lovey-Dovey Crap',
        'end-of-evening-dancing': 'Later',
        'film': 'Film',
    }[section_id]


# pages
# ------------------------------------------------------------------------------

@app.route('/')
def splash():
    if session.get('is_authenticated'):
        return redirect(url_for('home'))
    else:
        after = request.args.get('after')
        return render_template('login.html',
            authentication_error=session.get('authentication_error'),
            after=after)


@app.route('/login', methods=['POST'])
@csrf.exempt
def login():
    if pbkdf2_sha256.verify(request.form['password'], PASSWORD_HASH):
        session['is_authenticated'] = True
        session['authentication_error'] = False
        after = request.form['after']

        try:
            redirect_url = url_for(after)

        except:
            redirect_url = url_for('home')

        return redirect(redirect_url)
    else:
        session['is_authenticated'] = False
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


@app.route('/photos')
@login_required
def photos():
    photo_filter = request.args.get('filter')

    if photo_filter:
        if photo_filter == 'nicolas':
            filtered_photos = [
                { 'id_color': 'nicolas', 'id_grayscale': '', 'people': [], 'x': 1200, 'y': 679 },
            ]
        else:
            all_photos = []

            for section in PHOTOS:
                for row in section['photos']:
                    all_photos = all_photos + row

            def filter_by_name(photo):
                if photo.get('people'):
                    return photo_filter in photo['people']
                else:
                    return False

            filtered_photos = list(filter(filter_by_name, all_photos))

        sections = [
            {
                'name': photo_filter,
                'id': 'filtered-photos',
                'photos': chunk(filtered_photos, 2),
            },
        ]
    else:
        sections = PHOTOS

    return render_template(
        'photos.html',
        sections=sections,
        photo_root=photo_root,
        photo_filter=photo_filter,
    )


@app.route('/rsvp-response-handler', methods=['POST'])
@login_required
def rsvp_response_handler():
    data = request.get_json().items()
    body = '<br><br>'.join(
        [format_rsvp_field(k, v) for k, v in data] +
            ['- Sincerely,<br>The Happy Lemon Party RSVP Robot']
    )


    # write to a flat file
    # --------------------------------------------------------------------------

    rsvps_dir = os.path.join(
        os.path.dirname(os.path.realpath(__file__)),
        'rsvps'
    )

    if not os.path.exists(rsvps_dir):
        os.makedirs(rsvps_dir)

    time = datetime.now().strftime("%Y-%m-%d--%H-%M-%S-%f")
    name = [item for item in data if item[0] == 'name'][0][1]

    output_file = os.path.join(
        rsvps_dir,
        get_valid_filename(u'{}--{}.html'.format(time, name))
    )

    with open(output_file, 'wb') as f:
        f.write(body.encode('utf-8'))


    # send an email
    # --------------------------------------------------------------------------

    msg = Message('[lemonparty2018-rsvp] {}'.format(get_valid_filename(name)),
                  recipients=EMAIL_RECIPIENTS,
                  html=body)

    try:
        mail.send(msg)
        return jsonify({ 'success': True })

    except:
        return jsonify({ 'success': False })


@app.errorhandler(CSRFError)
def handle_csrf_error(e):
    return jsonify({
        'success': False,
        'message': e.description,
    })


if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0')
