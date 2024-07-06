const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const readData = () => {
    const data = fs.readFileSync('./data.json');
    return JSON.parse(data);
};

app.get('/', (req, res)=>{
    const users = readData();
    res.json(users);
});

app.get('/user/:id', (req, res) =>{
    const users = readData();
    const user = users.find(u => u.id == parseInt(req.params.id));
    if(!user) return res.status(404).json({error: 'user not found'});
    res.json(user);
});

app.get('/hobby/:hob', (req, res) =>{
    const users = readData();
    const hobby = req.params.hob;
    const matches = users.filter(u => u.hobbies.includes(hobby));
    if(matches === 0) return res.status(404).json({error: 'No users found'});
    res.json(matches);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});