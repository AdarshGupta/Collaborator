Template.Profile.helpers({
	problems: function () {
		// ...
		return Problems.find({author: Meteor.userId()}, {
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
	},

	solutions: function () {
    // ...
    return Solutions.find({author: Meteor.user().emails[0].address}, {
      sort: {upvotes: -1}
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

