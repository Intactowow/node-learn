const express = require('express')
const { engine } = require('express-handlebars');

const app = express()

// configure Handlebars view engine
app.engine('handlebars', engine());

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

const fortunes = [
  'Победи свои страхи, или они победят тебя.',
  'Рекам нужны истоки.',
  'Не бойся неведомого.',
  'Тебя ждет приятный сюрприз.',
  'Будь проще везде, где только можно.',
]

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', { fortune: randomFortune })
})
// custom 404 page
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))