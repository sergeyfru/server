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

app.use('/happyBirthday', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Happy Birthday 🎉</title>

      <style>
        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        body {
          margin: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          padding: 16px;
        }

        .card {
          width: 100%;
          max-width: 400px;
          background: white;
          padding: 24px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          text-align: center;
          animation: fadeIn 0.6s ease;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 16px;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #ddd;
          font-size: 16px;
          margin-bottom: 12px;
        }

        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 12px;
          background: #ff6b6b;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }

        button:active {
          transform: scale(0.97);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .message {
          margin-top: 18px;
          font-size: 16px;
          line-height: 1.4;
          color: #333;
        }

        canvas {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 400px) {
          h1 {
            font-size: 20px;
          }

          .card {
            padding: 18px;
          }
        }
      </style>
    </head>

    <body>
      <canvas id="confetti"></canvas>

      <div class="card">
        <h1>🎂 С Днём Рождения!</h1>

        <input id="nameInput" placeholder="Введи имя" />

        <button onclick="showMessage()">Поздравить 🎉</button>

        <div class="message" id="message"></div>
      </div>

      <script>
        function showMessage() {
          const name = document.getElementById('nameInput').value || 'Друг';

          const msg = \`
            🎉 Дорогой \${name}!<br/><br/>
            Желаю тебе счастья, здоровья и успехов!<br/>
            Пусть каждый день приносит радость 🚀✨
          \`;

          document.getElementById('message').innerHTML = msg;

          startConfetti();
        }

        // Simple confetti
        const canvas = document.getElementById('confetti');
        const ctx = canvas.getContext('2d');
        let pieces = [];

        function resize() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        function startConfetti() {
          pieces = [];
          for (let i = 0; i < 100; i++) {
            pieces.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              size: Math.random() * 6 + 2,
              speed: Math.random() * 3 + 2
            });
          }

          animate();
        }

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          pieces.forEach(p => {
            ctx.fillStyle = \`hsl(\${Math.random()*360}, 100%, 50%)\`;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            p.y += p.speed;

            if (p.y > canvas.height) {
              p.y = 0;
            }
          });

          requestAnimationFrame(animate);
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
