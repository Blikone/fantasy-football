function PlayerController() {
    var playerService = new PlayerService(); 

    $('.new-player-form').on('submit', function addPlayer(event) {
        // debugger;
        event.preventDefault();
        var form = event.target;
        playerService.addPlayer(form.playerName.value, form.playerPosition.value, form.playerJersey.value);
        updateRoster(playerService.getPlayers());
    });

    $('.player-roster').on('click', 'button.remove-player', function removePlayer() {
        playerService.removePlayer(this.id);
        updateRoster(playerService.getPlayers());
    });

    function updateRoster(playerList) {
        var roster = $('.player-roster');
        var template = '';
        for (var i = 0; i < playerList.length; i++) {
            var player = playerList[i];
            template += `
                <div class="player-card">
                    <button type="button" class="btn btn-default remove-player" id="${player.id}">Remove Player</button>
                    <br/>
                    <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
                    <h3>${player.name}</h3>
                    <h4>${player.position}</h4>
                    <h1>${player.jersey}</h1>
                </div>
            `
        }
        roster.empty();
        roster.append(template);
    }

}
PlayerController();