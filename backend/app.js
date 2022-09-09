const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// confige
dotenv.config({ path: 'backend/config/.env' });

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());

// ROUTE IMPORTS

const user = require('./routes/userRoutes');
const data = require('./routes/dataRoutes');

app.use('/api/v1', user);
app.use('/api/v1', data);

if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'){
    app.use(express.static("frontend/build"))
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname ,'frontend','build','index.html'))
    })
  }


module.exports = app;
