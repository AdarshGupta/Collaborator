Template.Problems.helpers({
	problems: function () {
		// ...
		return Problems.find({}, {
			/*
			sort: Sort specifier,
			skip: Number,
			limit: Number,
			fields: Field specifier,
			reactive: Boolean,
			transform: Function
			*/
		});
	}
});