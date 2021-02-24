import React from 'react';
import styles from '../styles/Home.module.css';
import Modal from 'react-modal';
import kuromoji from 'kuromoji';

Modal.setAppElement("body");

function breakCheck(word, prepos){
    // 続ける場合はFalse, 分ける単語が来た場合はTrueを返す
      if (prepos.pos_detail_1 === "空白"){
          return false
      }else if (word.pos==="助詞" || word.pos==="助動詞") {
          return false
      } else if (prepos.pos_detail_1 ==="括弧閉") {
          return true
      } else if (prepos.pos_detail_1 === "括弧開") {
          return false
      } else if (prepos.pos === "接頭詞") {
          return false
      } else if (prepos.pos === "名詞" && word.pos === "名詞") {
          return false
      } else if (word.pos_detail_1=="サ変接続") {
          return true
      } else if (word.pos_detail_1 === "非自立") {
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

export default class SpeechPlayer extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        content: "",
        speed: 420,
        time: 300,
        phrase: [], //文節区切りの文章
        characterLength: [],
        lengthSum: 0,
        displayAfter: "",
        display: "", //現在表示中の文節
        displayBefore: "",
        interval: 60000 / 450,
        button: "文章が未入力です",
        buttonDisable: true,
        loading: false,
        modalIsOpen: false,
        tokenizer: false
    }

    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.split = this.split.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stop = this.stop.bind(this);
    //this.runDisplay = this.runDisplay.bind(this);
  }

  loadDict(){
      return new Promise((resolve, reject) => {
        kuromoji.builder({dicPath: "/dict"}).build((err, _tokenizer) => {
            if (err){
                console.log(err);
            } else{
                this.state.tokenizer = _tokenizer;
                resolve();
            }
          });
      })
  }

