// var kuromoji = require("kuromoji");


document.getElementById("btn").onclick = function(){
    var phrase = document.getElementById("phrase").value;

    kuromoji.builder({ dicPath: "node_modules/kuromoji/dict/" }).build(function (err, tokenizer) {
        // tokenizer is ready
        var path = tokenizer.tokenize(phrase);
        // console.log(path);
        var table = document.getElementById('targetTable');

        for (let i = 0; i < path.length; i++){
            console.log(path[i].surface_form)
            var row = table.insertRow();
            var cel1 = row.insertCell(0);
            var cel2 = row.insertCell(1);
            cel1.innerHTML = path[i].surface_form
            cel2.innerHTML = path[i].pos
        }

      });

    // document.getElementById("output").innerText = path;
    
}