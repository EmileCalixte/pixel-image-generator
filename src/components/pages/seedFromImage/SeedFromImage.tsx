import {Link} from "react-router-dom";
import React, {useEffect, useMemo, useRef, useState} from "react";

interface Props {
    imageWidth: number;
    imageHeight: number;
}

interface Pixel {
    row: number;
    col: number;
    isOn: boolean;
}

const SeedFromImage = ({imageWidth, imageHeight}: Props) => {

    const pixelContainerRef = useRef(null);

    const [pixelContainerWidth, setPixelContainerWidth] = useState(0);

    const [pixelRows, setPixelRows] = useState([]);

    useEffect(() => {
        function handleWindowResize() {
            // @ts-ignore
            setPixelContainerWidth(pixelContainerRef.current.offsetWidth);
        }

        window.addEventListener('resize', handleWindowResize)

        handleWindowResize();
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, [])

    useEffect(() => {
        const pixelRows: Pixel[][] = [];

        for (let i = 0; i < imageHeight; ++i) {
            const pixelRow = [];

            for (let j = 0; j < imageWidth; ++j) {
                pixelRow.push({
                    row: i,
                    col: j,
                    isOn: false,
                });
            }

            pixelRows.push(pixelRow);
        }

        // @ts-ignore
        setPixelRows(pixelRows);
    }, [imageWidth, imageHeight]);

    const pixelHeight = useMemo(() => {
        return pixelContainerWidth / imageWidth;
    }, [pixelContainerWidth, imageWidth]);

    const onPixelClick = (pixel: Pixel) => {
        pixel.isOn = !pixel.isOn;

        setPixelRows([...pixelRows]);
    }

    const seed: BigInt = useMemo(() => {
        const seedBits: string[] = [];

        pixelRows.forEach(pixelRow => {
            // @ts-ignore
            pixelRow.forEach(pixel => {
                seedBits.push(pixel.isOn ? '1' : '0');
            })
        });

        if (seedBits.length <= 0) {
            return BigInt(0);
        }

        return BigInt("0b" + seedBits.reverse().join(""));
    }, [pixelRows]);

    return (
        <div className="page-seed-from-image">
            <div>
                <Link to="/image-from-seed">Image from seed</Link>
            </div>

            <div className="pixels-container" ref={pixelContainerRef}>
                {pixelRows.map((pixelRow: Pixel[], index) => {
                    return(
                        <div className="pixel-row" key={index}>
                            {pixelRow.map((pixel: Pixel, index) => {
                                return (
                                    <div className="pixel"
                                         data-row={pixel.row}
                                         data-col={pixel.col}
                                         style={{
                                             height: pixelHeight,
                                             backgroundColor: pixel.isOn ? 'white' : 'black',
                                         }}
                                         key={index}
                                         onClick={() => {onPixelClick(pixel)}}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            <div className="seed-container">
                <textarea value={seed.toString()} readOnly={true} />
            </div>
        </div>
    );
}

export default SeedFromImage;
