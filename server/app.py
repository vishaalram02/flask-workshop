from flask import Flask, jsonify, request

app = Flask(__name__)

tweets = []

@app.route('/')
def hello():
    return 'hello world'

@app.route('/messages', methods = ['GET'])
def getMessages():
    return jsonify(tweets)

@app.route('/add', methods = ['POST'])
def addMessage():
    data = request.get_json()
    tweets.append(data)
    return jsonify(tweets)

@app.route('/delete/<idx>', methods = ['DELETE'])
def deleteMessage(idx):
    tweets.pop(int(idx))
    return jsonify(tweets)

if __name__ == "__main__":
    app.run(debug=True, port=5000)