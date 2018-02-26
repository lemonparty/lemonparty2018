import re


def format_rsvp_field(key, value):
    return '<b>{}</b><br>{}'.format(
        key.replace('data[', '').replace(']', '').replace('_', ' '),
        value or '<i>no response</i>'
    )

# Stolen from Django
def get_valid_filename(s):
    s = str(s).strip().replace(' ', '_')
    return re.sub(r'(?u)[^-\w.]', '', s)
