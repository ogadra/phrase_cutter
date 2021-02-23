import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import Head from 'next/head';

class Ogps extends React.Component {
  constructor(props){
    super(props); // img, title, url
  }
  render(){
    return (
      <>
        <Head>
            <title>{this.props.title}</title>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={this.props.title} />
            <meta property="og:url" content={this.props.url} />
            <meta property="og:image" content={this.props.img}/>
            <meta property="og:site_name" content={this.props.title}/>
            <meta property="og:description" content="文章を早く読むためのサイトです。" />
            <meta name="twitter:image" content={this.props.img}/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@const_myself"/>
            <meta name="twitter:creator" content="const_myself"/>
            <link rel="icon" href="/favicon.ico" />
        </Head>
      </>
  )}
}

export default Ogps