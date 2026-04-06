import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import user_router from './routes/users.r.js'
dotenv.config()

const app = express()

app.use(cors(
    {
        origin:['http://localhost:5173','https://frontend-9s86.onrender.com'],
        credentials:true
    }
));

app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cookieParser())

app.use('/happybirthday', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Happy Birthday 🎉</title>
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          text-align: center;
          width: 300px;
        }

        h1 {
          margin-bottom: 20px;
        }

        input {
          padding: 10px;
          width: 80%;
          border-radius: 10px;
          border: 1px solid #ccc;
          margin-bottom: 15px;
        }

        button {
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          background: #ff6b6b;
          color: white;
          cursor: pointer;
          font-weight: bold;
        }

        .message {
          margin-top: 20px;
          font-size: 18px;
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🎂 С Днём Рождения!</h1>
        <input id="nameInput" placeholder="Введи имя" />
        <br />
        <button onclick="showMessage()">Поздравить 🎉</button>
        <div class="message" id="message"></div>
      </div>

      <script>
        function showMessage() {
          const name = document.getElementById('nameInput').value || 'Друг';
          const msg = \`
            🎉 Дорогой(ая) \${name}!<br/><br/>
            Желаю тебе счастья, здоровья и успехов!<br/>
            Пусть каждый день приносит радость 🚀✨
          \`;
          document.getElementById('message').innerHTML = msg;
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(process.env.PORT || 3001,()=>{
    console.log(`Run on ${process.env.PORT || 3001}`);
})

app.use('/users',user_router);
