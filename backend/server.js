const app = require('./app');
const connectDataBase = require('./config/database');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');

// confige
dotenv.config({ path: 'backend/config/.env' });

const PORT=process.env.PORT||8082;
// DATABASE
connectDataBase();



// ERRORHANDLER
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`server is working on ${PORT}`);
});
