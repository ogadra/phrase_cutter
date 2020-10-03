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
          return false
      } else if (word.pos_detail_1 === "接尾"){
          return false
      } else if (word.conjugated_type === "サ変・スル"){
          return false
      } else if (word.pos === "記号") {
          if (word.pos_detail_1 === "括弧開"){
            return true
          } else {
            return false
          }
      } else {
          return true
      }
}
function sleep(waitMsec) {
    var startMsec = new Date();
    while (new Date() - startMsec < waitMsec);
}


document.getElementById('phrase').onchange = function(){
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
		phrases = [path[0].surface_form];
        var preword = path[0];
        for (var i = 1; i < path.length; i++){
            if (preword.pos === "名詞" && path[i].pos === "名詞" && phrases[phrases.length - 1].length + path[i].surface_form.length >= 10){
                phrases.push(path[i].surface_form);
            }else if (breakCheck(path[i], preword)) {
                phrases.push(path[i].surface_form);
            }else {
                phrases[phrases.length - 1] += path[i].surface_form;
          }
          preword = path[i];
        }
    console.log(phrases);
    btn.innerHTML = '分割';
    document.getElementById('run').disabled = false;
    });
}

document.getElementById('speed').onchange = function(){
    document.getElementById('speedval').value = document.getElementById('speed').value;
}
document.getElementById('speedval').onchange = function(){
    document.getElementById('speed').value = document.getElementById('speedval').value;
}

document.getElementById("run").onclick = function(){
    var wordRun = document.getElementById('wordRun');
    wordRun.innerText = phrases[0];

    overlayObj = document.getElementById('overlay');
    overlayObj.classList.add('displayed');
    overlayObj.classList.remove('hide');

    var interval = 600;

    var i = 0;
    var runDisplay = function(){
        if (i < phrases.length){
            wordRun.innerText = phrases[i];
        } else {
            wordRun.innerText = phrases[phrases.length - 1]
        }
        i++;
    }


    var run = setInterval(runDisplay,interval);
    
    function stop(){
        clearInterval(run);
        overlayObj.classList.remove('displayed');
        overlayObj.classList.add('hide');
    }
    setTimeout(stop,interval*(phrases.length+1));

}
