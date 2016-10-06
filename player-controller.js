function PlayerController() {
    ///////////////////////////////////////////
    ///////Initialize new Player Service///////
    ///////////////////////////////////////////
    var playerService = new PlayerService();

    /////////////////////////////////////
    ///////Update Roster functions///////
    /////////////////////////////////////
    function updateRoster(playerList) {
        var roster = $('.player-roster');
        var template = '';
        for (var i = 0; i < playerList.length; i++) {
            var player = playerList[i];
            template += `
                <div class="player-card ${player['pro_team']}">
                    <button type="button" class="btn btn-default add-to-team" id="${player.id}">Add to Team</button>
                    <br/>
                    <img src="${player.photo.replace('http', 'https')}" class="player-photo">
                    <h3>${player.fullname}</h3>
                    <h4>${player.position}</h4>
                    <h1>${player.jersey ? player.jersey : ''}</h1>
                </div>
            `
        }
        roster.empty();
        roster.append(template);
    }

    function updateMyRoster(playerList) {
        var roster = $('.my-player-roster');
        var template = '';
        for (var i = 0; i < playerList.length; i++) {
            var player = playerList[i];
            template += `
                <div class="my-player-card ${player['pro_team']}">
                    <button type="button" class="btn btn-default remove-from-team" id="${player.id}">You're Fired</button>
                    <br/>
                    <img src="${player.photo.replace('http', 'https')}" class="player-photo">
                    <h3>${player.fullname}</h3>
                    <h4>${player.position}</h4>
                    <h1>${player.jersey ? player.jersey : ''}</h1>
                </div>
            `
        }
        roster.empty();
        roster.append(template);
    };

    //////////////////////////////////////////
    ///////Load initial NFL master list///////
    //////////////////////////////////////////
    updateRoster(playerService.getFreeNFL());
    // playerService.loadNFL(updateRoster);

    ///////////////////////////////////////
    ///////Communicating with memory///////
    ///////////////////////////////////////
    this.retrieveTeam = function() {
        playerService.retrieveTeam();
        updateRoster(playerService.getFreeNFL());
        updateMyRoster(playerService.getMyPlayers());
    }
    $('.save-team').on('click', function() {
        playerService.saveTeam();
    })
    $('.load-team').on('click', this.retrieveTeam);


    /////////////////////////////////
    ///////Filtering Functions///////
    /////////////////////////////////
    var team = '*';
    var position = '*'
    var squad = ''

    $('.filter-bar').on('submit', function (team, position, squad) {
        event.preventDefault();
        var form = event.target;
        team = form.pickTeam.value;
        position = form.pickPosition.value;
        updateRoster(playerService.filterNFL(team, position, squad));
    });
    $('.showOffense').on('click', function (squad) {
        squad = 'offense';
        updateRoster(playerService.filterNFL(team, position, squad));
        $('.showOffense').removeClass('btn-default').addClass('active btn-success');
        $('.showDefense').removeClass('active btn-success').addClass('btn-default');
    })
    $('.showDefense').on('click', function (squad) {
        squad = 'defense';
        updateRoster(playerService.filterNFL(team, position, squad));
        $('.showDefense').removeClass('btn-default').addClass('active btn-success');
        $('.showOffense').removeClass('active btn-success').addClass('btn-default');
    })


    /////////////////////////////////////////
    ///////Adding and Removing Players///////
    /////////////////////////////////////////

    $('.player-roster').on('click', 'button.add-to-team', function () {
        playerService.selectPlayer(this.id);
        updateRoster(playerService.getFreeNFL());
        updateMyRoster(playerService.getMyPlayers());
    });

    $('.my-player-roster').on('click', 'button.remove-from-team', function () {
        playerService.removePlayer(this.id);
        updateRoster(playerService.getFreeNFL());
        updateMyRoster(playerService.getMyPlayers());
    });


    ///////////////////////////////////////////
    ///////Receive input for new players///////
    ///////////////////////////////////////////
    $('.new-player-form').on('submit', function addPlayer(event) {
        event.preventDefault();
        var form = event.target;
        playerService.addPlayer(form.playerName.value, form.playerPosition.value, form.playerJersey.value);
        updateRoster(playerService.getFreeNFL());
    });

    $('.player-roster').on('click', 'button.remove-player', function removePlayer() {
        playerService.removePlayer(this.id);
        updateRoster(playerService.getFreeNFL());
    });


    /////////////////////////
    ///////Invoke Self///////
    /////////////////////////
}
PlayerController();

