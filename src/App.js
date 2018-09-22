import React, { Component } from 'react';
import swarm from 'swarm-js';
import Mainpage from './mainpage';
import './App.css';

class App extends Component {
    /*
     * hash: アップロードしたファイルのハッシュ値
     * isUploading: アップロード処理中かどうかの状態をもつ
     * isComplete: アップロード処理が終了したかどうかのの状態をもつ
    */
    state = {
        hash: null,
        isUploading: false,
        isComplete: false
    };

    //アップロードしたいファイルを選択した時に呼び出す
    handleFile = event => {
        const file = event.target.files[0];

        //画像ファイル以外が選択された場合は処理を終了する
        if (!file.type.match('image.*')) {
            console.log('not image');
            return;
        }

        this.setState({isUploading: true});

        //アップロードするファイルのバイナリを読み込む
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.convertToBuffer(reader);
    }

    //アップロードするファイルをバイナリ(Uint8Array)に変換する
    convertToBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        this.uploadToSwarm(buffer);
    }

    //画像データをSwarmにアップロードする
    uploadToSwarm = async(buffer) => {
        await swarm.at("https://swarm-gateways.net").upload(buffer).then(hash => {
            this.setState({hash: hash, isUploading: false, isComplete: true});
        },(reason) => {
            this.setState({hash: null, isUploading: false, isComplete: false});
            console.log(reason);
        });
    }

    render() {
        return(
            <Mainpage
              hash={this.state.hash}
              isUploading={this.state.isUploading}
              isComplete={this.state.isComplete}
              handleFile={this.handleFile} />
        );
    };
}

export default App;
