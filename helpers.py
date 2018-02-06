def prep_rsvp_field_title(title):
    return title.replace('data[', '').replace(']', '').replace('_', ' ')

def prep_rsvp_field_content(content):
    if content == '':
        content = '<i>no response</i>'

    return content
