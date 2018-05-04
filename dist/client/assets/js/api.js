$(document).ready(function () {
	// body...
	$('#invalidLogin').hide();
	$('#invalidReg').hide();
	$('#regSuccess').hide();
	$('#regFail').hide();
	$('#costdb').hide();
	
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
	        userName: $('#regEmail').val(),
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

	$("#maintenanceSubmit").click(function(){
		$('#cost').text('');
	    $.post("/api/maintenance",
	    {
	        id: $('#email').val(),
	        type: $('#maintenanceType').val(),
			location: $("#maintenanceLocation").val(),

	        descritpion: $("#descriptionOfProblem").val()
	    },
	    function(data, status){
	    	console.log(data);
	    	$('#cost').text(data[0].cost);
	    	// $('#invalidLogin').hide();
	     //    window.location.href = "/dashboard.html"
	    }).fail(function(response) {
	    	console.log(response);
    		// $('#invalidLogin').show();
		});
	});

	
})