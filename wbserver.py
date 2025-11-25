import pandas as pd
from flask import Flask, render_template

feelings_file = "data/emotions.csv"
app = Flask("wb-app")

def split_subemotions(df, col_name):
    #Returns dict with sub-emotions sorted
    emotion_dict = {}
    #drop NaN
    ue = list(df[col_name].dropna())
    #ue = unsorted emotions
    #total = total sub-emotions
    total = int(len(ue))
    print("total type -------")
    print(total)
    print(type(total))
    for i in range(int(total/3)):
       #Formula is 2i + total/3
       value = int(2*i + total/3)
       emotion_dict[ue[i]] = [ue[value], ue[value+1]]
    return emotion_dict


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/feelings")
def feelings():
    return render_template("feelings.html")

@app.route("/mood")
def moodlogger():
    return render_template("moodlogger.html")

@app.route("/data/feelings")
def feelingsData():
    df = pd.read_csv(feelings_file)
    key_emotions = list(df.columns)
    emotion_dict = {}
    print(key_emotions)
    for emotion in key_emotions:
        emotion_dict[emotion] = split_subemotions(df, emotion)
    return emotion_dict


if __name__=="__main__":
    app.run(debug=True, port=5000) 
    # When no port is specified, starts at default port 5000