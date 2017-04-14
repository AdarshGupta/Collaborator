Problems = new Mongo.Collection('problems');

// Tags = new SimpleSchema({
// 	name: {
// 		type: String,
// 	}
// });


ProblemSchema = new SimpleSchema({
	problem: {
		type: String,
		label: "Problem"
	},
	description: {
		type: String,
		label: "Description"
	},
	tag: {
		type: String,
      	optional: true,
      	label: "Category",
	    autoform: {
	        type: 'select',
	        options: function (){
	        	return[{label:"Environment",value:"Environment"},{label:"Commerce & Trade",value:"Commerce & Trade"},{label:"Culture",value:"Culture"},
	        	{label:"Travel & Transport",value:"Travel & Transport"},{label:"Science & Technology",value:"Science & Technology"},{label:"Energy",value:"Energy"},
	        	{label:"Family / Community / Society",value:"Family / Community / Society"},{label:"HealthCare",value:"HealthCare"},{label:"Education",value:"Education"},
	        	{label:"Psychological",value:"Psychological"}, {label:"Government",value:"Government"}
	        	]
	        }
	    }
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function() {
			return this.userId;
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date();
		},
		autoform: {
			type: "hidden"
		}
	},
	upvotes : {
		type : Number,
		label: "Upvote Count",
		autoValue: function() {
			if (this.isInsert) {
        		return 0;
      		}
		},
		autoform: {
			type: "hidden"
		}
	},
	downvotes : {
		type : Number,
		label: "Downvote Count",
		autoValue: function() {
			if (this.isInsert) {
        		return 0;
      		}
		},
		autoform: {
			type: "hidden"
		}
	},
	Upvoters: {
		type: [String],
    	label: "Voters",
    	defaultValue: [],
    	minCount: 0,
		autoform: {
			type: "hidden"
		}
	},
	Downvoters: {
		type: [String],
    	label: "DownVoters",
    	defaultValue: [],
    	minCount: 0,
		autoform: {
			type: "hidden"
		}
	}
});


Problems.attachSchema(ProblemSchema);