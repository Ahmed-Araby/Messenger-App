# Messenger App
work on the idea of channels, a bunch of users could make a channel and start chaing on it.

## Simple Diagram of the System.
![Architecture_Diagram](https://github.com/Ahmed-Araby/Messenger-App/blob/master/facebook_messenger_clone.png)

## Screen Shot of a working channel.
![Channel](https://github.com/Ahmed-Araby/Messenger-App/blob/master/channel.png)

## URL
[TO DO --- host the app] 

## want to use the app:
* signin with your google account.
* create a channel.
* send the channel ID to a friend.
* now you have a life long channel with your friend or untill my "firebase free quota ends"
* send the channel ID to a notehr friend
* now you a life long channel with 2 of your friends.

## Technologies Used
* React
* Firebase for Auth 
* fireStore to store the messages and sync messages between users of the same channel.

## App Features:
* sign in with google email using firebase auth
* store user data, channels, messages in firebase RealTimeDatabase.
* Delete Channel
* deleting channel is carried on using firebase transaction as this operation need to delete data from different location in the DB.
* users can create channels
* users can joins channels that are created by others
* user can remove him self from channel
* user see his own messages in different collor then other messages in the channel.
* every change happen in the firebase RealTimeDatabase, Reflect in the UI.

## to do:
- [X] design the Layout of the Data base Documents.
- [X] Build the flow of sending and recieving Messages.
- [X] Build Home Page.
- [X] Make the RealTimeDB functions names more conventional
- [X] Tell the user that he is already in the channel if he is !!.
- [X] Listen on the change in user channels.
- [X] Delete Channel Button.
- [X] Force the messages portion to scroll.
- [ ] Host the App.
- [ ] sync the UI with deleting message from fireBase.
- [ ] Enhance the channel UI
- [ ] Replace Firebase with nodeJs server and socket.IO
