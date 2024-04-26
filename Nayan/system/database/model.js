module.exports = function (input) {
	const force = false;

	const Users = require("./models/users.js")(input);
	const Threads = require("./models/threads.js")(input);
	const Currencies = require("./models/currencies.js")(input);

	Users.sync({ force });
	Threads.sync({ force });
	Currencies.sync({ force });

	return {
		model: {
			Users,
			Threads,
			Currencies
		},
		use: function (modelName) {
			return this.model[`${modelName}`];
		}
	}
}