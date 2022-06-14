import React, {useCallback, useMemo, useState} from 'react';
import ImageGenerator from "./ImageGenerator";
import {Link} from "react-router-dom";

interface Props {
    imageWidth: number;
    imageHeight: number;
}

const ImageFromSeed = ({imageWidth, imageHeight}: Props) => {
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
        <div className="page-image-from-seed">
            <div>
                <Link to="/seed-from-image">Seed from image</Link>
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

export default ImageFromSeed;
