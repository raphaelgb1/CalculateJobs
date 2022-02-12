const Config = require('./config');



const initDb = {

	async init() {

		const database = await Config()

				await database.exec(`CREATE TABLE profile (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					name TEXT,
					avatar TEXT,
					monthly_budget INT,
					days_per_week INT,
					hours_per_day INT,
					vacation_per_year INT,
					value_hour INT
				)`);

				await database.exec(`CREATE TABLE jobs (
						id INTEGER PRIMARY KEY AUTOINCREMENT,
						name TEXT,
						daily_hours TEXT,
						total_hours TEXT,
						created_at DATETIME
					)`);

				await database.run(`INSERT INTO profile (
						name,
						avatar, 
						monthly_budget, 
						days_per_week, 
						hours_per_day, 
						vacation_per_year, 
						value_hour) VALUES (
						"Raphael",
						"https://avatars.githubusercontent.com/u/86370300?v=4",
						"4000",
						"6",
						"30",
						"8" ,
						"75"
					)`);

				await database.run(`INSERT INTO jobs (
						name,
						daily_hours,
						total_hours,
						created_at) VALUES (
						"Hamburgueria",
						4,
						40,
						1617514475125
					)`);

				await database.run(`INSERT INTO jobs (
						name,
						daily_hours,
						total_hours,
						created_at) VALUES (
						"Pizzaria",
						10,
						150,
						161751775625
					)`);

				await database.close();	

				}

}

initDb.init()