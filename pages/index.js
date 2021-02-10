import Head from 'next/head';
import styles from '../styles/Home.module.css';
import PhraseCutter from '../components/PhraseCutter';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>言語走者</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        言語走者 by ogadra
      </div>

      <PhraseCutter/>
    </div>
  )
}
