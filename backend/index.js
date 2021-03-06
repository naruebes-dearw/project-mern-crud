let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyPasser = require('body-parser'),
    dbConfig = require('./database/db');

// Express route
const studentRoute = require('./routes/student.route');

// Connecting MongoDB Database
// mongoose.Promise = global.Promise; // deleteable? no longer use?
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/students', studentRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Connected to port ${port}...`);
})

// 404 Error
app.use((req, res, next) => {
  console.log('error 404')
  // next(createError(404));
})

app.use((err, req, res, next) => {
  // console.log('error this error handler =', err)
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
})