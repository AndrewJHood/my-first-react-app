
import React from 'react';
import "./Track.css";
let aobj = new Audio();
let playing = false;
class Track extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            symbol : <p>&#9654;</p>
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.setupAudio = this.setupAudio.bind(this);
        this.renderAudio = this.renderAudio.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    renderAction(){
        if(this.props.isRemoval){
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        }else{
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }
    setupAudio(){
        if(!aobj.src){
            aobj.volume = 1;
        }
        if(!(aobj.src===this.props.track.previewURL)){
            this.setState({symbol: <p>&#9654;</p>})
            aobj.src = this.props.track.previewURL;
            this.play();
            return;
        }
        if(!playing){
            this.play();
        }else if(playing){
            this.pause();
        }
    }
    play() {
        aobj.play();
        playing=true;
        this.setState({symbol: <p className="pause">&#9616;&#9616;</p>})
    }
    pause(){
        aobj.pause();
        playing=false;
        this.setState({symbol: <p>&#9654;</p>})
    }

    
    renderAudio(){
        if(this.props.track.previewURL){
            return <button className="Track-action" onClick={this.setupAudio} >{this.state.symbol}</button>
        }
        return;
    }
    render(){
        return(
            <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
            {this.renderAudio()}
            {this.renderAction()}
            </div>        
        )
    }
}

export default Track;