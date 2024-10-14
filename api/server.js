const express = require('express');
const cors = require('cors'); //using cors because frontend and backend are running in different portals
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.post("/api/newuser",(req,res)=>{
    const{firstName, lastName, email, password, reEnterPassword} = req.body;
    if (!firstName || !lastName || !email || !password || password !== reEnterPassword) {
        return res.status(400).json({ error: "Invalid input data" });
    }
    return res.status(201).json({ message: 'User registered successfully' });
})
app.post('/api/existinguser', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    return res.status(200).json({ message: 'User logged in successfully' });
});

app.listen(5000,()=>{
    console.log('Server is running on portal 5000')
})