let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyPasser = require('body-parser'),
    dbConfig = require('./database/db');

// Express route
const studentRoute = require('./routes/student.route');

// Connecting MongoDB Database
mongoose.Promise = global.Promise; // deleteable? no longer use?
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database successfully connected');
  }, err => {
    console.log('Could not connect to database:', err);
  })

const app = express();
app.use(bodyPasser.json());
app.use(bodyPasser.urlencoded({ extended: true }));
app.use(cors());
app.use('/students', studentRoute);