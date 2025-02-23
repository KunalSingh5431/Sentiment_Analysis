import sys
import joblib

model = joblib.load("sentiment_model.pkl")

text = sys.argv[1]

sentiment = model.predict([text])[0]

print(sentiment)
