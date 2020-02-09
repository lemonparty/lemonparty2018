#!/usr/bin/env python2

import csv
import json
import sys
from collections import OrderedDict

SECTION_ORDER = [
    'getting-ready',
    'family-photos-toast-time',
    'details',
    'ceremony',
    'reception',
    'katherine-michael',
    'end-of-evening-dancing',
    'film',
]

photos_by_section = OrderedDict((section, []) for section in SECTION_ORDER)

with open('lemonparty-photos - photos.csv', 'rb') as csvfile:
    csv_reader = csv.reader(csvfile)

    headers = next(csv_reader, None)

    for row in csv_reader:
        row = dict(zip(headers, row))

        # skip any blank rows
        if not row['category']:
            continue

        photos_by_section[row['category']].append({
            'id_color': row['color photo'],
            'id_grayscale': row['b&w photo'],
            'x': int(row['x-axis']),
            'y': int(row['y-axis']),
            'people': [name.strip() for name in row['people'].split(',') if row['people']],
        })

sys.stdout.write('[')

for section, photos in photos_by_section.items():
    sys.stdout.write('''
    {{
        'id': '{}',
        'photos': ['''.format(section)
    )

    for photo in photos:
        sys.stdout.write('''
            [
                {},
            ],'''.format(json.dumps(photo, sort_keys=True))
        )

    sys.stdout.write('''
        ],
    },'''
    )

sys.stdout.write('\n]\n')
