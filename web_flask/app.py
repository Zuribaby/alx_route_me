#!/usr/bin/python3
""" Starts a Flash Web Application """
from flask import Flask, render_template, make_response, abort
app = Flask(__name__)

# Configure for HTTPS
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

@app.route('/home', strict_slashes=False)
def home_index():
    """ render home page """
    return render_template('landing_page.html')

if __name__ == "__main__":
    """ Main Function """
    app.run(debug=True)