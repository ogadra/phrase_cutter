import styles from '../styles/Home.module.css';
import Share from '../components/Share';
import Ogps from '../components/Ogps';
import Card from '../components/Card';


export default function Home() {
  const title = "ogadra's Word Library"
  const domain = 'https://phrasecutter.herokuapp.com/'
  const img = domain + '/pic/ShareCard.png'
  console.log(img);
  return (
    <div>
      <Ogps title={title} img={img} url={domain}/>
      <div className={styles.header}>
        <a href="https://twitter.com/const_myself">
          {title}
        </a>
      </div>
      <div className={styles.container}>
          <Card img='/wordRunner.png' title='言語走者' discription='文章を文節区切りで画面に表示し、速読を支援してくれるツールです。' href='/wordRunner'/>
          <Card img='/speechPlayer.png' title='演説奏者' discription='読むべきタイミングで読むべき場所をハイライト表示し、プレゼン時のスピード調整練習に役立つツールです。' href='/speechPlayer'/>
        <Share url ={domain}/>
      </div>
    </div>
  )
}
