interface Props {
    imageWidth: number,
    imageHeight: number,
    seed: BigInt
}

const ImageGenerator = ({imageWidth, imageHeight, seed}: Props) => {
    return (
        <div className="image-generator">
            <p>Image width: {imageWidth}</p>
            <p>Image height: {imageHeight}</p>
            <p>Seed: {seed.toString()}</p>
        </div>
    );
}

export default ImageGenerator;
