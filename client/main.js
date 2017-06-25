import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Players } from '../imports/api/players';

const renderPlayers = function (playersList) {
  return playersList.map(function (player) {
    return (
      <div>
        <p key={player._id}>{player.name} has {player.score} point(s)</p>
      </div>
    );
  });
  
  // ES6 syntax!
  // return numbers.map(a => {
  //   return <p key={a.val}>{a.val}</p>
  // });
};

const handleSubmit = function(event) {
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

Meteor.startup(function () {
  // Call tracker.autorun
  // Create variable called players -> set equal to Players.find().fetch())
  // Render players to the screen
  Tracker.autorun(function () {
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