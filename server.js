require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')



const app = express()
app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true); // Allow all origins
    },
    credentials: true,
};
  
app.use(cors(corsOptions));

  
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))


app.get('/', (req, res) => {
    res.send('Welcome to the Express server!')
});

// Connect to mongodb
const URI = process.env.MONGODB_URL

mongoose.connect(URI)
  .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


// mongoose.connect(URI, {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err =>{
//     if(err) throw err;
//     console.log('Connected to MongoDB')
// })

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//     })
// }



const PORT = process.env.PORT || 5001
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`)
})