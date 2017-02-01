Problems = new Mongo.Collection('problems');

Tags = new SimpleSchema({
	name: {
		type: String,
		label: "Tags"
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
		type: [Tags]
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
	}
});

Problems.attachSchema(ProblemSchema);