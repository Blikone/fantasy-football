function PlayerService() {

////To Do: enable storage and retrieval of team data in local memory
////Bonus: Create a user constructor that would allow the creation of multiple users all pulling players from the same NFL pool 



    //////////////////////////////////
    ///////Get players from API///////
    //////////////////////////////////
    this.loadNFL = function loadNFL(callback) {
        var apiUrl = "https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        
        var localData = localStorage.getItem('rawData');
        if (localData) {
            var rawData = JSON.parse(localData);
            // console.log(rawData[4]);
            console.log(rawData[Math.ceil(Math.random()*100)]);
            return callback(rawData);
        }
        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endPointUrl = url + encodeURIComponent(apiUrl);
        $.getJSON(endPointUrl, function (data) {
            var rawData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('rawData', JSON.stringify(rawData))
            console.log('Finished Writing Player Data to localStorage')
            callback(rawData)
        });
    }
    /////////////////////////////////////////////////////////////
    ///////Alter to remove free agents: Create master list///////
    /////////////////////////////////////////////////////////////
    function vetPlayers(rawList) {
        var vettedList = rawList.filter(function(player) {
            if (player.fullname == player.lastname) {
                return true;
            };
            if (player.jersey) {
                return true;
            };
        });
        return vettedList;
    }
    var _mutableNFLData = this.loadNFL(vetPlayers)

    
    //////////////////////////////////////////
    ///////Hold and filter picking pool///////
    //////////////////////////////////////////
    this.filterNFL = function (team, position, squad) {
        var filteredPlayers = _mutableNFLData.filter(function(player) {
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
        var filterBySquad = filteredPlayers.filter(function(player) {
            switch (squad) {
                case 'offense':
                    if (player.fullname !== player.lastname) {
                        return true;
                    };
                    break;
                case 'defense':
                    if (player.fullname === player.lastname) {
                        return true;
                    };
                    break;
                default:
                    return true;
            }
        });
        return filterBySquad;
    };

    ////////////////////////////
    ///////Hold all teams///////
    ////////////////////////////
    var _allTeams = {};
    
    var _myPlayers = [];
    this.getMyPlayers = function() {
        return _myPlayers;
    }

    this.getFreeNFL = function() {
        return _mutableNFLData;
    }

    //////////////////////////////////////////////////////
    ///////Store in and retrieve from Local Storage///////
    //////////////////////////////////////////////////////

    this.saveTeam = function() {
        var myTeam = this.getMyPlayers();
        localStorage.setItem('my-team', JSON.stringify(myTeam))
    }

    this.retrieveTeam = function() {
        var team = localStorage.getItem('my-team');
        var pool = this.getFreeNFL();
        if (team) {
            team = JSON.parse(team);
        } else {
            team = [];
        };
        for (var i = 0; i < team.length; i ++) {
            for (var j = 0; j < pool.length; j++) {
                if (team[i].id == pool[j].id) {
                    pool.splice(j,1);
                };
            };
        };
        _mutableNFLData = pool;//////I'm really not sure about this.  
        _myPlayers = team;///////////Seems it's not properly encapsulated.
        return team;
    };
    
    /////////////////////////////////////
    ///////Tap players for my team///////
    /////////////////////////////////////
    this.selectPlayer = function(id) {
        // console.log(this.getMyPlayers())
        var playerList = _mutableNFLData;
        for (let i = 0; i<playerList.length; i++) {
            if (playerList[i].id == id) {
                _myPlayers.push(playerList.splice(i,1)[0]);
                // console.log(this.getMyPlayers())
                return;
            }
        }
    }

    ////////////////////////////////////////////////
    ///////Send unwanted players back to pool///////
    ////////////////////////////////////////////////
    this.removePlayer = function(id) {
        var playerList = _myPlayers;
        for (let i = 0; i<playerList.length; i++) {
            if (playerList[i].id == id) {
                _mutableNFLData.push(playerList.splice(i,1)[0]);
                return;
            }
        }
    }

    ///////////////////////////////
    ///////Create new player///////
    ///////////////////////////////
    function Player(playerName, playerPosition, playerJersey) {
        this.fullname = playerName;
        this.position = playerPosition;
        this.jersey = playerJersey;
        this.firstName = this.fullname.split(' ')[0];
        this.id = this.fullname.split(' ').join('-');
        this.photo = "http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"
    }







}

