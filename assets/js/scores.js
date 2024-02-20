function printHighscores() {
  // either get scores from local storage or set to an empty array
  var highscores = JSON.parse(window.localStorage.getItem('highScores')) || [];

  // sort highscores by score property in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  var olEl = document.getElementById('highscores');

  for (var i = 0; i < highscores.length; i += 1) {
    // create li tag for each high score
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    // display on page
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highScores');
  window.location.reload();
}

// run function when page loads
printHighscores();

document.getElementById('clear').onclick = clearHighscores;

