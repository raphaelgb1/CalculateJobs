module.exports = {
		//FUNÇÃO DE CÁLCULO DE TEMPO
		remainingDays (job) {

				//CALCULANDO OS DIAS
				const remainingDays = (job["total-hours"]/job["daily-hours"]).toFixed();

					//PEGANDOS OS DIAS E TRANSFORMANDO EM DATA
					const createdDate = new Date(job.created_at);

					//CALCULANDO A DATA FUTURA
					const dueDay = createdDate.getDate() + Number(remainingDays);

					//SETANDO A DATA
					const dueDateInMs = createdDate.setDate(dueDay);

					//CALCULANDO A DATA EM MILISEGUNDOS
					const timeDifferenceInMs =  dueDateInMs - Date.now();

					//TRANSFORMANDO A DATA DE MILISEGUNDOS PARA DIAS
					const dayInMs = 1000*60*60*24;
					const dayDifference = Math.ceil(timeDifferenceInMs/dayInMs);


				//RESTAM X DIAS
				return dayDifference;

		},

		calculateBudget: (job, valueHour) => valueHour * job["total-hours"]

	}//FECHAMENTO DO SERVICES