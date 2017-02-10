Solutions = new Mongo.Collection('solutions');

// SolutionSchema = new SimpleSchema({
// 	problemid: {
// 		type: String,
// 		label: "Problem ID",
// 		autoform: {
// 			type: "hidden"
// 		}
// 	},
// 	answer: {
// 		type: String,
// 		label: "Answer"
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At",
// 		autoValue: function() {
// 			return new Date();
// 		},
// 		autoform: {
// 			type: "hidden"
// 		}
// 	},
// 	author: {
// 		type: String,
// 		label: "Author",
// 		autoValue: function() {
// 			return this.userId;
// 		},
// 		autoform: {
// 			type: "hidden"
// 		}
// 	}	
// });

// Solutions.attachSchema(SolutionSchema);