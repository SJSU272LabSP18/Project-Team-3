$(document).ready(function () {
	// body...
	$('#invalidLogin').hide();
	$('#invalidReg').hide();
	$('#regSuccess').hide();
	$('#regFail').hide();
	
	$("#loginBtn").click(function(){
	    $.post("/api/login",
	    {
	        username: $('#email').val(),
	        password: $('#password').val()
	    },
	    function(data, status){
	    	$('#invalidLogin').hide();
	        window.location.href = "/dashboard.html"
	    }).fail(function(response) {
    		$('#invalidLogin').show();
		});
	});

	$("#regBtn").click(function(){
	    $.post("/api/signup",
	    {
	        username: $('#regEmail').val(),
	        password: $('#regPwd').val()
	    },
	    function(data, status){
	    	$('#invalidReg').hide();
	    	$('#regSuccess').show();
	    }).fail(function(response) {
    		$('#invalidReg').show();
	    	$('#regSuccess').hide();
		});
	});

	
})