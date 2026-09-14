.. _options:

Options
=======

There are some options for you to configure the theme in ``conf.py``::

    html_theme_options = {}

logo
----

Put a logo file in your docs ``_static`` folder, e.g. the filename is
``logo.png``::

    html_theme_options = {
        'logo': 'logo.png'
    }

With logo configured, there will be a logo image on sidebar. The standard
Sphinx ``html_logo`` setting is supported as well, ``logo`` takes precedence
when both are configured.

logo_name
---------

By default the project name is shown next to the logo image. Show a
different name with::

    html_theme_options = {
        'logo_name': 'My Project'
    }

Or hide the name with::

    html_theme_options = {
        'logo_name': 'false'
    }

description
-----------

Add a description under your logo and logo_name. It is also used as the
default ``og:description`` of every page::

    html_theme_options = {
        'description': 'Your project description'
    }

Open Graph
----------

Every page renders ``og:title``, ``og:site_name`` and ``og:description``
meta tags. A page can override the description and image with the
``meta`` directive::

    .. meta::
       :description: What this page is about.
       :image: https://example.com/page.png

``og_image`` is the fallback image for pages without one, and ``twitter``
adds a ``twitter:creator`` tag::

    html_theme_options = {
        'og_image': 'https://example.com/cover.png',
        'twitter': 'lepture',
    }

Canonical URL
-------------

Use the standard Sphinx ``html_baseurl`` setting to render canonical
links::

    html_baseurl = 'https://docs.example.com/'

The ``canonical_url`` theme option is deprecated, it is only used when
``html_baseurl`` is not set.

meta_html and warning
---------------------

``meta_html`` injects raw HTML into ``<head>``, ``warning`` renders a
global notice on top of every page. Both accept raw HTML::

    html_theme_options = {
        'meta_html': '<meta name="generator" content="sphinx">',
        'warning': 'This is the documentation of an <b>unreleased</b> version.',
    }

color
-----

Add a theme color, it will be shown as the hover color for links etc::

    html_theme_options = {
        'color': '#E8371A'
    }

github
------

Configure your GitHub repo with ``github_user`` and ``github_repo``::

    html_theme_options = {
        'github_user': 'lepture',
        'github_repo': 'mistune'
    }

Remember to include the ``github.html`` template::

    html_sidebars = {
        '**': [
            'github.html',
            ...
        ]
    }

analytics_id
------------

Track your site with Google Analytics (GA4 measurement ID)::

    html_theme_options = {
        'analytics_id': 'G-xxxxxxxx'
    }

sidebars
--------

The theme provides these sidebar templates: ``logo.html``, ``github.html``,
``globaltoc.html``, ``sponsors.html``, ``searchbox.html`` and
``relations.html``. By default ``logo.html``, ``github.html``,
``globaltoc.html`` and ``searchbox.html`` are rendered. Customize them
with ``html_sidebars``::

    html_sidebars = {
        '**': [
            'logo.html',
            'github.html',
            'globaltoc.html',
            'searchbox.html',
        ]
    }
