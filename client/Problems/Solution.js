Template.solution.helpers({
    isAuthor: function() {
        return this.author == Meteor.user().emails[0].address;       
    },
});

Template.solution.events({
	'click .fa-trash': function(e, t) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
          var currentPostId = this._id;
          Solutions.remove(currentPostId);
        }
    },
});