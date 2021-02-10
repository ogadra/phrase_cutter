import React from 'react';
import styles from '../styles/Home.module.css';
import Modal from 'react-modal';

Modal.setAppElement("body");

export default class PhraseCutter extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        content: "",
        speed: "180",
        phrase: ""        
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.split = this.split.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true});
    setTimeout(this.closeModal, 1500)
  }

  closeModal() {        
    this.setState({modalIsOpen: false});
  }


  split(e) {
    this.openModal();
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
    <form className={styles.form} onSubmit={this.split}>
        <div className={styles.inputs}>
            <div>
                <label>1. 文章入力</label>
                <textarea name="content" value={this.state.content} onChange={this.handleChange}/>
            </div>
            <div>
                <label>2. 文章分割実行</label>
                <input name="split" type="button" disabled={this.state.content} value="分割"/>
            </div>
            <div>
                <label>3. 速度入力</label>
                <input name="speedval" type='tel' value={this.state.speed}/>語 / 分
            </div>
      </div>
      <div className={styles.formContent}>
        <input type="submit" value="送信" disabled={this.state.phrase}/>
      </div>
    </form>
    </div>
    )
  }
}