import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PhraseCutter from '../components/PhraseCutter';
import Share from '../components/Share';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>&lt;dev&gt;言語走者</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        言語走者 by ogadra
      </div>

      <PhraseCutter/>
      <Share url ="https://phrasecutter.herokuapp.com/"/>
    </div>
  )
}
