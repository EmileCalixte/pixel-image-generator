import React, {useCallback, useMemo, useState} from 'react';
import ImageGenerator from "./ImageGenerator";

const App = () => {
    const IMAGE_MAX_WIDTH = 256;
    const IMAGE_MAX_HEIGHT = 256;

    const [imageWidth, setImageWidth] = useState(16);
    const [imageHeight, setImageHeight] = useState(16);
    const [seed, setSeed] = useState(BigInt(0));

    const maxSeed = useMemo(() => {
        const maxSeedBinaryLength = imageWidth * imageHeight;

        const maxSeedBits = [];

        for (let i = 0; i < maxSeedBinaryLength; ++i) {
            maxSeedBits.push(1);
        }

        return BigInt("0b" + maxSeedBits.join(''));
    }, [imageWidth, imageHeight]);

    // The seed passed to the ImageGenerator will never be greater than the max seed
    const generatorSeed = useMemo(() => {
        if (seed > maxSeed) {
            return maxSeed;
        }

        return seed;
    }, [seed, maxSeed]);

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

    const incrementSeed = () => {
        setSeed(seed + BigInt(1));
    }

    const decrementSeed = () => {
        let newSeed = seed - BigInt(1);

        if (newSeed < BigInt(0)) {
            newSeed = BigInt(0);
        }

        setSeed(newSeed);
    }

    const generateRandomSeed = useCallback(() => {
        const maxSeedBinaryLength = imageWidth * imageHeight;

        const seedBits = [];

        for (let i = 0; i < maxSeedBinaryLength; ++i) {
            seedBits.push(Math.round(Math.random()));
        }

        setSeed(BigInt("0b" + seedBits.join('')));
    }, [imageWidth, imageHeight]);

    const setSeedToMaxSeed = useCallback(() => {
        setSeed(maxSeed);
    }, [maxSeed]);

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
                    Seed
                    <button onClick={decrementSeed}>-</button>
                    <button onClick={incrementSeed}>+</button>
                    &nbsp;
                    <button onClick={generateRandomSeed}>Random</button>
                    &nbsp;
                    <button onClick={setSeedToMaxSeed}>Max</button>
                    <br/>
                    <textarea value={seed.toString()} onInput={onSeedUpdate}/>
                </label>
            </div>
            <ImageGenerator imageWidth={imageWidth} imageHeight={imageHeight} seed={generatorSeed} />
        </div>
    );
}

export default App;
