function PlayerController() {
    var playerService = new PlayerService(); 

    $('.filter-bar').on('submit', function filterPlayers(team, position) {
        // debugger;
        event.preventDefault();
        var form = event.target;
        var team = form.pickTeam.value;
        var position = form.pickPosition.value;
        var filteredPlayers = JSON.parse(localStorage.getItem('playerData')).filter(function(player) {
            if (team == "*" && position == "*") {
                return true;
            }
            if (team == "*" && player.position == position) {
                return true;
            }
            if (player['pro_team'] == team && position == "*") {
                return true;
            }
            if (player['pro_team'] == team && player.position == position){
                return true;
            };
        });
        updateRoster(filteredPlayers);
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

    $('.showOffense').on('click', function showOffense() {
        var filteredPlayers = JSON.parse(localStorage.getItem('playerData')).filter(function(player) {
            if (player.fullname !== player.lastname) {
                return true;
            }
        });
        updateRoster(filteredPlayers);
        $('.showOffense').removeClass('btn-default').addClass('active btn-success');
        $('.showDefense').removeClass('active btn-success').addClass('btn-default');
    })
    $('.showDefense').on('click', function showDefense() {
        var filteredPlayers = JSON.parse(localStorage.getItem('playerData')).filter(function(player) {
            if (player.fullname === player.lastname) {
                return true;
            }
        })
        updateRoster(filteredPlayers);
        $('.showDefense').removeClass('btn-default').addClass('active btn-success');
        $('.showOffense').removeClass('active btn-success').addClass('btn-default');
    })

    function updateRoster(playerList) {
        var roster = $('.player-roster');
        var template = '';
        for (var i = 0; i < playerList.length; i++) {
            var player = playerList[i];
            template += `
                <div class="player-card">
                    <button type="button" class="btn btn-default add-to-team" id="${player.id}">Add to Team</button>
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