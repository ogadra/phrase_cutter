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

export default class PhraseCutter extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        content: "",
        speed: 100,
        phrase: ["メロスは", "激怒した。", "必ず、", "かの", "邪智暴虐の", "王を", "除かなければならぬと", "決意した。", "メロスには", "政治が", "わからぬ。", "メロスは、", "村の", "牧人である。", "笛を", "吹き、", "羊と", "遊んで", "暮して来た。", "けれども", "邪悪に対しては、", "人一倍に", "敏感であった。"], //文節区切りの文章
        remaining: 22,
        display: "メロスは", //現在表示中の文節
        interval: 60000 / 100,
        button: "実行",
        buttonDisable: false,
        loading: false,
        modalIsOpen: false,
        tokenizer: false,
        i:1,
        placeholder: "メロスは激怒した。必ず、かの邪智暴虐の王を除かなければならぬと決意した。メロスには政治がわからぬ。メロスは、村の牧人である。笛を吹き、羊と遊んで暮して来た。けれども邪悪に対しては、人一倍に敏感であった。",
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
        this.setState({button: "文章が未入力です", buttonDisable: true, loading: false, placeholder:"文章を入力してください"});
    } else{
        this.setState({button: "解析中…", buttonDisable: true, loading: true});
        const path = this.state.tokenizer.tokenize(this.state.content);
        let phrases = [path[0].surface_form];
        let preword = path[0];
        for (let i = 1; i < path.length; i++){
            if (path[i].pos_detail_1 === "空白"){
                phrases.push("");
            } else if (preword.pos === "名詞" && path[i].pos === "名詞" && phrases[phrases.length - 1].length + path[i].surface_form.length >= 10){
                phrases.push(path[i].surface_form);
            }else if (breakCheck(path[i], preword)) {
                phrases.push(path[i].surface_form);
            }else {
                phrases[phrases.length - 1] += path[i].surface_form;
            }
        preword = path[i];
        }
        this.setState({phrase: phrases,remaining: phrases.length-1 ,display: phrases[0], button: "実行", buttonDisable: false, loading: false})
        return true
                //this.setState({phrase: phrases})
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
    // this.setState({speed:isNaN(parseInt(e.target.value)) || e.target.value < 1 ? '' : parseInt(e.target.value)}, ()=>
    // {this.setState({interval: 60000 / this.state.speed})})

    var value = e.target.value.replace(/\D/gi,'');
    if (/^([1-9]\d*|0|)$/.test(value)){
        this.setState({speed: value});
    } else if (/^0\d*$/.test(value)){
        this.setState({speed: value.match(/([1-9]\d*|0|)$/)[0]});
    } else if (value===null){
        this.setState({speed: ''})
    }
  }

  stop(){
    clearInterval(this.run);
    clearTimeout(this.timer);
    this.setState({modalIsOpen: false, i:1, display: this.state.phrase[0], remaining: this.state.phrase.length-1});
}

  openModal() {
    const runDisplay = () =>{
        if (this.state.i < this.state.phrase.length){
            this.setState(state => ({display: this.state.phrase[this.state.i], i: this.state.i+1, remaining: this.state.remaining - 1}));
        } else {
            this.setState({display: this.state.phrase[this.state.phrase.length-1], remaining: 0});
        }
    }
    this.setState({modalIsOpen: true});
    this.run = setInterval(runDisplay, this.state.interval);
    this.timer = setTimeout(() => this.stop(), this.state.interval * this.state.phrase.length);
  }

  closeModal() {
    this.stop()
  }

  onSubmit(){
    this.openModal();
  }


/*      <input type="hidden" name="contact_number" /> */
  render(){
     return(
    <div className={styles.wrapper}>
        <Modal isOpen={this.state.modalIsOpen} className={styles.modal} style={{overlay:{backgroundColor:'rgba(255,255,255,0.8)'}}}>
            <p>
                {this.state.display}
            </p>
            <br/>
            <p style={{width:'70%', marginLeft:'15%', fontSize:'5vw'}}>
                残り{this.state.remaining}文節 / {this.state.phrase.length}文節
            </p>
            <button className={styles.button} onClick={this.closeModal}>
                <div>閉じる</div>
            </button>
        </Modal>
        <div className={styles.form}>
            <label>文章入力</label>
            <textarea name="content"
            value={this.state.content}
            onChange={this.handleChangeContent}
            placeholder={this.state.placeholder}
            />

            <label>速度入力</label>
            <div className={styles.val}>
                <input type='tel' value={this.state.speed} onChange={this.handleChangeSpeed}/> 語 / 分
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