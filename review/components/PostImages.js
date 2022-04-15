import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./imagesZoom";

const PostImages = ({ images }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);
    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, []);
    if (images.length === 1) {
        return (
            <>
                <img
                    role="presentation" //클릭할 수는 있지만 의무는 아니다 표현.
                    src={images[0].src}
                    alt={images[0].src}
                    onClick={onZoom}
                />
                {showImagesZoom && (
                    <ImagesZoom images={images} onClose={onClose}></ImagesZoom>
                )}
            </>
        );
    }
    if (images.length === 2) {
        return (
            <div>
                <img
                    role="presentation" //클릭할 수는 있지만 의무는 아니다 표현.
                    src={images[0].src}
                    alt={images[0].src}
                    width="50%"
                    onClick={onZoom}
                />
                <img
                    role="presentation" //클릭할 수는 있지만 의무는 아니다 표현.
                    src={images[1].src}
                    alt={images[1].src}
                    width="50%"
                    onClick={onZoom}
                />
                <ImagesZoom images={images} onClose={onClose}></ImagesZoom>
            </div>
        );
    }
    return (
        <>
            <div>
                <img
                    src={images[0].src}
                    alt={images[0].src}
                    role="presentation"
                    width="50%"
                    onClick={onZoom}
                />
                <div
                    role="presentation"
                    onClick={onZoom}
                    style={{
                        display: "inline-block",
                        width: "50%",
                        textAlign: "center",
                        verticalAlign: "middle",
                    }}
                >
                    <PlusOutlined />
                    <br />
                    {images.length - 1}개의 사진 더보기
                </div>
            </div>
            <ImagesZoom images={images} onClose={onClose}></ImagesZoom>
        </>
    );
};
PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
};
export default PostImages;
