const jobUtils = require('../utils/jobUtils');
const Job = require('../model/jobsModel');
const Profile = require('../model/Profile');

module.exports = {
//CRIAR FUNÇÕES
		async index(req, res) {
			const jobs = await Job.get();
			const profile = await Profile.get();

			//STATUS DE PROGRESSO DOS JOBS
			const countStatus = {

				progress: 0,
				done: 0,
				total: jobs.length,

			}

			countValue = 0;

			// VARIÁVEL DO TOTAL DE HORAS DE CADA JOB EM PROGRESSO
			let jobTotalHours = 0

			
			//CALCULO DO RESTANTE DO TEMPO
			const updatedJobs = jobs.map((job) => {

				//AJUSTES NO JOB
				const remaining = jobUtils.remainingDays(job);
				const status = remaining <= 0 ? 'done' : 'progress';
				const valueTotal = jobUtils.calculateBudget(job, profile["value-hour"]);

				// VARIÁVEL CONTADORA DE STATUS DE CADA JOB
				countStatus[status] += 1;
				countValue[valueTotal] += countValue;

				console.log(countStatus)

				//VARIÁVEL CONTADORA DO TOTAL DE HORAS DE CADA JOB
				jobTotalHours = status === 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

				

				return {

					...job,
					remaining,
					status,
					budget: jobUtils.calculateBudget(job, profile["value-hour"]),
				}

				


			})

			
			

			//CALCULO DE HORAS LIVRE DO DIA (quantidade de horas que o usuário quer trabalhar menos as horas de cada job)
			const freeHours = profile['hours-per-day'] - jobTotalHours;

			
		 	return res.render("index", { jobs: updatedJobs, profile: profile, countStatus: countStatus, freeHours: freeHours });

		}
}