const Joi = require('joi');

module.exports = {
	patient: (patientObj) => {
		const schema = Joi.object({
			cin: Joi.string().min(3).max(10),
			fName: Joi.string().min(3).max(50).required(),
			lName: Joi.string().min(3).max(50).required(),
			phone: Joi.string().min(5).max(50).required(),
			email: Joi.string().min(5).max(50),
			fonction: Joi.string().max(50),
			familySituation: Joi.string().max(50),
			gender: Joi.string().required(),
			appointments: Joi.array().items(Joi.objectId()),
			birthDate: Joi.date()
		});

		return schema.validate(patientObj);
	},

	appointment: (appointmentObj) => {
		const schema = Joi.object({
			startTime: Joi.date(),
			endTime: Joi.date(),
			patientId: Joi.objectId().required(),
			type: Joi.string().required(),
			honnore: Joi.boolean()
		});
		return schema.validate(appointmentObj);
	},

	user: (userObj) => {
		const schema = Joi.object({
			name: Joi.string().min(2).max(50).required(),
			email: Joi.string().min(5).max(255).required().email(),
			password: Joi.string().min(5).max(255).required()
		});

		return schema.validate(userObj);
	}
};
