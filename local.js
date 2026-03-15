const app = require('./api/index.js');
const port = 3000;
app.listen(port, () => {
    console.log(`Test Server Local berjalan di http://localhost:${port}`);
});
