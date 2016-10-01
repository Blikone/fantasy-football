function PlayerService() {
    var playerData = [];

    /**     TO DO LIST
     * Be able to filter player bank by position or by team via dropdown menu
     * Move player from player bank to my team by clicking a button
     * [Move player back off my team via similar button]
     * Special case for choosing whole defensive line of a team (we only select the offensive line individually)
     */

    this.getPlayersByTeam = function (teamName) {
        playerData.filter(function (player) {
            if (player.team == teamName) {
                return true;
            };
        });
    };

    this.getPlayersByPosition = function (position) {
        playerData.filter(function (player) {
            if (player.position == position) {
                return true;
            };
        });
    };

    function filterPlayers(unfilteredList) {
        var filteredList = unfilteredList.filter(function(player) {
            if (player.fullname == player.lastname) {
                return true;
            };
            if (player.jersey) {
                return true;
            };
        });
        return filteredList;
    }

    this.getNFL = function loadPlayerData(callback) {
        var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playerData');
        if (localData) {
            var rawPlayerData = JSON.parse(localData);
            playerData = filterPlayers(rawPlayerData);
            // console.log(playerData[0]);
            // console.log(playerData[4]);
            return callback(playerData);
            //return will short-circuit the loadPlayerData function
            //this will prevent the code below from ever executing
        }

        var url = "http://bcw-getter.herokuapp.com/?url=";
        var endPointUrl = url + encodeURIComponent(apiUrl);
        $.getJSON(endPointUrl, function (data) {
            var rawPlayerData = data.body.players;
            playerData = filterPlayers(rawPlayerData);
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playerData', JSON.stringify(playerData))
            console.log('Finished Writing Player Data to localStorage')
            callback(playerData)
            console.log(playerData[0]);
            console.log(playerData[5])
        });

    }



    var _myPlayers = [];

    function Player(playerName, playerPosition, playerJersey) {
        this.fullname = playerName;
        this.position = playerPosition;
        this.jersey = playerJersey;
        this.firstName = this.fullname.split(' ')[0];
        this.id = this.fullname.split(' ').join('-');
        this.photo = "http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"
    }

    this.getPlayers = function () {
        return _myPlayers;
    };

    this.addPlayer = function (playerName, playerPosition, playerJersey) {
        if (!playerName || !playerPosition || !playerJersey) {
            return;
        }
        var player = new Player(playerName, playerPosition, playerJersey);
        _myPlayers.push(player);
    };

    this.removePlayer = function (id) {
        for (var i = 0; i < _players.length; i++) {
            if (_myPlayers[i].id = id) {
                _myPlayers.splice(i, 1);
            };
        };
    };


}