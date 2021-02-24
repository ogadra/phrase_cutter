import styles from '../styles/Home.module.css';
import SpeechPlayer from '../components/SpeechPlayer';
import Share from '../components/Share';
import Ogps from '../components/Ogps';
import Link from 'next/link'

export default function Home(props) {
  const domain = 'https://phrasecutter.herokuapp.com/'
  const title = "演説奏者 by ogadra";
  const url = domain + 'speechPlayer';
  const img = domain + 'pic/speechPlayer.png';

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
        <SpeechPlayer/>

        <Share url ={url}/>
      </div>
    </div>
  )
}
