function PlayerController() {
    var playerService = new PlayerService(); 

    $('button.filter-players').on('submit', function filterPlayers(team, position) {
        event.preventDefault();
        var form = event.target;
        var team = form.pickTeam.value;
        var position = form.pickPosition.value;
        var filteredPlayers = playerService.getPlayers().filter(function(player) {
            if (player['pro_team'] == team && player.position == position){
                return true;
            };
        });
    });

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
                    <img src="${player.photo.replace('http','https')}" class="player-photo">
                    <h3>${player.fullname}</h3>
                    <h4>${player.position}</h4>
                    <h1>${player.jersey}</h1>
                </div>
            `
        }
        roster.empty();
        roster.append(template);
    }
    playerService.getNFL(updateRoster)

}
PlayerController();