Problems = new Mongo.Collection('problems');

Tags = new SimpleSchema({
	name: {
		type: String,
	}
});


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
		type: [Tags],
		label: "Tags"
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