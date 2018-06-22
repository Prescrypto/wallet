function save_key(private_key, public_key){
  //Save keys in localforage
  localforage.setItem('privatekey', private_key);
  localforage.setItem('publickey', public_key);
  console.log("Set keys on Localstorage");
}

//Graphics Test
google.charts.load('current', {
  'packages':['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});

function map_test(){
  // Create a map graph
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Popularity'],
    ['Unknown', 0],
  ]);
  var options = {};
  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});

function chart_test(){
  // Create a pie graph
  var data = google.visualization.arrayToDataTable([
    ['Region', 'Percentage'],
    ['Unknown',     100],
  ]);
  var options = {
    title: 'Ancestry Chart'
  };
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}
