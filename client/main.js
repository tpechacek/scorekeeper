import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Players } from '../imports/api/players';

const renderPlayers = (playersList) => {
  return playersList.map((player) => {
    return (
      <p key={player._id}>
        {player.name} has {player.score} point(s).
        <button onClick={() => {
          Players.update({_id: player._id}, { $inc: {score: 1}});
        }}>+1</button>
        <button onClick={() => {
          Players.update({_id: player._id}, { $inc: {score: -1}});
        }}>-1</button>
        <button onClick={() => {
          Players.remove({_id: player._id });
        }}>X</button>
      </p>
    );
  });
  
  // ES6 syntax!
  // return numbers.map(a => {
  //   return <p key={a.val}>{a.val}</p>
  // });
};

const handleSubmit = (event) => {
  let playerName = event.target.playerName.value;
  
  event.preventDefault();
  
  if (playerName) {
    event.target.playerName.value = '';
    Players.insert({
      name: playerName,
      score: 0
    });
  }
};

Meteor.startup(() => {
  // Call tracker.autorun
  // Create variable called players -> set equal to Players.find().fetch())
  // Render players to the screen
  Tracker.autorun(() => {
    let players = Players.find().fetch();
    let title = 'Score Keep';
    let name = 'Taylor';
    let jsx = (
      <div>
        <h1>{title}</h1>
        <p>Hello {name}</p>
        <p>Below is the list of scores.</p>
        {renderPlayers(players)}
        
        <form onSubmit={handleSubmit}>
          <input type="text" name="playerName" placeholder="Player name" />
          <button>Add Player</button>
        </form>
      </div>
    );
    
    ReactDOM.render(jsx, document.getElementById('app'));
  });
});