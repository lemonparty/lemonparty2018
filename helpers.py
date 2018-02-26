def format_rsvp_field(key, value):
    return '<b>{}</b><br>{}'.format(
        key.replace('data[', '').replace(']', '').replace('_', ' '),
        value or '<i>no response</i>'
    )
