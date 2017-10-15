function MyViewModel() {
  var self = this;
  self.locations = ko.observableArray([{
      title: '新美南吉記念館',
      location: {
        lat: 34.909212,
        lng: 136.911239
      },
	  foursquare: "4b7755d1f964a52000932ee3"
    },
    {
      title: 'コメダ珈琲店半田やなべ店',
      location: {
        lat: 34.909438,
        lng: 136.914240
      },
	  foursquare: "4e2e1e3052b111a1e376f9db"
    },
    {
      title: '半田赤レンガ建物',
      location: {
        lat: 34.901587,
        lng: 136.928340
	  },
	  foursquare: "4bf0c4e021072d7f3f5b208b"
    },
    {
      title: '黒牛の里',
      location: {
        lat: 34.909578,
        lng: 136.910889
      },
	  foursquare: "4dbbe8450f2c919d39642832"
    },
    {
      title: 'パンのトラ半田店',
      location: {
        lat: 34.905976,
        lng: 136.911463
      },
	  foursquare: "4f5f1a66e4b0ea73574bc6b8"
    },
    {
      title: 'イタリア食堂魚々バル半田店',
      location: {
        lat: 34.905860,
        lng: 136.924334
      },
	 foursquare: "51adb8c2498e3493119f38b0"
    }
  ]);
  //this function is for filtering the search input credit:https://qiita.com/mmmm/items/72dfc491ef715445d838
  self.filterText = ko.observable('');
  self.filteredItems = ko.computed(function() {
    var filter = self.filterText().toLowerCase();
    if (!filter) {
      return self.locations();
    } else {
      return ko.utils.arrayFilter(self.locations(), function(item) {
        return item.title.toLowerCase().indexOf(filter) !== -1;
      });
    }
  }, self);
  //I put function map_click outside of the knockout ViewModel, and I don't know how I could put things inside of the ViewModel
  //self.openInfo = function map_click();

  // http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
  self.openInfo = function(location) {
    //console.log('click')
    //console.log(location)
    //console.log(location.marker)
	// when the item is clicked, opens the info window.
    google.maps.event.trigger(location.marker, "click");
    document.getElementById("dropdownmenu").classList.toggle("show");
  };
  self.venue_name = ko.observableArray();
  self.venue_adress = ko.observableArray();
  self.venue_pic = ko.observableArray();

  var foursquare;	
	  // The following group uses the location array to create an array of markers on initialize.
	  for (var i = 0; i < self.locations().length; i++) {
		// Get the position from the foursquare array.
		foursquare = self.locations()[i].foursquare;
	  }
	//var foursquare = myViewModel.locations()[i].foursquare;
	  
  	//var base_url = "https://api.foursquare.com/v2/venues/";
    var base_url = "https://api.foursquare.com/v2/venues/";
	var venue_id = foursquare;
	var v = "&v=20170801";
	var client_Id = client_Id;
	var client_Secret = client_Secret;
    //var lat = self.locations().location.lat;
    //var lng = self.locations().location.lng;

  self.getFourSquareData = function() {
         $.ajax({
           //url: base_url +'&client_id=' + client_Id + '&client_secret=' + client_Secret + venue_id,
		   type: "GET",
		   url: base_url + venue_id + "?client_id=" + client_Id + "&client_secret=" + client_Secret + v
           /*dataType: 'json',
           data: {
           client_id: client_Id,
		   client_secret: client_Secret,
		   v: "20170801"
           }*/
         }).done(function(results) {
            self.venue_name.push(results.response.venue);
			self.venue_adress.push(results.response.location.state + results.response.location.city + results.response.location.address);
			self.venue_pic.push(results.page.pageInfo.banner);
			
			var location_Info = "<div id='location_Info'>" + "<h2>" + self.venue_name + "</h2>" + "<p>" + self.venue_adress + "</p>" + "<p><img src='" + self.venue_pic + "' alt='picture of the location'></p>" + "</div>";
			 
			 
			 
			// This function populates the infowindow when the marker is clicked. We'll only allow
			// one infowindow which will open at the marker that is clicked, and populate based
			// on that markers position.
			function populateInfoWindow(marker, infowindow) {
			  // Check to make sure the infowindow is not already opened on this marker.
			  if (infowindow.marker != marker) {
				// Clear the infowindow content to give the streetview time to load.
				infowindow.setContent('');
				infowindow.marker = marker;
				// Make sure the marker property is cleared if the infowindow is closed.
				infowindow.addListener('closeclick', function() {
				  infowindow.marker = null;
				});
				infowindow.setContent(location_Info);
				//var streetViewService = new google.maps.StreetViewService();
				//var radius = 50;
				// In case the status is OK, which means the pano was found, compute the
				// position of the streetview image, then calculate the heading, then get a
				// panorama from that and set the options
				/*function getStreetView(data, status) {
				  if (status == google.maps.StreetViewStatus.OK) {
					var nearStreetViewLocation = data.location.latLng;
					var heading = google.maps.geometry.spherical.computeHeading(
					  nearStreetViewLocation, marker.position);
					infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
					var panoramaOptions = {
					  position: nearStreetViewLocation,
					  pov: {
						heading: heading,
						pitch: 30
					  }
					};
					var panorama = new google.maps.StreetViewPanorama(
					  document.getElementById('pano'), panoramaOptions);
				  } else {
					infowindow.setContent('<div>' + marker.title + '</div>' +
					  '<div>No Street View Found</div>');
				  }
				}*/
				// Use streetview service to get the closest streetview image within
				// 50 meters of the markers position
				/*streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);*/
				// Open the infowindow on the correct marker.
				infowindow.open(map, marker);
			  }
			  var largeInfowindow = new google.maps.InfoWindow({content:location_Info});
			}
			 
			 
			 
			 
			 
			 
       }).fail(function(error) {
         console.log(error);
      });
    }

    self.getFourSquareData();
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

  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  var locations = [{
      title: '新美南吉記念館',
      location: {
        lat: 34.909212,
        lng: 136.911239
      },
	  foursquare: "4b7755d1f964a52000932ee3"
    },
    {
      title: 'コメダ珈琲店半田やなべ店',
      location: {
        lat: 34.909438,
        lng: 136.914240
      },
	  foursquare: "4e2e1e3052b111a1e376f9db"
    },
    {
      title: '半田赤レンガ建物',
      location: {
        lat: 34.901587,
        lng: 136.928340
	  },
	  foursquare: "4bf0c4e021072d7f3f5b208b"
    },
    {
      title: '黒牛の里',
      location: {
        lat: 34.909578,
        lng: 136.910889
      },
	  foursquare: "4dbbe8450f2c919d39642832"
    },
    {
      title: 'パンのトラ半田店',
      location: {
        lat: 34.905976,
        lng: 136.911463
      },
	  foursquare: "4f5f1a66e4b0ea73574bc6b8"
    },
    {
      title: 'イタリア食堂魚々バル半田店',
      location: {
        lat: 34.905860,
        lng: 136.924334
      },
	 foursquare: "51adb8c2498e3493119f38b0"
    }
  ];


  // Style the markers a bit. This will be our listing marker icon.
  var defaultIcon = makeMarkerIcon('0091ff');

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('FFFF24');

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });

    myViewModel.locations()[i].marker = marker;
	//var foursquare = myViewModel.locations()[i].foursquare;
	


    // Push the marker to our array of markers.
    markers.push(marker);
 
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });




    //When you click the marker, it will zoom in

    marker.addListener('click', function() {
      //map.setZoom(18);
      //map.setCenter(marker.getPosition());
      map.setZoom(18);
      map.setCenter(marker.getPosition());

    });
  }
  showListings();

  document.getElementById('zoom-to-area').addEventListener('click', function() {
    zoomToArea();
  });
}



// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
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
  var address = document.getElementById('zoom-to-area-text').value;
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


var myViewModel = new MyViewModel();

ko.applyBindings(myViewModel);
