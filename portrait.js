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
	console.log(title);
	console.log(note);


	//toggle and clear the input field
	document.getElementById("title").value = "";
	document.getElementById("note").value = "";
	$(".nav_bar").click();
}

function ifEmpty(){

}

function checkInvalidChars(){

}

function setCookie(){

}

function allCookie(){

}

function getCookie(){

}
