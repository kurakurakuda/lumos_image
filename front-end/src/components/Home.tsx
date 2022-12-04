import React from "react";
import "../css/home.css";
import "../css/canvas.css"

const Home = () => {
    return (
        <div className="home">
            Home <br />
            <div className="canvas">
                ここの画像をアップロードしてください
            </div>
            <div className="btn-area">
                <div>
                    <button
                        className="btn clear-btn"
                        onClick={() => null}>
                        クリア
                    </button>
                </div>
                <div>
                    <button
                        className="btn upload-btn"
                        onClick={() => null}>
                        アップロード
                    </button>
                    <button
                        className="btn save-btn"
                        onClick={() => null}>
                        保存
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home;