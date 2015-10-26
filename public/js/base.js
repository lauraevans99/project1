$(document).ready(function(){

// bootstrap js for login form
    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	// send new user data to server when register form is submitted
	$('#register-form').on('submit', function(e) {
		e.preventDefault();
		var password = $('#registerPassword').val();
		var confirmPassword = $('#confirm-password').val();

		if (password!==confirmPassword) {
			// send error message to user (passwords don't match)
			return console.log("passwords don't match, please try again");
		} else {
			var data = $(this).serialize();
			$.post('/register', data, function(hello) {
				//console.log(data);
				//var test = jQuery.parseJSON(hello);
				//var test = JSON.parse(data);
				//console.log(test);
			});
		}	
		// console.log("this is my username: " + username);
		// console.log("this is my email: " + email);
		// console.log("this is my confirm password: " + confirmPassword);
		// console.log("this is my password: " + password);

	});

	$('#login-form').on('submit', function(e) {
		e.preventDefault();
		var data = $(this).serialize();
		$.post('/login', data, function(data) {
			console.log(data);
			//console.log("this is what i'm looking for: " + data);
			// $( ".result" ).html( data );
			// console.log(data);
		});
	});

});
