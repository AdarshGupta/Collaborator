// When the user logs out goes to homepage and cannot see problems page
// And if already logged in, it skips home page
if (Meteor.isClient) {
	Accounts.onLogin(function() {
	FlowRouter.go('Main');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('Home');
	});
}



FlowRouter.route('/', {
	name: 'Home',
	action(){
		// To redirect to about page if user is logged in
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
		BlazeLayout.render('MainLayout', {main: 'Problems'});
	}
});

FlowRouter.route('/problem/:id', {
	name: 'Problem',
	action(){
		BlazeLayout.render('MainLayout', {main: 'ProblemSingle'});
	}
});