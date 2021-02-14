import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import Head from 'next/head';

class Ogps extends React.Component {

  render(){
    return (
      <>
        <Head>
            <title>言語走者</title>
            <meta property="og:type" content="website" />
            <meta property="og:title" content="言語走者" />
            <meta property="og:url" content="https://phrasecutter.herokuapp.com/" />
            <meta property="og:image" content="https://phrasecutter.herokuapp.com/pic/ShareCard.png"/>
            <meta property="og:site_name" content="言語走者 by ogadra" />
            <meta property="og:description" content="文章を早く読むためのサイトです。" />
            <meta name="twitter:image" content="https://phrasecutter.herokuapp.com/pic/ShareCard.png"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@const_myself"/>
            <meta name="twitter:creator" content="const_myself"/>
        </Head>
      </>
  )}
}

export default Ogps