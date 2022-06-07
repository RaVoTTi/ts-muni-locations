import { Sequelize } from 'sequelize';

// const dbConnection = async () => {
	const db = new Sequelize('muni-locations', 'root', '123456', {
		host: 'localhost',
		dialect: 'mysql',
	});

// 	try {
// 		await db.authenticate();
// 		console.log('Connection has been established successfully.');
// 	} catch (error) {
// 		console.error('Unable to connect to the database:', error);
// 	}
// };

// const dbConnection = async () => {
// 	const { MONGODB_CNN, MONGODB_CNN_TEST, NODE_ENV } = process.env;
// 	const connectionString = NODE_ENV === 'test' ? MONGODB_CNN_TEST : MONGODB_CNN;

// 	try {
// 		await connect(connectionString || '');
// 		console.log('Database Online');
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export default db;
