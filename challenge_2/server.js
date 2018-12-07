const path = require('path');
const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => { console.log(`Server listening in Port ${PORT}`); });
