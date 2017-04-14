
Template.Problems.helpers({
	problems: function () {
		// ...
        var category = Session.get('selectedCategory');
		return Problems.find(category ? {tag: category} : {}, {
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

Template.Problems.events({

    "change .categoryselection": function(e, t){
        var category = $(e.currentTarget).val();
        Session.set('selectedCategory', category);
    },

    'click .new-problem': function () {
        // ...
        Session.set('newProblem', true);
    },
    'click .fa-close': function () {
        // ...
        Session.set('newProblem', false);
    },


	'click .upvote': _.throttle( function( e,  t ) {
     e.preventDefault();
     var id = $(e.currentTarget).data( 'id' );

     //get this posts array of likers
     //var res = Problems.find( { _id: id}, { voters: 1}).fetch()[0].name;
     var res1 = Problems.find({_id: id}, {
     	/*
     	sort: Sort specifier,
     	skip: Number,
     	limit: Number,
     	fields: Field specifier,
     	reactive: Boolean,
     	transform: Function
     	*/
     	Upvoters: 1,
     }).fetch()[0].Upvoters;
     //console.log(res);

     var res2 = Problems.find({_id: id}, {
     	/*
     	sort: Sort specifier,
     	skip: Number,
     	limit: Number,
     	fields: Field specifier,
     	reactive: Boolean,
     	transform: Function
     	*/
     	Downvoters: 1,
     }).fetch()[0].Downvoters;
    
     //see if the current user is one of them
     var q1 = _.find(res1, (x) => x == Meteor.userId() );
     var q2 = _.find(res2, (x) => x == Meteor.userId() );
     //console.log(q);

    //need to disallow same user that liked to like again
    if ( q1 == Meteor.userId() || q2 == Meteor.userId()) {
    	if (q1 == Meteor.userId()) {
    		//deleting if already exists and decresing upvote when clicked twice
    	Problems.update( { _id: id },  { $inc: { upvotes: -1 } ,  $pull: { Upvoters:  Meteor.userId() } });
    	}
    	else{
    		//means it's in downvoters since it passed parent if condition
    		Problems.update( { _id: id },  { $inc: { upvotes: 1 } ,  $push: { Upvoters:  Meteor.userId() } });
    		Problems.update( { _id: id },  { $inc: { downvotes: -1 } ,  $pull: { Downvoters:  Meteor.userId() } });
    	}
    	
    }
    else{
    	//otherwise, allow like and save it
    	Problems.update( { _id: id },  { $inc: { upvotes: 1 } ,  $push: { Upvoters:  Meteor.userId() } });    	
    }    
  }, 1000 ),


// downvote buttton events

	'click .downvote': _.throttle( function( e,  t ) {
     e.preventDefault();
     var id = $(e.currentTarget).data( 'id' );

     //get this posts array of likers
     //var res = Problems.find( { _id: id}, { voters: 1}).fetch()[0].name;
     var res1 = Problems.find({_id: id}, {
     	/*
     	sort: Sort specifier,
     	skip: Number,
     	limit: Number,
     	fields: Field specifier,
     	reactive: Boolean,
     	transform: Function
     	*/
     	Upvoters: 1,
     }).fetch()[0].Upvoters;
     //console.log(res);

     var res2 = Problems.find({_id: id}, {
     	/*
     	sort: Sort specifier,
     	skip: Number,
     	limit: Number,
     	fields: Field specifier,
     	reactive: Boolean,
     	transform: Function
     	*/
     	Downvoters: 1,
     }).fetch()[0].Downvoters;
    
     //see if the current user is one of them
     var q1 = _.find(res1, (x) => x == Meteor.userId() );
     var q2 = _.find(res2, (x) => x == Meteor.userId() );
     //console.log(q);

    //need to disallow same user that liked to like again
    if ( q1 == Meteor.userId() || q2 == Meteor.userId()) {
    	if (q2 == Meteor.userId()) {
    		//deleting if already exists and decresing upvote when clicked twice
    	Problems.update( { _id: id },  { $inc: { downvotes: -1 } ,  $pull: { Downvoters:  Meteor.userId() } });
    	}
    	else{
    		//means it's in downvoters since it passed parent if condition
    		Problems.update( { _id: id },  { $inc: { downvotes: 1 } ,  $push: { Downvoters:  Meteor.userId() } });
    		Problems.update( { _id: id },  { $inc: { upvotes: -1 } ,  $pull: { Upvoters:  Meteor.userId() } });
    	}
    	
    }
    else{
    	//otherwise, allow like and save it
    	Problems.update( { _id: id },  { $inc: { downvotes: 1 } ,  $push: { Downvoters:  Meteor.userId() } });    	
    }
  }, 1000 ),
}
);