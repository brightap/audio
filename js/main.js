
var audio;
//Hide Pause
$('#pause').hide();

initAudio($('#playlist li:first-child'));


function initAudio(element){
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');
	var artist = element.attr('artist');

	//create audio object
	 audio = new Audio('media/'+ song);


//insert audio info
	$('.artist').text(artist);
	$('.title').text(title);

//insert cover
	$('img.cover').attr('src','images/covers/'+cover);

	$('#playlist li').removeClass('active');
	element.addClass('active');

}



//play button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
});

//pause button
$('#pause').click(function(){
	audio.pause();
	$('#play').show();
	$('#pause').hide();
	
});

//stop 
$('#stop').click(function(){
	audio.pause();
	audio.currentTime = 0;
});

//next button
$('#next').click(function(){
	audio.pause();

	var next = $('#playlist li.active').next();
	if(next.length == 0){
		next = $('#playlist li:first-child').next();
	}
	initAudio(next);
	audio.play();
	showDuration();
});
initAudio(next);
	audio.play();
	showDuration();

//prev button
$('#prev').click(function(){
	audio.pause();

	var prev = $('#playlist li.active').prev();
	if(prev.length == 0){
		prev = $('#playlist li:last-child').prev();
	}
	initAudio(prev);
	audio.play();
	showDuration();
});
initAudio(prev);
	audio.play();
	showDuration();

//playlist song click
$('#playlist li').click(function(){
	audio.pause();
	initAudio($(this));
	$('#play').hide();
	$('#play').hide();
	audio.play();
	showDuration();

});
audio.play();
	showDuration();

//volume control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});

//time/duration
function showDuration (){
	$(audio).bind('timeupdate', function(){
		//get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt(audio.currentTime / 60) % 60;

		if(s<10){
			s = '0'+s;
		} 

		$('#duration').html(m + ':'+ s);
		 var value = 0;

		 if(audio.currentTime > 0){
		 	value = Math.floor((100 / audio.duration) * audio.currentTime);
		 }

		 $('#progress').css('width', value+'%');
	});
}
