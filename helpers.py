import re


def format_rsvp_field(key, value):
    return u'<b>{}</b><br>{}'.format(
        key.replace('data[', '').replace(']', '').replace('_', ' '),
        value or '<i>no response</i>'
    )


# Stolen from Django
def get_valid_filename(s):
    s = re.sub(r'[^\x00-\x7F]', '', s) # but we added this line
    s = str(s).strip().replace(' ', '_')
    return re.sub(r'(?u)[^-\w.]', '', s)
