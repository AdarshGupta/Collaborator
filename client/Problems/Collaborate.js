Template.Collaborate.helpers({
	ideas: function () {
		// ...
		return Solutions.find({}, {
            sort: {upvotes : -1}
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
