const express = require('express');
const axios = require('axios');
const router = express.Router();
const FileSystem = require('fs');
const path = require('path');
const calculateAverage = (numbers, windowSize) => {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return 0;
    }

    const uniqueNumbers = Array.from(new Set(numbers));
    const windowNumbers = uniqueNumbers.slice(-windowSize);

    const sum = windowNumbers.reduce((acc, num) => acc + num, 0);
    return sum / windowNumbers.length;
};

const getNumbers = async (numberid) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDMyMTM0LCJpYXQiOjE3NDcwMzE4MzQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdlNTkwMjMxLTc1ODUtNDdjZS05ODA2LTZhMzA0OTdiYWZiNCIsInN1YiI6InNoeWFtc2FyYW5yLjIyY3NlQGtvbmd1LmVkdSJ9LCJlbWFpbCI6InNoeWFtc2FyYW5yLjIyY3NlQGtvbmd1LmVkdSIsIm5hbWUiOiJzaHlhbXNhcmFuIHIiLCJyb2xsTm8iOiIyMmNzcjE5MiIsImFjY2Vzc0NvZGUiOiJqbXBaYUYiLCJjbGllbnRJRCI6IjdlNTkwMjMxLTc1ODUtNDdjZS05ODA2LTZhMzA0OTdiYWZiNCIsImNsaWVudFNlY3JldCI6ImplTkVzem5NTnNtclRyUmMifQ.Huyxky5qqcC0CRau8n_Ww3EABWK4aFkpkWK-8UMP3_Q";
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const config = {
        headers: headers,
        params: {
            numberid: numberid
        }
    };
    const url = `http://20.244.56.144/evaluation-service/primes`;
    const response = await axios.get(url, config);
        // const mockdata= [1, 2, 3, 4, 5, 6, 7, 8, 10];
        // const response = {
        //     data: mockdata
        // };

        return response.data.numbers.map(num => parseInt(num, 10))
        // return response.data.map(num => parseInt(num, 10))
;
    
};

router.get('/:numberid', async (req, res) => {
    const { numberid } = req.params;
    const PreviousNumbers = FileSystem.readFileSync(path.join(__dirname, '../data', 'numbers.json'), 'utf8');
    const Previousnumbers = JSON.parse(PreviousNumbers);
    const deleteNumbers = FileSystem.writeFileSync(path.join(__dirname, '../data', 'numbers.json'), JSON.stringify({ numbers: [] }), 'utf8');
    try {
        const numbers = await getNumbers();
        const average = calculateAverage(numbers, 10);
        const response = {
            windowPrevState: Previousnumbers.numbers.slice(-10),
            windowCurrState: numbers.slice(-10),
            numbers: numbers,
            avg: average, 
    };
    const writedata= {
        numbers: numbers.slice(-10),
    }
    FileSystem.writeFileSync(path.join(__dirname, '../data', 'numbers.json'), JSON.stringify(writedata), 'utf8');
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;