import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(() => {
  
  Meteor.publish('thePlayers', function(){
  	var currentUserId = this.userId;
  	return PlayersList.find({ createdBy : currentUserId });
  });

});
	Meteor.methods({
		'addPlayer': function(playerNameVar){
			check(playerNameVar, String);
			var currentUserId = Meteor.userId();
			if (currentUserId) {
				PlayersList.insert({
					name      : playerNameVar,
					score     : 0,
					createdBy : currentUserId
				});
			}
		},

		'removePlayer' : function(selectedPlayer){
			check(selectedPlayer, String);
			var currentUserId = Meteor.userId();
			if(currentUserId){
				PlayersList.remove({ _id: selectedPlayer, createdBy: currentUserId});
			}
		}, 

		'updateScore': function(selectedPlayer, scoreVal){
			check(selectedPlayer, String);
			check(scoreVal, Number);
			var currentUserId = Meteor.userId();
			if(currentUserId){
				PlayersList.update({ _id: selectedPlayer, createdBy: currentUserId }, { $inc: { score: scoreVal} });
			}
		}
	});
