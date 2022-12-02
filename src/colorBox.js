import React, { Component } from 'react';
import './styles/main.scss'
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Link } from 'react-router-dom'
import chroma from 'chroma-js';

class ColorBox extends Component {
    constructor(props){
        super(props)
        this.state = {copied: false}

        this.changeCopyState = this.changeCopyState.bind(this)
    } 
    changeCopyState() {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied:false}), 1500)
        })
    }
    render() {
        const {name, background, moreURL, showLink} = this.props
        const {copied} = this.state
        const isDarkColor = chroma(background).luminance() <= 0.08
        const isLightColor = chroma(background).luminance() >= 0.07;

        return (
          <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div className="ColorBox" style={{ background }}>
              <div
                className={`copy-overlay ${copied ? "show" : undefined}`}
                style={{ background }}
              />
              <div className={`copy-msg ${copied ? "show" : undefined}`}>
                <h1>copied!</h1>
                <p className="copy-text">{this.props.background}</p>
              </div>
              <div className="copy-container">
                <div className="box-content">
                  <span className={isDarkColor ? "light-text" : undefined}>{name}</span>
                </div>
                <button
                  className={`copy-button ${isLightColor ? "dark-text" : undefined}`}
                >
                  Copy
                </button>
              </div>
              {showLink && (
                <Link to={moreURL} onClick={(e) => e.stopPropagation()}>
                  <span className={`see-more ${isLightColor ? "dark-text" : undefined}`}>
                    MORE
                  </span>
                </Link>
              )}
            </div>
          </CopyToClipboard>
        );
    }
}

export default ColorBox;
