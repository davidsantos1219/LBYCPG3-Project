from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3
import base64

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Necessary for session management

# Initialize the database
def init_sqlite_db():
    conn = sqlite3.connect('db.sqlite3')
    conn.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)')
    conn.execute('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, image BLOB)')
    conn.close()

@app.route('/')
def index():
    if 'username' not in session:
        return redirect(url_for('login'))
    
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    cursor.execute('SELECT text, image FROM posts')
    posts = cursor.fetchall()
    conn.close()

    # Convert the binary image data to base64 to display in the browser
    posts = [(text, base64.b64encode(image).decode('utf-8') if image else None) for text, image in posts]

    return render_template('Main Page.html', posts=posts, username=session['username'])

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Validate user credentials
        conn = sqlite3.connect('db.sqlite3')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
        user = cursor.fetchone()
        conn.close()

        if user:
            session['username'] = username  # Store username in session
            return redirect(url_for('index'))
        else:
            return "Invalid credentials! Please try again."

    return render_template('login.html')

@app.route('/profile')
def profile():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('profile.html', username=session['username'])

@app.route('/notifications')
def notifications():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('notifications.html', username=session['username'])

@app.route('/settings')
def settings():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('settings.html', username=session['username'])

@app.route('/startPage')
def startPage():
    return render_template('startPage.html')

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

        # Redirect to login page after successful signup
        return redirect(url_for('login'))

    return render_template('signup.html')

@app.route('/add_post', methods=['POST'])
def add_post():
    if 'username' not in session:
        return redirect(url_for('login'))

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
