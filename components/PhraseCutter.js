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
        phrase: "" //文節区切りの文章
    };

    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeSpeed = this.handleChangeSpeed.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.split = this.split.bind(this);
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
    kuromoji.builder({dicPath: "/dict"}).build((err, tokenizer) => {
        if(err){
            console.log(err)
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
            this.setState({phrase: phrases})
            console.log(this.state.phrase)
        }
    })
  }


  handleChangeContent(e){
    this.setState({content: e.target.value}, ()=>{
        this.split();
    });

}

  handleChangeSpeed(e){
    var value = e.target.value.replace(/\D/gi,'');
    if (/^([1-9]\d*|0|)$/.test(value)){
        this.setState({speed: value});
    } else if (/^0\d*$/.test(value)){
        this.setState({speed: value.match(/([1-9]\d*|0|)$/)[0]});
    } else if (value===null){
        this.setState({speed: ""})
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
    setTimeout(this.closeModal, 1500);
  }

  closeModal() {        
    this.setState({modalIsOpen: false});
  }

  onSubmit(){
    return false
  }

/*      <input type="hidden" name="contact_number" /> */
  render(){
     return(
    <div className={styles.wrapper}>
        <Modal isOpen={this.state.modalIsOpen} className={styles.modal} style={{overlay:{backgroundColor:'rgba(40,40,40,0.5)'}}}>
            <div>
                フォームが正常に送信されました。
            </div>
        </Modal>
        <div className={styles.form}>
            <div className={styles.inputs}>
                <div>
                    <label>1. 文章入力</label>
                    <textarea name="content" value={this.state.content} onChange={this.handleChangeContent}/>
                </div>
    
                <div>
                    <label>2. 速度入力</label>
                    <input name="speed" type='tel' value={this.state.speed} onChange={this.handleChangeSpeed}/>語 / 分
                 </div>
            </div>
            <div className={styles.formContent}>
                <input type="button" value="実行" disabled={this.state.phrase}/>
            </div>
        </div>
    </div>
    )
  }
}