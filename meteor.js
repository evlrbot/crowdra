Moves = new Meteor.Collection('moves');

if(Meteor.isClient) {
    Meteor.startup(function () {
        // array of user colors
        var user_colors = ["#1f77b4","#aec7e8","#ff7f0e",
			   "#ffbb78","#2ca02c","#98df8a", 
			   "#d62728","#ff9896","#9467bd", 
			   "#c5b0d5","#8c564b","#c49c94",
			   "#e377c2","#f7b6d2","#7f7f7f",
			   "#c7c7c7","#bcbd22","#dbdb8d", 
			   "#17becf","#9edae5"];

	// randomly assign the current user color
        Session.set("mycolor",user_colors[Math.floor(Math.random()*user_colors.length)]);
	
	// build the board? 
    });

    // build a table of X x Y cells with a class of classname
    // each cell will have an id attribute of its x-y
    Template.grid.build = function (x,y,classname) {
        var grid = "<table class='"+classname+"'>";
        for (var i = 0; i< x; i++) {
            grid += "<tr>";
            for (var j=0; j<y; j++)
            {
                var id = i+"-"+j;
                grid += "<td id='"+id+"'></td>"
            }
            grid += "</tr>\n";
        }
        return grid += "</table>";
    }

    Template.grid.events({
        'click table td' : function(e) {
            box = $(e.currentTarget);          // get the clicked box
	    box.css("background-color",Session.get('mycolor'));  // set the cell bkg to user color
	    id = box.attr('id');               // get box ID for this move
	    timestamp = new Date().getTime();  // set a timestamp for this move
	    move = {id:id, timestamp:timestamp}// create this move object
	    Meteor.call('push',move);          // push the move object onto the move list	    
        }
    });    

} // end of is client

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
   
    Meteor.methods({
        'push' : function(move) {
	    if(move) {
		Moves.insert(move);
	    }
        }
    });
}
