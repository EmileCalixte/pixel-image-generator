import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ImageFromSeed from "./pages/imageFromSeed/ImageFromSeed";
import SeedFromImage from "./pages/seedFromImage/SeedFromImage";
import React, {useState} from "react";

const App = () => {
    const IMAGE_MAX_WIDTH = 256;
    const IMAGE_MAX_HEIGHT = 256;

    const [imageWidth, setImageWidth] = useState(16);
    const [imageHeight, setImageHeight] = useState(16);

    const onImageWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === "" ? 1 : parseInt(e.target.value);

        setImageWidth(Math.min(IMAGE_MAX_WIDTH, Math.max(1, newValue)));
    }

    const onImageHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value === "" ? 1 : parseInt(e.target.value);

        setImageHeight(Math.min(IMAGE_MAX_HEIGHT, Math.max(1, newValue)));
    }

    return (
        <BrowserRouter>
            <div id="app">
                <div id="app-content">
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
                    <div id="page-content">
                        <Routes>
                            <Route path="/image-from-seed" element={<ImageFromSeed imageWidth={imageWidth} imageHeight={imageHeight} />} />
                            <Route path="/seed-from-image" element={<SeedFromImage imageWidth={imageWidth} imageHeight={imageHeight} />} />

                            <Route path="*" element={<Navigate to="/image-from-seed" replace />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
