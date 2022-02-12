const Profile = require('../model/Profile');

module.exports = {
			async index(req, res) {res.render("profile", { profile: await Profile.get() })
			},

			async update(req, res) {
				//REQ.BODY PARA CAPTURAR DADOS
				const data = req.body;

				//DEFINIR QUANTAS SEMANAS TEM EM 1 ANO
				const weekPerYear = 52;

				//REMOVER AS SEMANAS DE FÉRIAS DO ANO PARA DEFINIR AS SEMANAS DO MÊS
				const weekPerMonth = (weekPerYear - data["vacation-per-year"])/12;

				
				//TOTAL DE HORAS TRABALHADAS NA SEMANA
				const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

				//HORAS TRABALHADAS NO MÊS
				const monthlyTotalHours = weekTotalHours * weekPerMonth;

				//VALOR DA HORA TRABALHADA
				 const valueHour = data["monthly-budget"]/monthlyTotalHours;

				 const profile = await Profile.get();

				Profile.update({
					...profile,
					...req.body,
					"value-hour": valueHour	
				}) 

				return res.redirect('/profile', );
			},
	}
