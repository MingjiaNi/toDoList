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
	console.log(this.scrollHeight , this.baseScrollHeight);
	rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 20);
	this.rows = minRows + rows;
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

function showNoteContent(){
	$('#noteContent').toggle(300,"swing");
	$('#note').attr("placeholder","Take a note…");
	$('#noteTitle').empty();
}
