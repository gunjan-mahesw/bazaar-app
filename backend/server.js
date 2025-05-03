const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');
require('dotenv').config();
const app= express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));
const port= process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server is running on port ${port}`));