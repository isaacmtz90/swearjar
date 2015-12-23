$(document).ready(function () {
    //Set up some globals
    var dollie_count,
        bunny_count;

    //Create a reference to the pixel data for our drawing.
    var moneyDataRef = new Firebase('https://swearjarme.firebaseio.com/money');






    var updateBoard = function () {

        moneyDataRef.child('dollie').on('value', function (snapshot) {
            dollie_count = snapshot.val();
            $('#dollie_score').text("Dollie owes: " + dollie_count);
        });
        moneyDataRef.child('bunny').on('value', function (snapshot) {
            bunny_count = snapshot.val();
            $('#bunny_score').text("Bunny owes: " + bunny_count);
        });
    };
    
    

    var add_to = function (who) {
        console.log(who +" sweared");
        if (who === 'dollie') {
            dollie_count += 1;
            moneyDataRef.update({dollie: dollie_count});
        }
        if (who === 'bunny') {
            bunny_count += 1;
            moneyDataRef.update({bunny: bunny_count});
        }
        updateBoard();
    };

    moneyDataRef.on('child_changed', updateBoard);

    $("#btn_dollie").bind('click', function () {
        add_to('dollie');
    });
    $("#btn_bunny").bind('click', function () {
        add_to('bunny');
    });
    updateBoard();

});