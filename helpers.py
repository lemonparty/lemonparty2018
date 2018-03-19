import re
import unicodedata


def format_rsvp_field(key, value):
    return u'<b>{}</b><br>{}'.format(
        key.replace('data[', '').replace(']', '').replace('_', ' '),
        value or '<i>no response</i>'
    )


def get_ascii(s):
    return (
        unicodedata.normalize('NFKD', s)
        .encode('ascii', 'ignore')
    )


# based on a django function, modified to handle unicode
def get_valid_filename(s):
    s = (
        get_ascii(s)
        .strip()
        .replace(' ', '_')
    )
    return re.sub(r'(?u)[^-\w.]', '', s)
