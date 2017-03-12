Template.NewSolution.events({
  'submit .new-answer'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.answer.value;
 
    // Insert a task into the collection
    Solutions.insert({
      problemid: Session.get('pathid'),
      answer: text,
      createdAt: new Date(), // current time
      author: Meteor.user().username,
      upvotes: 0,
      downvotes: 0,
      Upvoters: [],
      Downvoters: [],
    },
    function(err)
    {
      // Clear form if no error
      if(!err)
      {
        target.answer.value = '';  
      }
    }
    );
 
    // Clear form
    //target.answer.value = '';
  },
});


Template.NewSolution.helpers({
  solutions: function () {
    // ...
    return Solutions.find({problemid: Session.get('pathid')}, {
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

Template.NewSolution.events({
  'click .upvote': _.throttle( function( e,  t ) {
     e.preventDefault();
     var id = $(e.currentTarget).data( 'id' );

     //get this posts array of likers
     //var res = Problems.find( { _id: id}, { voters: 1}).fetch()[0].name;
     var res1 = Solutions.find({_id: id}, {
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

     var res2 = Solutions.find({_id: id}, {
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
      Solutions.update( { _id: id },  { $inc: { upvotes: -1 } ,  $pull: { Upvoters:  Meteor.userId() } });
      }
      else{
        //means it's in downvoters since it passed parent if condition
        Solutions.update( { _id: id },  { $inc: { upvotes: 1 } ,  $push: { Upvoters:  Meteor.userId() } });
        Solutions.update( { _id: id },  { $inc: { downvotes: -1 } ,  $pull: { Downvoters:  Meteor.userId() } });
      }
      
    }
    else{
      //otherwise, allow like and save it
      Solutions.update( { _id: id },  { $inc: { upvotes: 1 } ,  $push: { Upvoters:  Meteor.userId() } });      
    }    
  }, 1000 ),


// downvote buttton events

  'click .downvote': _.throttle( function( e,  t ) {
     e.preventDefault();
     var id = $(e.currentTarget).data( 'id' );

     //get this posts array of likers
     //var res = Problems.find( { _id: id}, { voters: 1}).fetch()[0].name;
     var res1 = Solutions.find({_id: id}, {
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

     var res2 = Solutions.find({_id: id}, {
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
      Solutions.update( { _id: id },  { $inc: { downvotes: -1 } ,  $pull: { Downvoters:  Meteor.userId() } });
      }
      else{
        //means it's in downvoters since it passed parent if condition
        Solutions.update( { _id: id },  { $inc: { downvotes: 1 } ,  $push: { Downvoters:  Meteor.userId() } });
        Solutions.update( { _id: id },  { $inc: { upvotes: -1 } ,  $pull: { Upvoters:  Meteor.userId() } });
      }
      
    }
    else{
      //otherwise, allow like and save it
      Solutions.update( { _id: id },  { $inc: { downvotes: 1 } ,  $push: { Downvoters:  Meteor.userId() } });      
    }
  }, 1000 ),
}
);