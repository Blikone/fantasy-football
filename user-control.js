var userCount = 1;

function User(name) {
    this.name = name;
    this.id;
    this.setId = function() {
        this.id = userCount;
        userCount++;
    }
}