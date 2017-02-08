Template.ProblemSingle.helpers({
	problemsingle: function () {
		// ...
		var id = FlowRouter.getParam('id');
		return Problems.findOne({_id: id}, {
			/*
			sort: Sort specifier,
			skip: Number,
			fields: Field specifier,
			reactive: Boolean,
			transform: Function
			*/
		});
	}
});