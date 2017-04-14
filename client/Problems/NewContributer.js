
Template.NewContributer.events({
  'click .new-contributer': function () {
    // ...
    Session.set('newContributer', true);
  },
  'click .fa-close': function () {
    // ...
    Session.set('newContributer', false);
  },


  'submit .new-contributer'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const fullname = target.Fullname.value;
    const interests = target.Interests.value;
    const skills = target.Skills.value;
    const email = target.Email.value;
    const facebooklink = target.facebooklink.value;
    const twitterlink = target.twitterlink.value;
    const githublink = target.githublink.value;
 
    // Insert a task into the collection
    Contributers.insert({
      solutionid: Session.get('pathid'),
      createdAt: new Date(), // current time
      author: Meteor.user().username,
      fullname: fullname,
      interests: interests,
      skills: skills,
      email: email,
      facebooklink: facebooklink,
      twitterlink: githublink,
      githublink: githublink
    },
    );
 
    // Clear form
    target.Fullname.value = '';
    target.Interests.value = '';
    target.Skills.value = '';
    target.Email.value = '';
    target.facebooklink.value = '';
    target.twitterlink.value = '';
    target.githublink.value = '';
  },
});


Template.NewContributer.helpers({
  contributers: function () {
    // ...
    return Contributers.find({solutionid: Session.get('pathid')}, {
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