const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.originalUrl}`;

  fs.appendFile('server.log', log + `\n` , (err) => {
    if(err) {
      console.log('unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintanance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome To this Express site'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'An Error has occured'
  })
});

app.listen(port, () => {
  console.log(`Server is Up and Running on Port ${port}`);
});
