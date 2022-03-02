#!/usr/bin/python3

# ./assets/parse_html.py -i src/index.html -t dev

import re
from sys import argv
from os import getcwd


def dev_parser(text, target_type):
    target = {
        'dev': 'DEV',
        'dist': 'DIST',
    }[target_type]

    drop = 'DEV' if target == 'DIST' else 'DIST'

    text = re.sub(f"<!-- BEGIN {drop} -->", f"<!-- BEGIN {drop}", text)
    text = re.sub(f"<!-- END {drop} -->", f"END {drop} -->", text)
    return text


def dist_parser(text):
    text = re.sub('', '', re.MULTILINE)
    return text


def arg_parser(args):
    options = ['-i', '-t']
    return {
        option: args[args.index(option) + 1]
        for option in options
    }


if __name__ == "__main__":
    arg_dict = arg_parser(argv)
    input_path = f"{getcwd()}/{arg_dict['-i']}"
    target = arg_dict['-t']

    with open(input_path, 'r') as f:
        text = f.read()
    
    result = dev_parser(text, target)

    print(result, end='')
