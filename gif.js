var topics = ['Animaniacs', 'Ninja Turtles', 'TaleSpin', 'Darkwing Duck', 'Doug', 'Recess', 'Street Sharks']

function gifsAppear(){
	$('#cartoons').empty();
	var keyword = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response){
			var results = response.data;

	for(var i = 0; i < results.length; i++){
		var gifDiv = $('<div class="gif">');
		var gifRating = results[i].rating;
			
			var p = $('<p>').text("Rating: " + gifRating);

			var image = $('<img>');
			image.attr('id', 'anyImage');
			image.attr('data-still', results[i].images.fixed_width_still.url);
			image.attr('data-animate', results[i].images.fixed_width_still.url);
			image.attr('src', results[i].images.fixed_width_still.url);
			image.on('click', onClick);

			gifDiv.append(p);
			gifDiv.append(image);

			$('#cartoons').prepend(gifDiv);

		};
	});

			return false;

}

function renderButtons(){
	$('#buttonsView').empty();

	for(var i = 0; i < topics.length; i++){
		var a = $('<button>');
		a.addClass('gif' + i);
		a.attr('data-name', topics[i]);
		a.text(topics[i]);
		$('#buttonsView').append(a);
	};
};

$('#addKeyword').on('click', function(){
	keyword = $("#addCartoon").val().trim();
	topics.push(keyword);
	renderButtons();
	$("#addCartoon").val('');

	return false;
});

function onClick(){
	state = $(this).attr('data-state');

	if(state === 'still'){
		var animateUrl = $(this).attr('data-animate');
		$(this).attr('src', animateUrl);
		$(this).attr('data-state', 'animate');
	} else {
		var stillUrl = $(this).attr('data-still');
		$(this).attr('src', stillUrl);
		$(this).attr('data-state', 'still');
	};
};

	$(document).on('click', 'button', gifsAppear)



renderButtons();
