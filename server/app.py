from flask import Flask, jsonify, request

app = Flask(__name__)

messages = []

@app.route('/')
def hello():
    return 'hello world'

@app.route('/messages', methods = ['GET'])
def getMessages():
    return jsonify(messages)

@app.route('/add', methods = ['POST'])
def addMessage():
    data = request.get_json()
    messages.append(data)
    return jsonify(messages)

@app.route('/delete/<idx>', methods = ['DELETE'])
def deleteMessage(idx):
    messages.pop(int(idx))
    return jsonify(messages)

if __name__ == "__main__":
    app.run(debug=True, port=5000)