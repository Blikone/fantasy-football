function PlayerService() {
    var _players = [];

    function Player(playerName, playerPosition, playerJersey) {
        this.name = playerName;
        this.position = playerPosition;
        this.jersey = playerJersey;
        this.firstName = this.name.split(' ')[0];
        this.id = this.name.split(' ').join('-');
        this.image = "http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/"
    }

    this.getPlayers = function() {
        return _players;
    };

    this.addPlayer = function(playerName, playerPosition, playerJersey) {
        if (!playerName || !playerPosition || !playerJersey) {
            return;
        }
        var player = new Player(playerName, playerPosition, playerJersey);
        _players.push(player);
    };

    this.removePlayer = function(id) {
        for (var i = 0; i < _players.length; i++) {
            if (_players[i].id = id) {
                _players.splice(i, 1);
            };
        };
    };


}