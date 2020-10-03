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
      } else if (word.pos_detail_1 === "サ変接続") {
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


document.getElementById('phrase').onchange = function(){
    console.log(document.getElementById('phrase').value);
    if (document.getElementById('phrase').value != ""){
        document.getElementById('split').disabled = false;
    } else{
        document.getElementById('split').disabled = true;
    }
}


document.getElementById("split").onclick = function(){
    var phrase = document.getElementById("phrase").value;


    var btn = document.getElementById('splitContext');
    btn.innerHTML = '<span class="spinner"></span>';
    console.log('roading...');

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
        }
    console.log(preword);
    btn.innerHTML = '完了';
    });
}

document.getElementById("run").onclick = function(){
    overlayObj = document.getElementsByClassName('hide');
    console.log(overlayObj.length);
    for (var i = overlayObj.length; i > 0; i--){
        overlayObj[i-1].classList.add('displayed');
        overlayObj[i-1].classList.remove('hide');
    }


    console.log(phrases)
    for (var i = 0; i < phrases.length; i++ ){
        var row = table.insertRow();
        var cel = row.insertCell(0);
        cel.innerHTML = phrases[i];
    }

}

    // document.getElementById("output").innerText = path;
    
