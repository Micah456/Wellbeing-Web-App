from flask import Flask

app = Flask("wb-app")

@app.route("/")
def index():
    return "Welcome to WB-App!"

if __name__=="__main__":
    app.run(debug=True, port=5000) 
    # When no port is specified, starts at default port 5000