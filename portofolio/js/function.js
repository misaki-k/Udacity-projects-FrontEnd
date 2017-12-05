function MyViewModel() {
 'use strict';
  var self = this;
  self.locations = ko.observableArray(locations);
  self.filterText = ko.observable('');
  //this function is for filtering the search input 
  self.filteredItems = ko.computed(function() {
  var filter = self.filterText().toLowerCase();
	if (!self.filterText()) {
		for(var i = 0; i < markers.length; i++){
			markers[i].setVisible(true);
		}
		return self.locations();
	} else {
		return ko.utils.arrayFilter(self.locations(), function(item) {
			if(item.title.toLowerCase().indexOf(filter) !== -1){
				item.marker.setVisible(true);
			} else{
				if(item.infoWindow){
					item.infoWindow.close();
				}
				item.marker.setVisible(false);
			}
			return item.title.toLowerCase().indexOf(filter) !== -1;
		});
	}
}, self);

	
	
	
  self.openInfo = function(location) {
	// when the item is in the list in the view clicked, infowindow opens.
    google.maps.event.trigger(location.marker, "click");
    document.getElementById("dropdownmenu").classList.toggle("show");
  };
}
/* When the user clicks on the button,
  	toggle between hiding and showing the dropdown content */
self.opendropdownmenu = function() {
	document.getElementById("dropdownmenu").classList.toggle("show");
};

//This function gets the information from foursquare API
 function getFourSquareData(marker, infoWindow) {

    var base_url = "https://api.foursquare.com/v2/venues/";
    var venue_id = marker.foursquare;
    var v = "&v=20170801";

    var client_Id = "TUMEFFUD0O4XKFUR1GCUCHX5ZZG5NRICRGF4BKEHHU12E1LE";
    var client_Secret = "13HO0VXLAZ2B4PK0KGJBLBYXOBSP1BGZTT3RSXVIIZ3ZYH4R";

       $.ajax({
		   type: "GET",
		   url: base_url + venue_id + "?client_id=" + client_Id + "&client_secret=" + client_Secret + v
       }).done(function(results) {
			 var location_Info = "<div id='location_Info'>" + "<h2>" + results.response.venue.name + "</h2>" + "<p><a href='" + results.response.venue.canonicalUrl +"' target=_blank>" + "This place's website" + "</a></p>" + "<p><img src='" + results.response.venue.bestPhoto.prefix + "300x300" + results.response.venue.bestPhoto.suffix  + "' alt='picture of the location'></p>" + "<p class='address'>" + results.response.venue.location.address + "</p>" + "</div>";
			 infoWindow.setContent(location_Info);
			 infoWindow.open(map, marker);
       }).fail(function(error) {
			 window.alert('We could not find that location - try entering a more' + ' specific place.');
       });
    }


var map;

// Create a new blank array for all the listing markers.
var markers = [];


function initMap() {
  // Create a styles array to use with the map.
  var styles = [{
    featureType: 'water',
    stylers: [{
      color: '#19a0d8'
    }]
  }, {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [{
        color: '#ffffff'
      },
      {
        weight: 6
      }
    ]
  }, {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#e85113'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{
        color: '#efe9e4'
      },
      {
        lightness: -40
      }
    ]
  }, {
    featureType: 'transit.station',
    stylers: [{
        weight: 9
      },
      {
        hue: '#e85113'
      }
    ]
  }, {
    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{
      lightness: 100
    }]
  }, {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{
      lightness: -100
    }]
  }, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{
        visibility: 'on'
      },
      {
        color: '#f0e4d3'
      }
    ]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{
        color: '#efe9e4'
      },
      {
        lightness: -25
      }
    ]
  }];

  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 34.906968,
      lng: 136.916983
    },
    //position:   ,
    zoom: 15,
    styles: styles,
    mapTypeControl: false
  });


  // Style the markers a bit. This will be our listing marker icon.
  var defaultIcon = makeMarkerIcon('0091ff');

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('FFFF24');

  var infoWindow = new google.maps.InfoWindow();
  

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    var foursquare = locations[i].foursquare;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i,
      foursquare: foursquare
    });
    myViewModel.locations()[i].marker = marker;
	  
    // Push the marker to our array of markers.
    markers.push(marker);
 
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function(e) {
      getFourSquareData(this, infoWindow);
	  toggleBounce(this);
	  map.setZoom(18);
 	  map.panTo(this.position);
	 
    });
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  }

  function toggleBounce(marker) {
	for(var i = 0; i < markers.length; i++){
		if(marker !== markers[i]){
			markers[i].setAnimation(null);
		} else{
			marker.setAnimation(google.maps.Animation.BOUNCE);
			TimeOut(marker);
		}
	} 
 }
  showListings(); 
}


// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
 google.maps.event.addDomListener(window, 'resize', function() {
  map.fitBounds(bounds); // `bounds` is a `LatLngBounds` object
});
}




// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34));
  return markerImage;
}

// This function takes the input value in the find nearby area text input
// locates it, and then zooms into that area. This is so that the user can
// show all listings, then decide to focus on one area of the map.
function zoomToArea() {
  // Initialize the geocoder.
  var geocoder = new google.maps.Geocoder();
  // Get the address or place that the user entered.
  myViewModel.filterText.value = address;
  // Make sure the address isn't blank.
  if (address == '') {
    window.alert('You must enter an area, or address.');
  } else {
    // Geocode the address/area entered to get the center. Then, center the map
    // on it and zoom in
    geocoder.geocode({
      address: address,
      componentRestrictions: {
        locality: 'Japan'
      }
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(18);
      } else {
        window.alert('We could not find that location - try entering a more' +
          ' specific place.');
      }
    });
  }
}

	//This is called when Google API can not be loaded.
	function errorGoogle() {
		window.alert('Your API is NOT Valid. Please check again');
}

	function TimeOut(marker) {
		window.setTimeout(function() {
			marker.setAnimation(null);
		}, 3000);
	}


var myViewModel = new MyViewModel();

ko.applyBindings(myViewModel);
