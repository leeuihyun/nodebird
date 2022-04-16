//component 가 많아지고 복잡해지면 이렇게 폴더 안에 만듬.
//why ?
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import {
    Overlay,
    Header,
    CloseBtn,
    SlickWrapper,
    ImgWrapper,
    Indicator,
    Global,
} from "./styles";

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const exit = useCallback((e) => {
        if (e.keyCode === 27) {
            onClose();
        }
    }, []);
    return (
        <Overlay onKeyDown={exit}>
            <Global />
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn onClick={onClose} />
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0}
                        beforeChange={(slide, newSlide) =>
                            setCurrentSlide(newSlide)
                        }
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <ImgWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
                            </ImgWrapper>
                        ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1} /{images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    );
};

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
