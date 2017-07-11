const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname +'/views/partials')
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('toUpper', (text)=>{
  return text.toUpperCase()
})

app.set('view engine','hbs')

app.use((req,res,next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method}, ${req.url}`
  console.log(log)
  fs.appendFile('server.log',log + '\n',(err)=>{
    if (err){
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname +'/public'))

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageName:'Handlebars Template',
    pageTitle: 'This is sparta!'
  })
})
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About page render'
  })
})


app.get('/404', (request,response) => {
  response.send({
    bad: 'This is a mistake'
  })
})

app.listen(3000)
