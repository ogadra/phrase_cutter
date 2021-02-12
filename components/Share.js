import * as React from 'react';
import styles from '../styles/Share.module.css';

import {
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    LineShareButton, LineIcon
} from 'react-share'

const config = {
    size: 48,
    title: "言語走者"
}

export default class Social extends React.Component{
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
        <div className={styles.container}>
            <TwitterShareButton url={this.props.url} title={this.props.title ? this.props.title : config.title}>
                <TwitterIcon size={this.props.size ? this.props.size : config.size} round />
            </TwitterShareButton>
            <FacebookShareButton url={this.props.url} title={this.props.title ? this.props.title : config.title}>
                <FacebookIcon size={this.props.size ? this.props.size : config.size} round />
            </FacebookShareButton>
            <LineShareButton url={this.props.url} title={this.props.title ? this.props.title : config.title}>
                <LineIcon size={this.props.size ? this.props.size : config.size} round />
            </LineShareButton>
        </div>

        )
    }
}