split(){
    // const tmp = this.state.content;
    if (!this.state.content){
        this.setState({button: "文章が未入力です", buttonDisable: true, loading: false});
    } else{
        this.setState({button: "解析中…", buttonDisable: true, loading: true});
        const path = this.state.tokenizer.tokenize(this.state.content);
        let phrases = [path[0].surface_form];
        let preword = path[0];
        let characterLength = path[0].reading ? [path[0].reading.length] : [path[0].surface_form.length];

        for (let i = 1; i < path.length; i++){
            let tmpCharacter = path[i].reading ? path[i].reading : path[i].surface_form;
            let tmpCharacterLength = tmpCharacter.length;
            // console.log(path[i].reading ? path[i].reading : path[i].surface_form);
            tmpCharacterLength -= (tmpCharacter.match(/ャ|ュ|ョ/g)||[]).length;
            // console.log(tmpCharacter.match(/ゃ|ゅ|ょ/g)||[]);
            if (path[i].pos_detail_1 === "空白"){
                phrases.push("");
                characterLength.push(0);
            } else if (preword.pos === "名詞" && path[i].pos === "名詞" && phrases[phrases.length - 1].length + path[i].surface_form.length >= 10){
                phrases.push(path[i].surface_form);
                characterLength.push(tmpCharacterLength);
            }else if (breakCheck(path[i], preword)) {
                phrases.push(path[i].surface_form);
                characterLength.push(tmpCharacterLength);
            }else {
                phrases[phrases.length - 1] += path[i].surface_form;
                characterLength[phrases.length-1] += tmpCharacterLength;
            }
        preword = path[i];
        }

        for (let i = 1; i < characterLength.length ; i++){
            characterLength[i] += characterLength[i-1];
        }

        this.setState({phrase: phrases, characterLength: characterLength, lengthSum: characterLength[characterLength.length-1],display: phrases[0], displayBefore: this.state.content.replace(phrases[0],''), button: "実行", buttonDisable: false, loading: false});
        return true
    }
  }
    
  handleChangeContent(e){
    if (!this.state.tokenizer){
        this.setState({content: e.target.value, button: "辞書の読み込み中", buttonDisable: true, loading: true});
        this.loadDict().then((ret) =>
        {
            this.split();
        })
    } else {
        this.setState({content: e.target.value}, ()=>{
        this.split();
    });}
  }

  handleChangeSpeed(e){
    this.setState({speed:isNaN(parseInt(e.target.value)) || e.target.value < 1 ? '' : parseInt(e.target.value)}, ()=>
    {this.setState({interval: 60000 / this.state.speed, time: this.state.lengthSum / this.state.speed * 60})})
  }

  handleChangeTime = (e) => {
    this.setState({time:isNaN(parseInt(e.target.value)) || e.target.value < 1 ? '' : parseInt(e.target.value)}, ()=>
    {this.setState({speed: this.state.lengthSum / this.state.time * 60, interval: this.state.time / this.state.lengthSum})})
  }

  stop(){
    for (let i=0; i < this.state.phrase.length; i++){
        clearTimeout(this.run[i]);
    }
    clearTimeout(this.modalClose);

    document.body.removeAttribute('style', 'overflow: hidden;')
    this.setState({modalIsOpen: false, displayAfter: "", display: this.state.phrase[0] ,displayBefore: this.state.content.replace(this.state.phrase[0],'')});
}

  openModal() {

    const runDisplay = (i) =>{
        if (i < this.state.phrase.length -1){
            i++;
            var re = new RegExp('( |\n|　)*' + this.state.phrase[i]);
            var match = this.state.displayBefore.match(re)[0];
            console.log(match, this.state.displayBefore);

            this.setState({
                displayAfter: this.state.displayAfter + this.state.display,
                displayBefore: this.state.displayBefore.replace(match, '')
            }, ()=> {
                this.setState({
                    display: match
                });
            });
        } else {
            this.setState({display: this.state.phrase[this.state.phrase.length-1]});
        }
    }

    this.setState({modalIsOpen: true}, () => {
        document.body.setAttribute('style', 'overflow: hidden;')
    });

    this.run = [];

    for (let i=0; i < this.state.phrase.length; i++){
        this.run[i] = setTimeout(runDisplay, this.state.interval * this.state.characterLength[i], i);
    }

    this.modalClose = setTimeout(this.stop, this.state.interval * this.state.characterLength[this.state.characterLength.length - 1]);
    //setTimeout(this.closeModal, this.state.interval * this.state.phrase.length);
  }

  closeModal() {
    this.stop()
    this.setState({display: this.state.phrase[0]});
  }

  onSubmit(){
    this.openModal();
  }


/*      <input type="hidden" name="contact_number" /> */
  render(){
     return(
    <div className={styles.wrapper}>
        <Modal isOpen={this.state.modalIsOpen} className={styles.modalLarge} style={{overlay:{backgroundColor:'rgba(255,255,255,0.8)'}}}>
            <p>
                {this.state.displayAfter}
                <strong className={styles.strong}>
                    {this.state.display}
                </strong>
                {this.state.displayBefore}
            </p>
            <button className={styles.button} onClick={this.closeModal}>
                <div>閉じる</div>
            </button>
        </Modal>
        <div className={styles.form}>
            <label>文章入力 (ひらがな換算で{this.state.lengthSum}文字)</label>
            <textarea name="content" value={this.state.content} onChange={this.handleChangeContent} placeholder="文章を入力してください"/>

            <label>速度入力</label>
            <div className={styles.val}>
                <input type='tel' value={this.state.speed} onChange={this.handleChangeSpeed}/> 音 / 分
            </div>
            
            <label>制限時間入力</label>
            <div className={styles.val}>
                <input type='tel' value={this.state.time} onChange={this.handleChangeTime}/> 秒
            </div>

            <button type="button" disabled={this.state.buttonDisable} onClick={this.onSubmit}>
                <div className={this.state.loading ? styles.spinner : styles.false}/>
                <div className={this.state.loading ? styles.lightfont : styles.false}>{this.state.button}</div>
            </button>
        </div>
    </div>
    )
  }
}