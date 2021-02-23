import styles from '../styles/Home.module.css';
import PhraseCutter from '../components/PhraseCutter';
import Share from '../components/Share';
import Ogps from '../components/Ogps';
import Link from 'next/link';

export default function Home() {
  const domain = 'https://phrasecutter.herokuapp.com/'
  const title = "言語走者 by ogadra";
  const url = domain + 'wordRunner';
  const img = domain + '/pic/wordRunner.png';
  return (
    <div>
      <Ogps title={title} url={url} img={img}/>
        <div className={styles.header}>
          <Link href='/'>
            <div className={styles.top}>
              &lt; TOP
            </div>
          </Link>
          <a href="https://twitter.com/const_myself">
            {title}
          </a>
        </div>
      <div className={styles.container}>
        <PhraseCutter/>
        <Share url ="https://phrasecutter.herokuapp.com/wordRunner"/>
      </div>
    </div>
  )
}
