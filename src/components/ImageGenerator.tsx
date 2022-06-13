import {useCallback, useEffect, useMemo, useRef} from "react";

interface Props {
    imageWidth: number;
    imageHeight: number;
    seed: BigInt;
}

const ImageGenerator = ({imageWidth, imageHeight, seed}: Props) => {
    const canvasRef = useRef(null);

    const binarySeed = useMemo(() => {
        return seed.toString(2).padStart(imageWidth * imageHeight, "0").split('').reverse().join('');
    }, [imageHeight, imageWidth, seed])

    const drawImage = useCallback((ctx: CanvasRenderingContext2D) => {
        const imageData = ctx.createImageData(imageWidth, imageHeight);

        for (let i = 0; i < imageData.data.length; i += 4) {
            const value = binarySeed.charAt(Math.floor(i/4)) === '0' ? 0 : 255;

            for (let j = 0; j < 3; ++j) {
                imageData.data[i+j] = value;
            }

            imageData.data[i+3] = 255; // Always full alpha
        }

        ctx.putImageData(imageData, 0, 0);
    }, [imageWidth, imageHeight, binarySeed]);

    useEffect(() => {
        if (canvasRef.current === null) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (ctx === null) {
            return;
        }

        drawImage(ctx);
    }, [seed, drawImage])

    return (
        <div className="image-generator">
            <div className="canvas-container">
                <canvas ref={canvasRef} width={imageWidth} height={imageHeight} />
            </div>
        </div>
    );
}

export default ImageGenerator;
