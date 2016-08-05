var columnNumber;

$(document).ready(function() {

    //auto resize the textarea
	$(document).one('focus.textarea', '.autoExpand', function(){
		var savedValue = this.value;
		this.value = '';
		this.baseScrollHeight = this.scrollHeight;
		this.value = savedValue;
	})
	.on('input.textarea', '.autoExpand', function(){
		var minRows = this.getAttribute('data-min-rows')|0,
			 rows;
		this.rows = minRows;
		//console.log(this.scrollHeight , this.baseScrollHeight);
		rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 20);
		this.rows = minRows + rows;
	});


	$('#noteTitle').click(function(event) {
		if($('#noteContent').is(':visible')){
			$("#title").focus();
		}
		else{
			$('#noteContent').show(300,"swing");
			console.log("it shows");
			$('#note').attr("placeholder","Take a note…");
			$('#noteTitle').empty();
			var newInput='<input type="text" id="title" class="customInput" placeholder="Title">';
			$('#noteTitle').append(newInput);
			$("#title").show(300,"swing");
			$("#title").focus();
		    $('html').click(function(event) {
		        if ($(event.target).parents('#clickElsewhere').length==0) {
		            $('#noteContent').hide(300,"swing");
		            $('#noteTitle').empty();
		            $('#noteTitle').append('<span id="title" class="hiddenElement">Take a note…</span>');
		            $("#title").show(300,"swing");
		            console.log("it is hidden");
		            $(this).off(event);
		        }
		    });
		}
	});

	$( window ).resize(function() {
		if($(window).width()>=1240){
			columnNumber=4;
			$(".cardContainer").width(1240);
			$(".customCard").width(290);
		}
		else if($(window).width()>=930){
			columnNumber=3;
			$(".cardContainer").width(930);
			$(".customCard").width(290);
		}else if($(window).width()>=620){
			columnNumber=2;
			$(".cardContainer").width(620);
			$(".customCard").width(290);
		}
		else if($(window).width()>=310){
			columnNumber=1;
			$(".cardContainer").width($(window).width()*0.8+18);
			$(".customCard").width($(window).width()*0.8);
		}
		else{
			columnNumber=0;
			$(".cardContainer").width($(window).width()-20);
			$(".customCard").width($(window).width()-20);
		}	
	});


}); 


function toggleSideBar(){
	var isToggle = $('#sidebar').is(":visible");
	console.log(isToggle);
	$('#sidebar').toggle(400,"swing");
	if(isToggle===false){
		newWidth=$('#content').width() - 280;
	}
	else{
		newWidth=$('#content').width() + 280;
	}
	
	console.log(newWidth);
	$("#content").animate({
        width: newWidth
    }, {
        duration: 400,
        specialEasing: {
            width: 'swing'
        }
    });
}



// function showNoteContent(){
// 	if($('#noteContent').is(':visible')){
// 		$("#title").focus();
// 	}
// 	else{
// 		$('#noteContent').toggle(300,"swing");
// 		$('#note').attr("placeholder","Take a note…");
// 		$('#noteTitle').empty();
// 		var newInput='<input type="text" id="title" class="customInput" placeholder="Title">';
// 		$('#noteTitle').append(newInput);
// 		$("#title").toggle(300,"swing");
// 		$("#title").focus();
// 	}
	
// }

function submitNote(){
	var title = document.getElementById("title").value;
	var note = document.getElementById("note").value;
	if(!isEmpty(title) || !isEmpty(note)){
		if(checkInvalidChars(title)){
			confirm("Your title might be an injecton attack.");
		}
		if(checkInvalidChars(note)){
			confirm("Your note might be an injecton attack.");
		}
		newObject={'title':title, 'note':note};
		//console.log(newObject);
		//loadCard(newObject);
		//setCookie(newObject);
		//toggle and clear the input field
		document.getElementById("title").value = "";
		document.getElementById("note").value = "";
		$(".nav_bar").click();
	}
	
}

function isEmpty(theString){
	if (theString){
		return false;
	}
	else{
		return true;
	}
}

function checkInvalidChars(inputContent){
	// $content=inputContent;
	// patt['name'] = /^[a-z ,-]+$/i;
	// patt['username'] = /^[A-z0-9_-]+$/i;
	// patt['email'] = /^[a-z0-9]+(?:[\.-]?[a-z0-9]+)*@[a-z0-9]+([-]?[a-z0-9]+)*[\.-]?[a-z0-9]+([-]?[a-z0-9]+)*([\.-]?[a-z]{2,})*(\.[a-z]{2,5})+$/i;
	// patt['website'] = /^http(s)?:\/\/(www\.)?[a-z0-9]+([-]?[a-z0-9]+)*[\.-]?[a-z0-9]+([-]?[a-z0-9]+)*([\.-]?[a-z]{2,})*(\.[a-z]{2,5})+$/i;
	// patt['age'] = /^(?:([1][3-9]|[2-9][0-9]))$/i;
	// patt['subject'] = /[a-z0-9?!:;'&_\. ,-]+/i;
	// if($content.match(patt[inputType])){
	// 	return false;
	// }
	// else{
	// 	return true;
	// }

	var invalidPatt = /[!"·$%&/<>=?¿#¬]/; //cannot have this inside name

	if (!invalidPatt.test( inputContent ) ) {
		console.log("valid");
	    return false;
	}
	else{
		console.log("invalid");
		return true;
	}

}

function loadCard(){

}

function loadAllCards(){
	//console.log($(window).width());
	if($(window).width()>=1240){
		columnNumber=4;
		$(".cardContainer").width(1240);
	}
	else if($(window).width()>=930){
		columnNumber=3;
		$(".cardContainer").width(930);
	}else if($(window).width()>=620){
		columnNumber=2;
		$(".cardContainer").width(620);
	}
	else if($(window).width()>=310){
		columnNumber=1;
		$(".cardContainer").width($(window).width()*0.8+18);
		$(".customCard").width($(window).width()*0.8);
	}
	else{
		columnNumber=0;
		$(".cardContainer").width($(window).width()-20);
		$(".customCard").width($(window).width()-20);
	}
	$('.noteTitle').fadeIn(600,"swing");

	console.log("load all cards");
}

function refreshPage(){

}

function setCookie(){

}

function getAllCookie(){

}

function getCookie(){

}
