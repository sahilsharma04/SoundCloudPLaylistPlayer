/* Search */
var UI ={};
UI.click = function(){
		document.querySelector(".js-submit").addEventListener("click", function(){
			var input = document.querySelector('.js-search').value;
			console.log(input);
			SoundCLoudAPI.getTracks(input);
		});
}

UI.click();



/*Query SoundCLoud API*/

SoundCLoudAPI = {};

SoundCLoudAPI.init = function(){

	SC.initialize({
  		client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});
}
SoundCLoudAPI.init();


SoundCLoudAPI.getTracks = function(inputValue){

	SC.get('/tracks', {
  		q: inputValue
	}).then(function(tracks) {
  		console.log(tracks);
		SoundCLoudAPI.renderTracks(tracks);

	});
}










 /* Display the cards*/
SoundCLoudAPI.renderTracks = function(tracks){

	tracks.forEach(function(track){

		console.log(track);

		//card
		var card = document.createElement('div');
		card.classList.add("card");
		
		//image
		var imageDiv = document.createElement("div");
		imageDiv.classList.add("image");

		var image_img = document.createElement("img");
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || "https://www.lorempixel.com/100/100/abstract";


		imageDiv.appendChild(image_img);


		//content

		var content = document.createElement("div");
		content.classList.add("content");

		var header= document.createElement("div");
		header.classList.add("header");
		header.innerHTML = '<a href="'+track.permalink_url+'" target="_blank">' +track.title+ '</a>';
		content.appendChild(header);


		//button

		var button = document.createElement("div");
		button.classList.add("ui", "bottom","attached","button","js-button");

		var icon = document.createElement("i");
		icon.classList.add("add","icon");
		button.appendChild(icon);

		var buttonText = document.createElement("span");
		buttonText.innerHTML = "Add to playlist";
		button.appendChild(buttonText);

		button.addEventListener('click', function(){
			SoundCLoudAPI.embed(track.permalink_url);
		});

		card.appendChild(imageDiv);
		card.appendChild(content);
		card.appendChild(button);

		var searchResults = document.querySelector('.js-search-results');
		searchResults.appendChild(card);

	});


}




 
  /* Add to playlist and play */

SoundCLoudAPI.embed = function(trackUrl){
		SC.oEmbed(trackUrl, {
		  auto_play: true
		}).then(function(embed){
		  console.log('oEmbed response: ', embed);
		  var sideBar = document.querySelector('.js-playlist');

		  var box = document.createElement('div');
		  box.innerHTML = embed.html;
		  sideBar.insertBefore(box, sideBar.firstChild);
		  localStorage.setItem("key",sideBar.innerHTML);

		});
}

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML =localStorage.getItem("key");


