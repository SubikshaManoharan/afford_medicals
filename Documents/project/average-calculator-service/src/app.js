const express = require('express');
const numbersRoutes = require('./routes/numbers');

const app = express();

app.use('/numbers', numbersRoutes);

const PORT =  5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
