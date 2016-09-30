function PlayerController() {
    var playerService = new PlayerService();

    $('.new-player-form').on('submit', function addPlayer(event) {
        event.preventDefault();
        var form = event.target;
        playerService.addPlayer(form.playerName.value, form.playerPosition.value, form.playerJersey.value);
        updateRoster(playerService._players);
    });

    function removePlayer(id) {

    }

    function updateRoster(playerList) {
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
    }

}