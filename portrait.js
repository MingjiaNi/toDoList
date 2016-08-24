var supportLocalStorage = false;


$(document).ready(function() {

	if (typeof(Storage) !== "undefined") {
	    supportLocalStorage = true;
	    loadAllCards(supportLocalStorage);
	    //$('#triggerModalBtn').click();
	} else {
	    $('#triggerModalBtn').click();
	    loadAllCards(supportLocalStorage);
	}
	

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
			//console.log("it shows");
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
		            //console.log("it is hidden");
		            $(this).off(event);
		        }
		    });
		}
	});

	// $( window ).resize(function() {
	// 	if($(window).width()>=1240){
	// 		columnNumber=4;
	// 		$(".cardContainer").width(1240);
	// 		$(".customCard").width(290);
	// 	}
	// 	else if($(window).width()>=930){
	// 		columnNumber=3;
	// 		$(".cardContainer").width(930);
	// 		$(".customCard").width(290);
	// 	}else if($(window).width()>=620){
	// 		columnNumber=2;
	// 		$(".cardContainer").width(620);
	// 		$(".customCard").width(290);
	// 	}
	// 	else if($(window).width()>=310){
	// 		columnNumber=1;
	// 		$(".cardContainer").width($(window).width()*0.8+18);
	// 		$(".customCard").width($(window).width()*0.8);
	// 	}
	// 	else{
	// 		columnNumber=0;
	// 		$(".cardContainer").width($(window).width()-20);
	// 		$(".customCard").width($(window).width()-20);
	// 	}	
	// });

	$("#submitNote").click(function(){
		submitNote();
	});


	$( ".customCard" ).hover(
		function() {
			//$( this ).find('.placeholder').hide(300,'swing');
			$( this ).find('.cardBtnGroup').show(300,'swing');
		}, function() {
			$( this ).find('.cardBtnGroup').hide(300,'swing');
			//$( this ).find('.placeholder').show(300,'swing');
		}
	);



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
 //    if(newWidth>=1240){
	// 	columnNumber=4;
	// 	newWidth=1240;
	// }
	// else if(newWidth>=930){
	// 	columnNumber=3;
	// 	newWidth=930;
	// }else if(newWidth>=620){
	// 	columnNumber=2;
	// 	newWidth=620;
	// }
	// else if(newWidth>=310){
	// 	columnNumber=1;
	// 	newWidth=newWidth*0.8+16;
	// 	$(".customCard").animate({
	//         width: newWidth
	//     }, {
	//         duration: 400,
	//         specialEasing: {
	//             width: 'swing'
	//         }
	//     });
	// }
	// else{
	// 	columnNumber=0;
	// 	newWidth=newWidth-20;
	// 	$(".customCard").animate({
	//         width: newWidth
	//     }, {
	//         duration: 400,
	//         specialEasing: {
	//             width: 'swing'
	//         }
	//     });
	// }
    // $(".cardContainer").animate({
    //     width: newWidth
    // }, {
    //     duration: 400,
    //     specialEasing: {
    //         width: 'swing'
    //     }
    // });

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
		if(!hasInvalidChars(title) && !hasInvalidChars(note)){
			newObject={'title':title, 'note':note, 'id':getNoteID()};
			//console.log(newObject);
			if (supportLocalStorage){
				setLocalStorage(newObject);
			}
			else{
				setCookie(newObject);
			}
			loadCard(newObject);
			//toggle and clear the input field
		}
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

