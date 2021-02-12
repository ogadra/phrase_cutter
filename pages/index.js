import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PhraseCutter from '../components/PhraseCutter';
import Share from '../components/Share';

export default function Home() {
  return (
    <div>
      <Head>
        <title>&lt;dev&gt;言語走者</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <a href="https://twitter.com/const_myself">
          言語走者 by ogadra
        </a>
      </div>
      <div className={styles.container}>
        <PhraseCutter/>
        <Share url ="https://phrasecutter.herokuapp.com/"/>
      </div>
    </div>
  )
}
