function initMap() {
			 var uluru = {lat: 50.211384, lng: -5.481693};
			 var map = new google.maps.Map(document.getElementById('map'), {
				 zoom: 18,
				 center: uluru,
				 scrollwheel: false
			 });
			 var marker = new google.maps.Marker({
				 position: uluru,
				 map: map
			 });
		 }
