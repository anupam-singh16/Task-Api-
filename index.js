const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3005;
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    const checkboxData = req.body;

    fs.readFile('checkboxData.json', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            let existingData = [];
            try {
                existingData = JSON.parse(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).send('Error parsing JSON');
            }

            // Append the new checkbox data to the existing data array
            existingData.push(checkboxData);

            // Write the updated data back to the file
            fs.writeFile('checkboxData.json', JSON.stringify(existingData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).send('Error writing file');
                } else {
                    console.log('Checkbox data appended to checkboxData.json');
                    res.status(200).send('Checkbox data appended successfully');
                }
            });
        }
    });
});

app.get('/home',(req,res)=>{
    fs.readFile('checkboxData.json', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            let existingData = [];
            try {
                existingData = JSON.parse(data);
                res.json(existingData)
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).send('Error parsing JSON');
            }
        }
    
})})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
