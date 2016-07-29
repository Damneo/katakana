var hiragana = [

	{"A":"ア"},{"I":"イ"},{"U":"ウ"},{"E":"エ"},{"O":"オ"},
	{"KA":"カ"},{"KI":"キ"},{"KU":"ク"},{"KE":"ケ"},{"KO":"コ"},
	{"SA":"サ"},{"SHI":"シ"},{"SU":"ス"},{"SE":"セ"},{"SO":"ソ"},
	{"TA":"タ"},{"CHI":"チ"},{"TSU":"ツ"},{"TE":"テ"},{"TO":"ト"},
	{"NA":"ナ"},{"NI":"ニ"},{"NU":"ヌ"},{"NE":"ネ"},{"NO":"ノ"},
	{"HA":"ハ"},{"HI":"ヒ"},{"fU":"フ"},{"HE":"ヘ"},{"HO":"ホ"},
	{"MA":"マ"},{"MI":"ミ"},{"MU":"ム"},{"ME":"メ"},{"MO":"モ"},
	{"YA":"ヤ"},{"YU":"ユ"},{"YO":"ヨ"},
	{"RA":"ラ"},{"RI":"リ"},{"RU":"ル"},{"RE":"レ"},{"RO":"ロ"},
	{"WA":"ワ"},{"WO":"ヲ"},
	{"N":"ン"},
];

function shuffle(sourceArray) {

    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

//build the div item with object. show is the symbol we display : hiragana or romaji
function generateItem(obj,show) {

	var display = (show == "romaji") ? Object.keys(obj) : obj[Object.keys(obj)];
	var hide = (show == "romaji") ? obj[Object.keys(obj)] : Object.keys(obj);

	return "<div class='item' attr-hide='"+ hide +"'><div class='show'>"+ display +"</div><input type='text'></div>";
}

function generateCopyHiragana() {

	$("#copy-hiragana").empty();
	$(hiragana).each(function(k,o){
		
		$("#copy-hiragana").append("<input data-clipboard-text='"+o[Object.keys(o)]+"' class='hiragana-bn' type='button' value='"+o[Object.keys(o)]+"'>");
	});
}

function generateItems(show) {

	$("#container").empty();
	var mixed_hiragana = shuffle(hiragana);
	$(mixed_hiragana).each(function(k,v){
		
		$("#container").append(generateItem(v, show));
	});

	checkInput();
}

function checkInput() {

	$(".item input").on("keyup", function(){
		var hide = $(this).parent().attr("attr-hide");
		var text = $(this).val();

		$(this).parent().removeClass("error");
		if (hide == text) {
			$(this).parent().removeClass("error");
			$(this).parent().addClass("success");
			updateScore();
		} else {
			$(this).parent().removeClass("success");
			updateScore();
		}
	});

	$(".item input").on("focusout", function(){

		var text = $(this).val();
		$(this).parent().removeClass("error");

		if (text != "" && $(this).parent().attr("attr-hide") != text) {
			$(this).parent().addClass("error");
		}
	});
}

function updateScore() {

	$(".score").empty().text("Score : " + $(".item.success").length);
}

//MAIN
$(document).ready(function(){

	$(".generate.hira").click(function() {
		generateItems("hiragana");
		$("#copy-hiragana").hide();
		updateScore();
	});

	$(".generate.roma").click(function() {
		generateCopyHiragana();
		generateItems("romaji");
		$("#copy-hiragana").show();
		new Clipboard('#copy-hiragana input');
		updateScore();
	});
});


