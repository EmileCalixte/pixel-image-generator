import React, {useState} from 'react';
import ImageGenerator from "./ImageGenerator";

const App = () => {
    const IMAGE_MAX_WIDTH = 256;
    const IMAGE_MAX_HEIGHT = 256;

    const [imageWidth, setImageWidth] = useState(16);
    const [imageHeight, setImageHeight] = useState(16);
    const [seed, setSeed] = useState(BigInt(0));

    const onImageWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === "" ? 1 : parseInt(e.target.value);

        setImageWidth(Math.min(IMAGE_MAX_WIDTH, Math.max(1, newValue)));
    }

    const onImageHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === "" ? 1 : parseInt(e.target.value);

        setImageHeight(Math.min(IMAGE_MAX_HEIGHT, Math.max(1, newValue)));
    }

    const onSeedUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            setSeed(BigInt(e.target.value));
        } catch (e) {}
    }

    return (
        <div className="App">
            <div className="image-size-settings">
                Image size:&nbsp;
                <input type="number"
                       value={imageWidth}
                       onInput={onImageWidthChange}
                       min={1}
                       max={IMAGE_MAX_WIDTH}
                />&nbsp;
                x&nbsp;
                <input type="number"
                       value={imageHeight}
                       onInput={onImageHeightChange}
                       min={1}
                       max={IMAGE_MAX_HEIGHT}
                />&nbsp;
                pixels
            </div>
            <div className="image-seed-input-container">
                <label>
                    Seed<br/>
                    <textarea value={seed.toString()} onInput={onSeedUpdate}/>
                </label>
            </div>
            <ImageGenerator imageWidth={imageWidth} imageHeight={imageHeight} seed={seed} />
        </div>
    );
}

export default App;
