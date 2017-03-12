Template.SolutionSingle.helpers({
	solutionsingle: function () {
		// ...
		var id = FlowRouter.getParam('id');
		Session.set('pathid', id);
		return Solutions.findOne({_id: id}, {
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