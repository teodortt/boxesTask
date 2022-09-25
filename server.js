const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;
const fs = require('fs');

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/get-data', (req, res) => {

    fs.readFile('data.json', 'utf-8', function (err, data) {
        if (err) console.log(err);
        const parsedData = JSON.parse(data);
        res.send(parsedData.data);
    });
});

app.post('/move-element', (req, res) => {

    const reqData = req.body;

    fs.readFile('data.json', 'utf-8', function (err, data) {
        if (err) console.log(err);

        const parsedData = JSON.parse(data).data;

        const updatedData = parsedData.map((el, i) => {
            if (el.id === reqData.id) {
                return parsedData[i] = { ...el, top: reqData.top }
            }
            return el;
        });

        fs.writeFile('data.json', JSON.stringify({ data: updatedData }), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });

        res.send(updatedData);
    });

});
