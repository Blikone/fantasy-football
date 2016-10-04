function PlayerService() {

    //////////////////////////////////
    ///////Get players from API///////
    //////////////////////////////////
    this.loadNFL = function loadNFL(callback) {
        var apiUrl = "https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        
        var localData = localStorage.getItem('rawData');
        if (localData) {
            var rawData = JSON.parse(localData);
            console.log(rawData[4]);
            // console.log(rawData[Math.ceil(Math.random()*100)]);
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

    //////////////////////////
    ///////Hold my team///////
    //////////////////////////
    var _myPlayers = [];
    this.getMyPlayers = function() {
        return _myPlayers;
    }

    this.getNFL = function() {
        return _mutableNFLData;
    }
    
    /////////////////////////////////////
    ///////Tap players for my team///////
    /////////////////////////////////////
    this.selectPlayer = function(id) {
        var playerList = _mutableNFLData;
        for (let i = 0; i<playerList.length; i++) {
            if (playerList[i].id == id) {
                _myPlayers.push(playerList.splice(i,1));
                return;
            }
        }
    }

    ////////////////////////////////////////////////
    ///////Send unwanted players back to pool///////
    ////////////////////////////////////////////////
    this.refusePlayer = function(id) {
        var playerList = _myPlayers;
        for (let i = 0; i<playerList.length; i++) {
            if (playerList[i].id == id) {
                _mutableNFLData.push(playerList.splice(i,1));
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







    /**     TO DO LIST
     * Be able to filter player bank by position or by team via dropdown menu
     * Move player from player bank to my team by clicking a button
     * [Move player back off my team via similar button]
     * Special case for choosing whole defensive line of a team (we only select the offensive line individually)
     */

    // this.getPlayersByTeam = function (teamName) {
    //     playerData.filter(function (player) {
    //         if (player.team == teamName) {
    //             return true;
    //         };
    //     });
    // };

    // this.getPlayersByPosition = function (position) {
    //     playerData.filter(function (player) {
    //         if (player.position == position) {
    //             return true;
    //         };
    //     });
    // };

//     function vetPlayers(unfilteredList) {
//         var filteredList = unfilteredList.filter(function(player) {
//             if (player.fullname == player.lastname) {
//                 return true;
//             };
//             if (player.jersey) {
//                 return true;
//             };
//         });
//         return filteredList;
//     }

//     this.loadNFL = function loadPlayerData(callback) {
//         var apiUrl = "https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
//         //Lets check the localstorage for the data before making the call.
//         //Ideally if a user has already used your site 
//         //we can cut down on the load time by saving and pulling from localstorage 
//         var localData = localStorage.getItem('playerData');
//         if (localData) {
//             var rawPlayerData = JSON.parse(localData);
//             var playerData = vetPlayers(rawPlayerData);
//             console.log(playerData[Math.ceil(Math.random()*100)]);
//             return callback(playerData);
//             //return will short-circuit the loadPlayerData function
//             //this will prevent the code below from ever executing
//         }
//         var url = "https://bcw-getter.herokuapp.com/?url=";
//         var endPointUrl = url + encodeURIComponent(apiUrl);
//         $.getJSON(endPointUrl, function (data) {
//             var rawPlayerData = data.body.players;
//             var playerData = vetPlayers(rawPlayerData);
//             console.log('Player Data Ready')
//             console.log('Writing Player Data to localStorage')
//             localStorage.setItem('playerData', JSON.stringify(playerData))
//             console.log('Finished Writing Player Data to localStorage')
//             callback(playerData)
//         });

//     }


//     function Player(playerName, playerPosition, playerJersey) {
//         this.fullname = playerName;
//         this.position = playerPosition;
//         this.jersey = playerJersey;
//         this.firstName = this.fullname.split(' ')[0];
//         this.id = this.fullname.split(' ').join('-');
//         this.photo = "http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"
//     }

//     var _NFLPlayers = [];
//     var _myPlayers = [];

//     this.getPlayers = function () {
//         return _myPlayers;
//     };

//     this.getNFL = function () {
//         return PlayerService.loadNFL(function(nfl) {
//             return nfl;
//         })
//     }

//     this.addPlayer = function (playerName, playerPosition, playerJersey) {
//         if (!playerName || !playerPosition || !playerJersey) {
//             return;
//         }
//         var player = new Player(playerName, playerPosition, playerJersey);
//         _myPlayers.push(player);
//     };

//     this.selectPlayer = function(player) {

//     }    

//     this.removePlayer = function (id) {
//         for (var i = 0; i < _players.length; i++) {
//             if (_myPlayers[i].id = id) {
//                 _myPlayers.splice(i, 1);
//             };
//         };
//     };

