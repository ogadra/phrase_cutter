// var kuromoji = require("kuromoji");


document.getElementById("btn").onclick = function(){
    var phrase = document.getElementById("phrase").value;

    kuromoji.builder({ dicPath: "node_modules/kuromoji/dict/" }).build(function (err, tokenizer) {
        var path = tokenizer.tokenize(phrase);
        var table = document.getElementById('targetTable');
		var phrases = [path[0].surface_form];
		var prepos = path[0].pos;
        for (var i = 1; i < path.length; i++){
			if (path[i].pos==="助詞"||path[i].pos==="助動詞") {
				phrases[phrases.length - 1] += path[i].surface_form;
			} else if (prepos === "名詞" && path[i].pos === "名詞") {
				phrases[phrases.length - 1] += path[i].surface_form;
			} else {
				phrases.push(path[i].surface_form);
            }
            prepos = path[i].pos;

/*            console.log(path[i].surface_form);
            
            var cel1 = row.insertCell(0);
            var cel2 = row.insertCell(1);
            cel1.innerHTML = path[i].surface_form;
            cel2.innerHTML = path[i].pos;*/
        }
        console.log(phrases)
        for (var i = 0; i < phrases.length; i++ ){
            var row = table.insertRow();
            var cel = row.insertCell(0);
            cel.innerHTML = phrases[i];
        }
		
		
      });

    // document.getElementById("output").innerText = path;
    
}