function hasInvalidChars(inputContent){
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

	var invalidPatt = /["·$%&/<>=?¿#¬]/; //cannot have this inside name

	if (!invalidPatt.test( inputContent ) ) {
		//console.log("valid");
	    return false;
	}
	else{
		//console.log("invalid");
		var notXSS = confirm("Your note might be an injecton attack. Click OK to dismiss the alert and continue.");
		console.log(notXSS);
		return !notXSS;
	}

}

function loadCard(newCard){
	if (!newCard.note){
		var newCard = '\
			<div class="noteCard customCard" data-id="'+newCard.id+'">\
	          <div class="cardTitle">'+newCard.title+'</div>\
	          <div class="placeholder">\
		          <div class="cardBtnGroup">\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-time" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn deleteCard" >\
		              <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-flag" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-share" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn rightAlign">\
		              <span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>\
		            </button>\
		          </div>\
		        </div>\
	        </div>	';
	}
	else if (!newCard.title){
		var newCard = '\
			<div class="noteCard customCard" data-id="'+newCard.id+'">\
	          <div class="cardText">'+hideNote(newCard.note)+'</div>\
	          	<div class="placeholder">\
		          <div class="cardBtnGroup">\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-time" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn deleteCard" >\
		              <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-flag" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-share" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn rightAlign">\
		              <span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>\
		            </button>\
		          </div>\
		        </div>\
	        </div>\
			';
	}
	else{
		var newCard = '\
			<div class="noteCard customCard" data-id="'+newCard.id+'">\
	          <!-- <img class="cardImg"> -->\
	          <div class="cardTitle">'+newCard.title+'</div>\
	          <div class="cardText">'+hideNote(newCard.note)+'</div>\
	          	<div class="placeholder">\
		          <div class="cardBtnGroup">\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-time" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn deleteCard" >\
		              <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-flag" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn">\
		              <span class="glyphicon glyphicon-share" aria-hidden="true"></span>\
		            </button>\
		            <button class="transparentBtn rightAlign">\
		              <span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></span>\
		            </button>\
		          </div>\
		        </div>\
	        </div>\
		';
	}
	document.getElementById('cardContainer').insertAdjacentHTML('afterbegin',newCard);
	$( ".customCard" ).hover(
		function() {
			//$( this ).find('.placeholder').hide(300,'swing');
			$( this ).find('.cardBtnGroup').show(300,'swing');
		}, function() {
			$( this ).find('.cardBtnGroup').hide(300,'swing');
			//$( this ).find('.placeholder').show(300,'swing');
		}
	);


	
}

function hideNote(noteContent){
	if(noteContent.length > 1000){
		noteContent = noteContent.substring(0,1000) + '<button class="transparentBtn">\
	             									<span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>\
	            								</button>';
	}
	return noteContent;
}

function loadAllCards(){
	//console.log($(window).width());
	// if($(window).width()>=1240){
	// 	columnNumber=4;
	// 	$(".cardContainer").width(1240);
	// }
	// else if($(window).width()>=930){
	// 	columnNumber=3;
	// 	$(".cardContainer").width(930);
	// }else if($(window).width()>=620){
	// 	columnNumber=2;
	// 	$(".cardContainer").width(620);
	// }
	// else if($(window).width()>=310){
	// 	columnNumber=1;
	// 	$(".cardContainer").width($(window).width()*0.8+18);
	// 	$(".customCard").width($(window).width()*0.8);
	// }
	// else{
	// 	columnNumber=0;
	// 	$(".cardContainer").width($(window).width()-20);
	// 	$(".customCard").width($(window).width()-20);
	// }
	$('.noteTitle').fadeIn(600,"swing");
	$('#cardContainer').empty();
	if (supportLocalStorage){
		var allCards = getLocalStorage();
	}
	else{
		var allCards = getCookie();
	}
	for(var i in allCards){
		loadCard(allCards[i]);
	}
	console.log("load all cards");
	$(".cardBtnGroup > .deleteCard").click(function(){
		var idToBeDeleted = $(this).parent().parent().parent().data("id");
		$(this).parent().parent().parent().remove();
		deleteCard(idToBeDeleted);
	});
}


function setLocalStorage(newCard){
	var noteArray = getLocalStorage();
	noteArray.push(newCard);
	console.log('New array:',noteArray);
	localStorage.removeItem('note');
	localStorage.setItem('note', JSON.stringify(noteArray));

}

function setCookie(newCard){
	noteArray = getCookie();
	noteArray.push(newCard);
	noteArray =JSON.stringify(noteArray);
	var d = new Date();
	//expires after 1 year
    d.setTime(d.getTime() + (365*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "note=" + noteArray + "; " + expires;

	console.log("setCookie finished");
}

function getNoteID(){
	if (supportLocalStorage){
		if(getLocalStorage()){
			return getLocalStorage().length;
		}
		else{
			return 0;
		}
	}
	else{
		if(getCookie()){
			return getCookie().length;
		}
		else{
			return 0;
		}
	}
}



function getLocalStorage(){
	var noteArray = localStorage.getItem('note');
	noteArray = JSON.parse(noteArray);
	console.log('localStorage: ',noteArray );
	console.log('the length of the noteArray: '+noteArray.length);
	if (noteArray === null || noteArray.length === 0){
		console.log(isfirstTimeUser());
		return isfirstTimeUser();
	}
	else{
		return noteArray;		
	}
}


function getCookie(){
	console.log("getCookie is triggered");
	noteArray = document.cookie.substring(5,-1);
	noteArray = JSON.parse(noteArray);
	if(noteArray === null || noteArray.lenth === 0){
		return isfirstTimeUser();
	}
	else{
		return noteArray;
	}
}

function isfirstTimeUser(){
	var caution = {title:'Hello', note:'This is an web app used for note taking and task management. It also helps you organize your thoughts and ideas.The feature of setting alarm and notification will also be added in the future.', id:2};
	var techniques = {title:'Limitation', note: 'The webpage is currently using html5 local storage to storage to store all the infomation. There is an upper limit of 5 MB (You won\'t be able to use it up). If your browser doesn\'t support html5 local storage, cookie will be used as a substitution (upper limit is 4095 bytes). All the cookie will expire after 1 year. Jimmy is working on the backend of the web application. Once everything is set up, all your notes will be migarate to our server. You can confidently use it right now.', id:1};
	var threeExamples = {title:'Future feature', note:'Right now, the create note and delete note feature was built. Later, the following feature will be built. Some of them will be created as another project and used as a module in this app.<br>1. Drag and drop (uploading file and organize notes)<br>2. right click menu<br>3. notification<br>4. Use base64 to encrypt and store images in local storageArchieve an task<br>5. Making a check list<br>6. Share Notes<br>7. Assign different colors, tags to notes and reorganize notes based on color, tag, priority and time created<br>8. Features in Nav Bar', id:0};
	var noteArray =[];
	noteArray.push(threeExamples);
	noteArray.push(techniques);
	noteArray.push(caution);
	// console.log(noteArray);
	return noteArray;
}

function deleteCard(id){
	if (supportLocalStorage){
		var noteArray=getLocalStorage();
		for(var i in noteArray){
			if (noteArray[i].id === id){
				noteArray.splice(i,1);
			}
		}
		console.log(noteArray);
		localStorage.removeItem('note');
		localStorage.setItem('note', JSON.stringify(noteArray));
	}
	else{
		var noteArray = getCookie();
		for(var i in noteArray){
			if (noteArray[i].id === id){
				noteArray.splice(i,1);
			}
		}
		noteArray =JSON.stringify(noteArray);
		var d = new Date();
		//expires after 1 year
	    d.setTime(d.getTime() + (365*24*60*60*1000));
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = "note=" + noteArray + "; " + expires;
	}
	

	console.log(id+" has been deleted");
}