// var kuromoji = require("kuromoji");

function breakCheck(word, prepos){
    // 続ける場合はFalse, 分ける単語が来た場合はTrueを返す
      if (word.pos==="助詞" || word.pos==="助動詞") {
          return false
      } else if (prepos.pos_detail_1 ==="括弧閉") {
          return true
      } else if (prepos.pos_detail_1 === "括弧開") {
          return false
      }  else if (prepos.pos === "名詞" && word.pos === "名詞") {
          return false
      } else if (word.pos_detail_1=="サ変接続") {
        return true
      } else if (word.pos_detail_1 === "非自立") {
          return false
      } else if (prepos.pos === "接頭詞") {
          console.log(prepos);
          return false
      } else if (word.pos_detail_1 === "接尾"){
          return false
      } else if (word.conjugated_type === "サ変・スル"){
          return false
      } else if (word.pos ==="記号") {
          if (word.pos_detail_1==="括弧開"){
            return true
          } else {
            return false
          }
      } else {
          return true
      }
    
    }

document.getElementById("btn").onclick = function(){
    var phrase = document.getElementById("phrase").value;

    kuromoji.builder({ dicPath: "node_modules/kuromoji/dict/" }).build(function (err, tokenizer) {
        var path = tokenizer.tokenize(phrase);
        var table = document.getElementById('targetTable');
		var phrases = [path[0].surface_form];
        var preword = path[0];
        for (var i = 1; i < path.length; i++){
                if (breakCheck(path[i], preword)) {
            phrases.push(path[i].surface_form);
          }else {
            phrases[phrases.length - 1] += path[i].surface_form;
          }
          preword = path[i];

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