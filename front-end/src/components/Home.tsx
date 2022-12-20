import React, { useState } from "react";
import "../css/home.css";
import "../css/canvas.css"
import Canvas from "./canvas/Canvas";

const Home:React.FunctionComponent = () => {

    const [isUploaded, setIsUploaded] = useState(false)

    return (
        <div className="home">
            Home <br />

            <div className="canvas">
                <Canvas isUploaded={isUploaded} />
            </div>
            <div className="btn-area">
                <div>
                    <button
                        className="btn clear-btn"
                        onClick={() => setIsUploaded(false)}>
                        クリア
                    </button>
                </div>
                <div>
                    <button
                        className="btn upload-btn"
                        onClick={() => setIsUploaded(true)}>
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