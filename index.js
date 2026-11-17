const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

const users = [{username:'tung sahur', password:'696969'}];

app.set('view engine', 'hbs');



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


function userLogin(req, res, next){
    if(req.session.username){
        next();
    }else{
        return res.send('login dulu boskuh');
    }
}


app.get('/public',(req, res) => {
    return res.send('hai,salken kenal y');
});



app.get('/login',(req, res) => {
    return res.render('login',);
});



app.get('/haruslogin',[userLogin], (req, res) => {
    console.log(req.session.username);
    return res.send('berhsil masuk boskuh'+'user login:'+ req.session.username);
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.send('woilah');
    }else{
        const data = users.find(x=>x.username==username);
        if(data && data.password == password){ 
            req.session.username = username;
            return res.send('mantap boskuh');
        }else{
            return res.send('law siape mpruy');
        }

    }

})

app.listen(port, () => {
    console.log(`Server : http://localhost:${port}`);
});