const express = require('express');
const path = require('path');
const fs = require('fs')


const PORT = process.env.PORT || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));
console.log(path.join(__dirname, '/public/index.html'))
// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    console.log("server.js line 28 notes~~~~ ",notes)
    res.json(notes)
}
);

app.post('/api/notes', (req,res)=>{
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    req.body.id = 
    notes.push(req.body)
    console.log(req.body)
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json({message:'notes saved'})
})
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
