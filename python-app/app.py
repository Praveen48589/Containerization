from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "🚀 Python Flask app running inside Docker!"

@app.route("/health")
def health():
    return jsonify(status="OK", service="python-docker-app")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

