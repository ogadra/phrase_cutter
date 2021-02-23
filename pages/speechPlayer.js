import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SpeechPlayer from '../components/SpeechPlayer';
import Share from '../components/Share';
import Ogps from '../components/Ogps';

export default function Home() {
  return (
    <div>
      <Ogps/>
      <div className={styles.header}>
        <a href="https://twitter.com/const_myself">
          演説奏者 by ogadra
        </a>
      </div>
      <div className={styles.container}>
        <SpeechPlayer/>
        <Share url ="https://phrasecutter.herokuapp.com/"/>
      </div>
    </div>
  )
}
