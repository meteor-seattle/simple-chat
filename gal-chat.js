ChatMessages = new Mongo.Collection('chatmessages');

if (Meteor.isClient) {
  Template.messageBox.events({
    'click #sendMessage, keydown #myMessage': function(e,t) {
      if(!e.keyCode || e.keyCode === 13) {
        e.preventDefault();
        enterMessage();
      }
    }
  });

  Template.clearMessages.events({
    'click #clearAllMessages': function(e,t) {
      Meteor.call('removeMessages')
    }
  });

  function enterMessage(newMessage) {
    var newMessage = $('#myMessage').val();
    console.log(newMessage);
    ChatMessages.insert({
      message: newMessage,
      timestamp: new Date()
    });
    $("#myMessage").val('');
  }

  Template.chatMessages.helpers({
    'allMessages': function(){
      return ChatMessages.find({},{sort: {timestamp: -1}});
    }
  });

  Template.chatMessages.events({
    'click .delMsg': function(e,t) {
      console.log(this._id);
      ChatMessages.remove({_id: this._id})
    }
  })
}

if (Meteor.isServer) {
  Meteor.methods({
    'removeMessages': function() {
      console.log('server here, what do you need')
      ChatMessages.remove({});
      console.log('all are removed')
    }
  })
}
