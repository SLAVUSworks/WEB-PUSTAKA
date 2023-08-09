$(function(){
	$('.nav__icon').on('click', function() {
		$(this).toggleClass('active');
		$('nav ul').slideToggle();
	});

	$(window).on('load resize',function(){
		var w = $(window).width();
		var h = $(window).height();
		var x = 700;
		if (w >= x) {
			$('nav ul').css({ display: 'flex',height: 'auto' });
		}else {
			$('nav ul').css({ display: 'none',height: h + 'px'});
		}
	});
});


// The typewriter element
var typeWriterElement = document.getElementById('typewriter');

// The TextArray: 
var textArray = ["Selamat Datang di Kafe Buku SMAN 1 Bukittinggi","Scan QR Code Disamping Untuk Mengakses Buku Tamu", "Tingkatkan Literasi dengan Rajin Membaca Buku", "Kami Juga Menyediakan Berbagai E-Book yang Dapat Dibaca oleh Semua Pengunjung "];

// You can also do this by transfering it through a data-attribute
// var textArray = typeWriterElement.getAttribute('data-array');


// function to generate the backspace effect 
function delWriter(text, i, cb) {
	if (i >= 0 ) {
		typeWriterElement.innerHTML = text.substring(0, i--);
		// generate a random Number to emulate backspace hitting.
			var rndBack = 10 + Math.random() * 100;
		setTimeout(function() {
			delWriter(text, i, cb);
		},rndBack); 
	} else if (typeof cb == 'function') {
		setTimeout(cb,1000);
	}
};

// function to generate the keyhitting effect
function typeWriter(text, i, cb) {
	if ( i < text.length+1 ) {
		typeWriterElement.innerHTML = text.substring(0, i++);
		// generate a random Number to emulate Typing on the Keyboard.
		var rndTyping = 250 - Math.random() * 100;
		setTimeout( function () { 
			typeWriter(text, i++, cb)
		},rndTyping);
	} else if (i === text.length+1) {
		setTimeout( function () {
			delWriter(text, i, cb)
		},500);
	}
};

// the main writer function
function StartWriter(i) {
	if (typeof textArray[i] == "undefined") {
		setTimeout( function () {
			StartWriter(0)
		},1000);
	} else if(i < textArray[i].length+1) {
		typeWriter(textArray[i], 0, function () {
			StartWriter(i+1);
		});
	}  
};
// wait one second then start the typewriter
setTimeout( function () {
	StartWriter(0);
},1000);

document.getElementById('direct').addEventListener('click', () => {
	setTimeout(() => {
	 onclick=window.location.href='../guest-acces/list.html'   }, 1000);
});
							
