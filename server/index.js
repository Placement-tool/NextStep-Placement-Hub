import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// https://mongodb.com/cloud/atlas

// This is not secure and is for development only :)
const CONNECTION_URL = 'mongodb+srv://GeneralAdmin:dbPass691@cluster0.emcba.mongodb.net/?retryWrites=true&w=majority&appName=cluster0';
const PORT = process.env.PORT || 3000;

// The parameters just fixes some obscure warnings - dw
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.listen(PORT, () => {console.log(`Server running on port http://localhost:${PORT}`)}) })
    .catch((err) => {console.log(err.message)});

