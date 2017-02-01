FlowRouter.route('/', {
	name: 'Home',
	action(){
		// To redirect to recipes page if user is logged in
		if (Meteor.userId()) {
			FlowRouter.go('Main');
		}
		GAnalytics.pageview();
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/problems', {
	name: 'Main',
	action(){
		GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: ''});
	}
});