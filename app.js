var Players = [];



// $('form').on('submit', function(event) {  //We'll learn this tomorrow
function addPlayer(event) {
    event.preventDefault();
    var form = event.target;
    if(form.playerJersey.value[0] === "#") {
        form.playerJersey.value = form.playerJersey.value.substr(1);
    }
    var player = new Player(form.playerName.value, form.playerPosition.value, form.playerJersey.value)
    Players.push(player);

    // var playerId = player.name.split(' ').join('');
    // var roster = $('.player-roster');
    // roster.append(`
    //     <div class="player-card" id="${playerId}">
    //         <button type="button" class="btn btn-default" onclick="removePlayer(${playerId})">Remove Player</button>
    //         <br/>
    //         <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
    //         <h3>${form.playerName.value}</h3>
    //         <h4>${form.playerPosition.value}</h4>
    //         <h1>${form.playerJersey.value}</h1>
    //     </div>
    // `)


    update();
}

function updateRoster(array) {
    var roster = $('.player-roster');
    var template = '';
    for (var i = 0; i < array.length; i++) {
        var player = array[i];
        var playerId = player.name.split(' ').join('-');
        template += `
            <div class="player-card" id="${playerId}">
                <button type="button" class="btn btn-default" onclick="removePlayer(${playerId})">Remove Player</button>
                <br/>
                <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
                <h3>${form.playerName.value}</h3>
                <h4>${form.playerPosition.value}</h4>
                <h1>${form.playerJersey.value}</h1>
            </div>
        `
    }
    roster.empty();
    roster.append(template);

};

$('.new-player-form').on('submit', addPlayer);

function removePlayer(playerId) {
    $("#" + playerId).remove();
}

// function addPlayer(event) {
//     event.preventDefault();
// }