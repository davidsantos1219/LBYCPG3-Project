from flask import Flask, render_template, request, redirect, url_for
import sqlite3
import base64

app = Flask(__name__)

# Initialize the database
def init_sqlite_db():
    conn = sqlite3.connect('db.sqlite3')
    conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)')
    conn.execute('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, image BLOB)')
    conn.close()

@app.route('/')
def index():
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('SELECT text, image FROM posts')
    posts = cursor.fetchall()
    conn.close()

    # Convert the binary image data to base64 to display in the browser
    posts = [(text, base64.b64encode(image).decode('utf-8') if image else None) for text, image in posts]

    return render_template('Main Page.html', posts=posts)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/notifications')
def notifications():
    return render_template('notifications.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Save user information to SQLite database
        with sqlite3.connect('db.sqlite3') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', (username, email, password))
            conn.commit()

        return "Sign up successful!"

    return render_template('signup.html')

@app.route('/add_post', methods=['POST'])
def add_post():
    text = request.form['text']
    image = request.files['image'].read() if 'image' in request.files else None

    # Save the post to the database
    with sqlite3.connect('db.sqlite3') as conn:
        cursor = conn.cursor()
        cursor.execute('INSERT INTO posts (text, image) VALUES (?, ?)', (text, image))
        conn.commit()

    return redirect(url_for('index'))

if __name__ == '__main__':
    init_sqlite_db()  # Initialize the database before running the app
    app.run(debug=True)
