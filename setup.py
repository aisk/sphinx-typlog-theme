#!/usr/bin/env python

from setuptools import setup
from sphinx_typlog_theme import __version__

with open('README.rst', encoding='utf-8') as f:
    readme = f.read()

setup(
    name='sphinx_typlog_theme',
    version=__version__,
    description='A typlog Sphinx theme',
    long_description=readme,
    author='Hsiaoming Yang',
    author_email='me@lepture.com',
    url='https://github.com/typlog/sphinx-typlog-theme',
    packages=['sphinx_typlog_theme'],
    include_package_data=True,
    python_requires='>=3.8',
    install_requires=['sphinx>=5'],
    entry_points={
        'sphinx.html_themes': [
            'sphinx_typlog_theme = sphinx_typlog_theme',
        ]
    },
    extras_require={
        'dev': ['sphinx', 'livereload'],
    },
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Framework :: Sphinx',
        'Framework :: Sphinx :: Theme',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3 :: Only',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
        'Programming Language :: Python :: 3.12',
        'Programming Language :: Python :: 3.13',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy',
        'Topic :: Documentation',
        'Topic :: Software Development :: Documentation',
    ],
)
