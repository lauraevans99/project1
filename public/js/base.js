$(document).ready(function(){
	// $('#myForm').validator();

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

	// Profile Page JS
	$(document).ready(function() {
	$(".btn-pref .btn").click(function () {
    	$(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    	// $(".tab").addClass("active"); // instead of this do the below 
    	$(this).removeClass("btn-default").addClass("btn-primary");   
	});
	});

	// send new user data to server when register form is submitted
	$('#register-form').on('submit', function(e) {
		e.preventDefault();
		var data = $(this).serialize();
		var password = $('#registerPassword').val();
		var confirmPassword = $('#confirm-password').val();

		$.ajax(
    	{
	        url: '/register',
	        type: 'POST',
	        data: data,
	        datatype: 'json',
	        success: function (data) { 
	        	console.log("success with ajax "); 
	        	window.location.href = "/profile";
	        },
	        error: function (jqXHR, textStatus, errorThrown) { 
	        		$("#registerPassword").val("");
	        		$("#registerUsername").val("");
	        		$("#confirm-password").val("");
	        		$("#email").val("");
	        		$('#alertDivRegister').append('<div class="alert alert-danger log-in-alert" role="alert">Oops! Either the user does not exist or the password is incorrect. Please try again. </div>');
	        		window.setTimeout(function() {
						$('.log-in-alert').alert('close');
					}, 3000);
    		}
		});
	});

	$('#login-form').on('submit', function(e) {
		e.preventDefault();
		var data = $(this).serialize();
		$.ajax(
    	{
	        url: '/login',
	        type: 'POST',
	        data: data,
	        datatype: 'json',
	        success: function (data) { 
	        	console.log("success with ajax " ); 
	        	window.location.href = "/profile";
	    	},
	        error: function (jqXHR, textStatus, errorThrown) { 
	        		$("#password").val("");
	        		$("#username").val("");
	        		$('#alertDiv').append('<div class="alert alert-danger log-in-alert" role="alert">Oops! Either the user does not exist or the password is incorrect. Please try again. </div>');
	        		window.setTimeout(function() {
						$('.log-in-alert').alert('close');
					}, 3000);
    		}
		// }).done( function(){ console.log('hello'); });
		});
	});



	// Main Game JS 

		// Web Audio API
		var audioCtx = new (AudioContext || webkitAudioContext)();
		
		var oscillator = audioCtx.createOscillator();
		var gainNode = audioCtx.createGain();

		oscillator.connect(gainNode);
		oscillator.type = 'triangle';
		oscillator.start();


    // Table of notes with correspending keyboard codes. Frequencies are in hertz.
    var notesByKeyCode = {
    	a4: { noteName: 'a4', frequency: 440.00, keyName: 'h' },
    	asharp4: { noteName: 'a4', frequency: 466.16, keyName: 'h' },
    	b4: { noteName: 'b4', frequency: 493.88, keyName: 'j' },
    	c4: { noteName: 'c4', frequency: 261.63, keyName: 'a' },
    	csharp4: { noteName: 'c4', frequency: 277.18, keyName: 'a' },
    	d4: { noteName: 'd4', frequency: 293.66, keyName: 's' },
    	dsharp4: { noteName: 'd4', frequency: 311.13 , keyName: 's' },
    	e4: { noteName: 'e4', frequency: 329.63, keyName: 'd' },
    	f4: { noteName: 'f4', frequency: 349.23, keyName: 'f' },
    	fsharp4: { noteName: 'f4', frequency: 369.99, keyName: 'f' },
    	g4: { noteName: 'g4', frequency: 392.00, keyName: 'g' },
    	gsharp4: { noteName: 'g4', frequency: 415.30, keyName: 'g' },
    };

    	var arrayOfFrequencies = [
    	440.00, 
    	466.16, 
    	493.88, 
    	261.63, 
    	277.18, 
    	293.66, 
    	311.13, 
    	329.63, 
    	349.23, 
    	369.99, 
    	392.00, 
    	415.30
    ];

    	var randomNum;

    // Ear Game JS
    var earGameCounter = 0;

	// array of notes for random sound generation
	$(".glyphicon-volume-up").on("click", function(e) {
		e.preventDefault();
		$("#rightOrWrong").remove();
		randomNum = Math.floor(Math.random() * 12);
		if (randomNum === 0) {
			playA4();
		} else if (randomNum === 1) {
			playAsharp4();
		} else if (randomNum === 2) {
			playB4();
		} else if (randomNum === 3) {
			playC4();
		} else if (randomNum === 4) {
			playCsharp4();
		} else if (randomNum === 5) {
			playD4();
		} else if (randomNum === 6) {
			playDsharp4();
		} else if (randomNum === 7) {
			playE4();
		} else if (randomNum === 8) {
			playF4();
		} else if (randomNum === 9) {
			playFsharp4();
		} else if (randomNum === 10) {
			playG4();
		} else if (randomNum === 11) {
			playGsharp4();
		}	

	});
	

    function playC4() {
    	$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-asterisk' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.c4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
    }

	$(".glyphicon-asterisk").on("click tap", function(e){
		e.preventDefault();
		playC4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.c4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
			earGameCounter++;
			$("#earGameCount").html("" + earGameCounter);
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
			earGameCounter--;
			$("#earGameCount").html("" + earGameCounter);
		}
	});

	function playCsharp4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-gift' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.csharp4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-gift").on("click", function(e){
		e.preventDefault();
		playCsharp4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.csharp4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
			earGameCounter++;
			$("#earGameCount").html("" + earGameCounter);
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
			earGameCounter--;
			$("#earGameCount").html("" + earGameCounter);
		}
	});

	function playD4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-fire' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.d4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-fire").on("click", function(e){
		e.preventDefault();
		playD4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.d4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});

	function playDsharp4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-leaf' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.dsharp4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-leaf").on("click", function(e){
		e.preventDefault();
		playDsharp4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.dsharp4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});

	function playE4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-bell' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.e4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-bell").on("click", function(e){
		e.preventDefault();
		playE4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.e4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});

	function playF4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-plane' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.f4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-plane").on("click", function(e){
		e.preventDefault();
		playF4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.f4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});

	function playFsharp4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-flash' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.fsharp4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-flash").on("click", function(e){
		e.preventDefault();
		playFsharp4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.fsharp4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});

	function playG4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-phone-alt' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.g4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-phone-alt").on("click", function(e){
		e.preventDefault();
		playG4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.g4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});

	function playGsharp4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-apple' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.gsharp4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-apple").on("click", function(e){
		e.preventDefault();
		playGsharp4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.gsharp4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});

	function playA4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-lamp' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.a4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-lamp").on("click", function(e){
		e.preventDefault();
		playA4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.a4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});

	function playAsharp4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-sunglasses' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.asharp4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-sunglasses").on("click", function(e){
		e.preventDefault();
		playAsharp4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.asharp4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});

	function playB4() {
		$("#main-thumbnail").empty();
		$("#main-thumbnail").append("<span class='glyphicon glyphicon-grain' id='main-glyphicon' />");
		oscillator.frequency.value = notesByKeyCode.b4.frequency;
		gainNode.connect(audioCtx.destination);
		window.setTimeout(function() {
			gainNode.disconnect(audioCtx.destination);
		}, 500);
	}

	$(".glyphicon-grain").on("click", function(e){
		e.preventDefault();
		playB4();
		$("#rightOrWrong").remove();
		if (arrayOfFrequencies[randomNum] === notesByKeyCode.b4.frequency) {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-ok" /></a>');
		} else {
			$("#mainEar").append('<a href="" class="thumbnail" id="rightOrWrong"><span class="glyphicon glyphicon-remove" /></a>');
		}
	});


	// play notes when keyboard is pressed
	$(document).keydown(function(e) {
		if (e.keyCode == 49) {
			playC4();
		} else if (e.keyCode == 81) {
			playCsharp4();
		} else if (e.keyCode == 65) {
			playD4();
		} else if (e.keyCode == 90) {
			playDsharp4();
		} else if (e.keyCode == 50) {
			playE4();
		} else if (e.keyCode == 87) {
			playF4();
		} else if (e.keyCode == 83) {
			playFsharp4();
		} else if (e.keyCode == 88) {
			playG4();
		} else if (e.keyCode == 51) {
			playGsharp4();
		} else if (e.keyCode == 69) {
			playA4();
		} else if (e.keyCode == 68) {
			playAsharp4();
		} else if (e.keyCode == 67) {
			playB4();
		}
	});






	// Memory Game JS 
	// http://codepen.io/mel/pen/Brads/
	var BoxOpened = "";
	var ImgOpened = "";
	var Counter = 0;
	var ImgFound = 0;

	var Source = "#boxcard";

	var ImgSource = [
	"/static/imgs/asterisk-p1.png",
	"/static/imgs/apple-p1.png",
	"/static/imgs/bell-p1.png",
	"/static/imgs/fire-p1.png",
	"/static/imgs/flash-p1.png",
	"/static/imgs/gift-p1.png",
	"/static/imgs/grain-p1.png",
	"/static/imgs/lamp-p1.png",
	"/static/imgs/leaf-p1.png",
	"/static/imgs/phone-p1.png"
	];

	function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
	function ShuffleImages() {
		var ImgAll = $(Source).children();
		var ImgThis = $(Source + " div:first-child");
		var ImgArr = new Array();

		for (var i = 0; i < ImgAll.length; i++) {
			ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
			ImgThis = ImgThis.next();
		}

		ImgThis = $(Source + " div:first-child");

		for (var z = 0; z < ImgAll.length; z++) {
			var RandomNumber = RandomFunction(0, ImgArr.length - 1);

			$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
			ImgArr.splice(RandomNumber, 1);
			ImgThis = ImgThis.next();
		}
	}

	function ResetGame() {
		// window.location.href = "http://localhost:4050/memoryGame";
		ShuffleImages();
		$(Source + " div img").hide();
		$(Source + " div").css("visibility", "visible");
		Counter = 0;
		$("#success").remove();
		$("#counter").html("" + Counter);
		BoxOpened = "";
		ImgOpened = "";
		ImgFound = 0;
		// location.reload();
		return false;
	}

	function OpenCard() {
		var id = $(this).attr("id");

		if ($("#" + id + " img").is(":hidden")) {
			$(Source + " div").unbind("click", OpenCard);

			$("#" + id + " img").slideDown('fast');

			if (ImgOpened == "") {
				BoxOpened = id;
				ImgOpened = $("#" + id + " img").attr("src");
				setTimeout(function() {
					$(Source + " div").bind("click", OpenCard)
				}, 300);
			} else {
				CurrentOpened = $("#" + id + " img").attr("src");
				if (ImgOpened != CurrentOpened) {
					setTimeout(function() {
						$("#" + id + " img").slideUp('fast');
						$("#" + BoxOpened + " img").slideUp('fast');
						BoxOpened = "";
						ImgOpened = "";
					}, 400);
				} else {
					$("#" + id + " img").parent().css("visibility", "hidden");
					$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
					ImgFound++;
					BoxOpened = "";
					ImgOpened = "";
				}
				setTimeout(function() {
					$(Source + " div").bind("click", OpenCard)
				}, 400);
			}
			Counter++;
			$("#counter").html("" + Counter);

			if (ImgFound == ImgSource.length) {
				$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
			}
		}
	}

	$(function() {

		for (var y = 1; y < 3 ; y++) {
			$.each(ImgSource, function(i, val) {
				$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
			});
		}
		$(Source + " div").click(OpenCard);
		ShuffleImages();
	});

	$("#resetGame").on("click", function() {
		ResetGame();
	});


	// Song Game JS

	// Twinkle Twinkle Little Star

	function twinkleTwinkle() {
			playC4();
		window.setTimeout(function() {
			playC4();
		}, 1000);
		window.setTimeout(function() {
			playG4();
		}, 2000);
		window.setTimeout(function() {
			playG4();
		}, 3000);
		window.setTimeout(function() {
			playA4();
		}, 4000);
		window.setTimeout(function() {
			playA4();
		}, 5000);
		window.setTimeout(function() {
			playG4();
		}, 6000);
		window.setTimeout(function() {
			playF4();
		}, 8000);
		window.setTimeout(function() {
			playF4();
		}, 9000);
		window.setTimeout(function() {
			playE4();
		}, 10000);
		window.setTimeout(function() {
			playE4();
		}, 11000);
		window.setTimeout(function() {
			playD4();
		}, 12000);
		window.setTimeout(function() {
			playD4();
		}, 13000);
		window.setTimeout(function() {
			playC4();
		}, 14000);
		window.setTimeout(function() {
			playG4();
		}, 16000);
		window.setTimeout(function() {
			playG4();
		}, 17000);
		window.setTimeout(function() {
			playF4();
		}, 18000);
		window.setTimeout(function() {
			playF4();
		}, 19000);
		window.setTimeout(function() {
			playE4();
		}, 20000);
		window.setTimeout(function() {
			playE4();
		}, 21000);
		window.setTimeout(function() {
			playD4();
		}, 22000);
		window.setTimeout(function() {
			playG4();
		}, 24000);
		window.setTimeout(function() {
			playG4();
		}, 25000);
		window.setTimeout(function() {
			playF4();
		}, 26000);
		window.setTimeout(function() {
			playF4();
		}, 27000);
		window.setTimeout(function() {
			playE4();
		}, 28000);
		window.setTimeout(function() {
			playE4();
		}, 29000);
		window.setTimeout(function() {
			playD4();
		}, 30000);
		window.setTimeout(function() {
			playC4();
		}, 32000);
		window.setTimeout(function() {
			playC4();
		}, 33000);
		window.setTimeout(function() {
			playG4();
		}, 34000);
		window.setTimeout(function() {
			playG4();
		}, 35000);
		window.setTimeout(function() {
			playA4();
		}, 36000);
		window.setTimeout(function() {
			playA4();
		}, 37000);
		window.setTimeout(function() {
			playG4();
		}, 38000);
		window.setTimeout(function() {
			playF4();
		}, 40000);
		window.setTimeout(function() {
			playF4();
		}, 41000);
		window.setTimeout(function() {
			playE4();
		}, 42000);
		window.setTimeout(function() {
			playE4();
		}, 43000);
		window.setTimeout(function() {
			playD4();
		}, 44000);
		window.setTimeout(function() {
			playD4();
		}, 45000);
		window.setTimeout(function() {
			playC4();
		}, 46000);
	}


	// play Twinkle Twinkle Little Star
	
	$(".glyphicon-music").on("click", function(e) {
		e.preventDefault();
		twinkleTwinkle();
	});









});

