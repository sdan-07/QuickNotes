import app from './app.js';
import { db_connect } from './config/db.js';
const port = 3000;

const start = async () => {
    await db_connect();
    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    })
}

start();