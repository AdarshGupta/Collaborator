Template.problem.helpers({
    isAuthor: function() {
        return this.author == Meteor.userId();       
    },
});