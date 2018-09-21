const express = require('express');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');

//##########CONNECT DATABASE ##########//
const db = require('./config/keys').mongoUri;
mongoose
.connect(db)
.then(()=> console.log('Mongodb is connected!'))
.catch(err => console.log(err));

//##########MIDDLE-WARE ##########//
    // TODO: Add Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
    // Passport middleware
app.use(passport.initialize());
    // Passport config
require('./config/passport')(passport);
//########## ROUTES ##########//
//TODO: Home route
app.get('/',(req, res)=>{
    res.send('Hello world!')
})
// TODO: API Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



//##########CONNECT SERVER VIA PORT ##########//
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})