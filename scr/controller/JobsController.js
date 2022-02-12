const jobUtils = require('../utils/jobUtils');
const Job = require('../model/jobsModel');
const Profile = require('../model/Profile');

module.exports = {
		save(req, res)  {
		
			Job.create({
				name: req.body.name,
				"daily-hours": req.body["daily-hours"],
				"total-hours": req.body["total-hours"],
				created_at: Date.now() //DATA DE HOJE
			});

			//RETORNAR À HOME
			return res.redirect('/');
		},

		create(req, res){ return res.render("job")},

		async show(req, res) {
			
			//ENVIAR PARAMETROS
			const jobId = req.params.id;
			const jobs = await Job.get();
			const profile = await Profile.get();

			const job = jobs.find(job => Number(job.id) === Number(jobId));

			if(!job) {
				return res.send('Job not found!');
			}

			

			job.budget = jobUtils.calculateBudget(job, profile["value-hour"]);

			return res.render("job-edit", { job });
		},

		async update(req, res) {

			const jobs = await Job.get();

			//ENVIAR PARAMETROS
			const jobId = req.params.id;


			const updatedJob = {
				name: req.body.name,
				"total-hours": req.body["total-hours"],
				"daily-hours": req.body["daily-hours"],
			}

		

			await Job.update(updatedJob, jobId);

			res.redirect('/');
		},

		delete(req, res) {

			const jobId = req.params.id;

			Job.delete(jobId);

			return res.redirect('/');
		}
	}