import React from 'react';
import styles from '../styles/Home.module.css';
import Modal from 'react-modal';
import kuromoji from 'kuromoji';

Modal.setAppElement("body");

export default class PhraseCutter extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        content: "",
        speed: "180",
        phrase: "", //文節区切りの文章
        display: "", //現在表示中の文節
        interval: 60000 / 180,
        button: "文章が未入力です",
        buttonDisable: true,
        loading: false,
        modalIsOpen: false
    };

    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.split = this.split.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.runDisplay = this.runDisplay.bind(this);
  }

  breakCheck(word, prepos){
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

  split(){
    this.setState({button: "解析中…", buttonDisable: true, loading: true});
    if (!this.state.content){
        this.setState({button: "文章が未入力です", buttonDisable: true, loading: false});
    } else{
        kuromoji.builder({dicPath: "/dict"}).build((err, tokenizer) => {
            if(err){
                console.log(err);
                this.setState({button: "エラーが発生しました", buttonDisable: true});
            } else if (this.state.content){
                const path = tokenizer.tokenize(this.state.content);
                let phrases = [path[0].surface_form];
                let preword = path[0];
                for (let i = 1; i < path.length; i++){
                    if (path[i].pos_detail_1 === "空白"){
                        phrases.push("");
                    } else if (preword.pos === "名詞" && path[i].pos === "名詞" && phrases[phrases.length - 1].length + path[i].surface_form.length >= 10){
                        phrases.push(path[i].surface_form);
                    }else if (this.breakCheck(path[i], preword)) {
                        phrases.push(path[i].surface_form);
                    }else {
                        phrases[phrases.length - 1] += path[i].surface_form;
                    }
                preword = path[i];
                }
                this.setState({phrase: phrases, display: phrases[0], button: "実行", buttonDisable: false, loading: false})
                //this.setState({phrase: phrases})
            }
        })
    }
  }
  
  handleChangeContent(e){
    this.setState({content: e.target.value}, ()=>{
        this.split();
    });
  }

  handleChangeSpeed(e){
    this.setState({speed:isNaN(parseInt(e.target.value)) || e.target.value < 1 ? '' : parseInt(e.target.value)}, ()=>
    {this.setState({interval: 60000 / this.state.speed})})
  }


  openModal() {
    let i = 1;
    
    const runDisplay = () =>{
        if (i < this.state.phrase.length){
            this.setState({display: this.state.phrase[i++]});
        } else {
            this.setState({display: this.state.phrase[this.state.phrase.length-1]});
        }
    }

    this.setState({modalIsOpen: true});
    let run = setInterval(runDisplay, this.state.interval, i);

    stop = () => {
        clearInterval(run);
        this.closeModal();
    }
    setTimeout(stop, this.state.interval * this.state.phrase.length);
    //setTimeout(this.closeModal, this.state.interval * this.state.phrase.length);
  }

  closeModal() {        
    this.setState({modalIsOpen: false, display: this.state.phrase[0]});

  }

  onSubmit(){
    this.openModal();
  }

/*      <input type="hidden" name="contact_number" /> */
  render(){
     return(
    <div className={styles.wrapper}>
        <Modal isOpen={this.state.modalIsOpen} className={styles.modal} style={{overlay:{backgroundColor:'rgba(40,40,40,0.5)'}}}>
            <p>
                {this.state.display}
            </p>
        </Modal>
        <div className={styles.form}>
            <label>文章入力</label>
            <textarea name="content" value={this.state.content} onChange={this.handleChangeContent} placeholder="文章を入力してください"/>

            <label>速度入力</label>
            <div className={styles.val}>
                <input type='tel' value={this.state.speed} onChange={this.handleChangeSpeed}/> 語 / 分
            </div>
            
            <button type="button" disabled={this.state.buttonDisable} onClick={this.onSubmit}>
                <div className={this.state.loading ? styles.spinner : false}/>
                <div className={this.state.loading ? styles.lightfont : false}>{this.state.button}</div>
            </button>
        </div>
    </div>
    )
  }
}