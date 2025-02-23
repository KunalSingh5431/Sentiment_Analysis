## 📊 Sentiva -A Sentiment Analysis Web App

![Sentiment Analysis](https://img.shields.io/badge/Sentiment-Analysis-brightgreen?style=for-the-badge)  
A **React + Express + Python (NLTK)** based **Sentiment Analysis Web App** that predicts emotions from text input.

![Sentiva](https://github.com/user-attachments/assets/93e2f7f1-9d71-4853-bb48-68fe49ca9633)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) 
![NLTK](https://img.shields.io/badge/NLTK-026f79?style=for-the-badge)


## 🚀 Features
✅ Real-time Sentiment Analysis  
✅ Supports multiple emotions (Positive,Negative,Neutral)  
✅ User-friendly UI with React  
✅ Backend API with Express.js & Python  
✅ Sentiment History Tracking for past analyses  
✅ Option to Download Sentiment History as a CSV file  
✅ Voice Input for Speech-to-Text in the input box  
✅ Deployable on **Render**  

## 🛠 Tech Stack
- **Frontend:** React.js, Material UI
- **Backend:** Node.js, Express.js
- **Machine Learning:** Python, NLTK, joblib
- **Database:** None (Processing is real-time)
- **Deployment:** Render

## 📸 Screenshots 

![Image](https://github.com/user-attachments/assets/0eea2271-b333-4480-868d-9a7c6fad26f9)
![Image](https://github.com/user-attachments/assets/9d18ee29-65e8-46d5-99fb-e8c3c7530609)

## 🧠 Machine Learning Model Used

 Sentiment Analysis project utilizes **Multinomial Naïve Bayes (MultinomialNB)** for text classification, combined with **TF-IDF Vectorization** to preprocess the text data.

### 🔍 How It Works:
- Converts text into numerical format using **TF-IDF (Term Frequency-Inverse Document Frequency)**
- Uses **Multinomial Naïve Bayes (MultinomialNB)**, a probabilistic model based on **Bayes’ Theorem**
- Predicts sentiment categories: **Positive, Negative, or Neutral**

## 🖥️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/KunalSingh5431/sentiment-analysis.git
cd sentiment-analysis
```

### 2️⃣ Install Backend Dependencies
```sh
cd backend
pip install -r requirements.txt
npm install
```

### 3️⃣ Install Frontend Dependencies
```sh
cd ../frontend
npm install
```

### 4️⃣ Start the Backend
```sh
cd backend
node server.js
```

### 5️⃣ Start the Frontend
```sh
cd ../frontend
npm start
```

## 📡 API Endpoints
| Method | Endpoint  | Description |
|--------|----------|-------------|
| POST   | \`/analyze\` | Analyzes sentiment of the given text |

**Example Request:**
```json
{
  "text": "I am feeling great today!"
}
```
**Response:**
```json
{
  "sentiment": "Happy"
}
```

## 🌎 Deployment on Render

### 🔹 Setup Backend
1. Create a **Render Web Service**
2. Use the **backend folder** as the source
3. Set the build command:  
   ```sh
   cd backend && pip install -r requirements.txt && npm install && node server.js
   ```
4. Deploy!

### 🔹 Setup Frontend
1. Create a **Render Static Site**
2. Use the **frontend folder** as the source
3. Set the build command:  
   ```sh
   npm install && npm run build
   ```
4. Set the public directory as:  
   ```
   frontend/build
   ```
5. Deploy!

## 🎉 Live Demo
🚀 **[Live App](https://sentiment-analysis-nfi2.onrender.com)**  

## 🤝 Contributing
1. **Fork** the repo
2. **Clone** it to your local machine
3. Create a **new branch**
4. Commit and push changes
5. Submit a **Pull Request**!

## 📜 License
This project is **MIT licensed**.  

## 📍Contact

For any questions or feedback, feel free to reach out:

- **Email:** [kunalsingh5431@gmail.com](mailto:kunalsingh5431@gmail.com)

---

🌟 **Star the repository if you liked it!** ⭐
