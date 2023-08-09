function populate(){
	if(quiz.isEnded()){
		showScores();
	}
	else{
		var element=document.getElementById("question");
		element.innerHTML=quiz.getQuestionIndex().text;

		var choices=quiz.getQuestionIndex().choices;
		for(var i=0;i<choices.length;i++)
		{
			var element = document.getElementById("choice"+i);
			element.innerHTML=choices[i];
			guess("btn"+i,choices[i]);
		}
		showProgress();
	}
};

function guess(id,guess){
	var button = document.getElementById(id);
	button.onclick=function(){
		quiz.guess(guess);
		populate();
	}
};

function showProgress(){
	var currentQuestionNumber=quiz.questionIndex+1;
	var element = document.getElementById("progress");
	element.innerHTML="Question "+currentQuestionNumber +" of "+quiz.questions.length;

};

function showScores()
{
	var gameOverHtml="<h1> Result of the quiz..</h1>"
	gameOverHtml+="<h2 id='score'>Your Score is :  "+quiz.score+"</h2>";
	var element=document.getElementById("quiz");
	element.innerHTML=gameOverHtml;


};

var questions=[
	new Question("tanggal dan tahun berapa Bukittinggi menjadi ibu kota indonesia?",["18 November 1948","19 November 1947","18 Desember 1948","19 Desember 1948"],"19 Desember 1948"),
	new Question("nama bukittinggi sebelum dirubah menjadi bukittinggi",["Boekittinggi","Fort de kock","Bukittinggi","Bukik Kubangan Kabau"],"For de kock"),
	new Question("Apa julukan kota Bukittinggi",["Kota Pelajar","Kota Pertanian","Kota Wisata","Kota Budaya"],"Kota Wisata"),
	new Question("Bahasa yang digunakan masyarakat di Kota Bukittinggi",["Bahasa Indonesia","Bahasa Minanghasa","Bahasa Minang","Bahasa Batak"],"Bahasa Minang"),
	new Question("Salah satu tempat/landmark bersejarah di Bukittinggi yang teretak di Pasar Atas adalah",["Panorama","Ngarai Sianok","Jam Gadang","Lobang Jepang"],"Jam Gadang"),
	new Question("Tempat wisata di Bukittinggi yang dulu berguna bagi para veteran yang berperang disana dibuatlah suatu tempat yang bisa menampung hal-hal seperti amunisi, tawanan, gudang persenjataan, bahkan ada juga yang membuka warung di sana. Nama tempat semua hal itu ditampung adalah",["Jam Gadang","Lobang Jepang","Rumah Kelahiran Bung Hatta","Panorama Baru"],"Lobang Jepang"),
	new Question("Berapa tinggi Jam Gadang",["26 Meter","25 Meter","30 Meter","28 Meter"],"26 Meter"),
	new Question("Makanan khas Bukittinggi",["Sate","Rendang","Ampiang Dadiah","Galamai"],"Ampiang Dadiah"),
	new Question("Tokoh penting yang berjasa besar dalam pimpinan PDRI",["Bung Hatta","Ir Soekarno","Imam Bonjol","Sjafruddin Prawiranegara"],"Sjafruddin Prawiranegara"),
	new Question("Kapan berdirinya kota Bukittinggi",["22 Desember 1783","22 Desember 1784","22 Desember 1785","22 Desember 1782"],"22 Desember 1784"),

];
var quiz=new Quiz(questions);
populate();