

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dev_user:root@cluster0.vfbr8wz.mongodb.net/?retryWrites=true&w=majority').then(() => { console.log('Database connected!') }).catch((err) => { console.log('error in connecting to database',err) });

