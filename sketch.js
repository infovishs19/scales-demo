var data = [];
var ready = false;

//will map weekday (Monday, Tuesday,...) to y position
var dayScale = d3.scalePoint();

//maps hours (0,1,2,3,...,23) to x position
var hourScale = d3.scaleLinear();

//maps count to a circle radius
var rScale = d3.scaleSqrt();

//maps category (Home, Outside) to color
var colorScale = d3.scaleOrdinal();

var maxCount = 0;

function setup() {
  createCanvas(800, 600);

  d3.csv("aweekofmirrors.csv", function (d) {

    return {
      time: +d.Time,
      weekday: d.Weekday,
      count: +d.Count,
      category: d.Category
    };
  }).then(function (csv) {
    data = csv;
    ready = true;

    //create scales
    //get all weekdays
    var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // var weekdays = d3.set(data,function(d){
    //   return d.weekday;
    // }).values();

    dayScale.domain(weekdays)
      .range([0, 500]);

    hourScale.domain([0, 23])
      .range([0, 700]);

    //get the largest count
    let maxCount = d3.max(data, function (d) {
      return d.count;
    });

    rScale.domain([0, maxCount])
      .range([0, 70]);

    colorScale.domain(['Home', 'Outside'])
      .range(['steelblue', 'grey']);

  });

}

function draw() {

  if (!ready) {
    background(255, 0, 0);
    return;
  } else {
    background(255);
  }

  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    var x = hourScale(d.time);
    var y = dayScale(d.weekday);

    //center point
    stroke(0);
    ellipse(x, y, 5, 5);

    //circle for number of mirror views (count)

    if (d.count > 0) {
      var r = rScale(d.count);
      var c = colorScale(d.category);
      noFill();
      stroke(c);
      ellipse(x, y, r, r);
    }
  }
}