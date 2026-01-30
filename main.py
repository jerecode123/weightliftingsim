from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('homepage.html')

@app.route('/aboutme')
def aboutme():
    return render_template('aboutme.html')
@app.route('/weightliftingsim')
def weightliftingsim():
    return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)
