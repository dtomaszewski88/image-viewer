import React, {useState} from 'react';
import {object, node, string} from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';

import './lazy-load-img.scss';
import classNames from 'classnames';
import {useImgUrlCache} from '../../custom-hooks/use-img-url-cache';

const LazyLoadImg = ({className, src, imageProps, fallbackComponent}) => {
    const [currentImageLoaded, setImageLoaded] = useState(false);
    const [isUrlStored, storeUrl] = useImgUrlCache();
    const updateImageLoadedUrl = url => {
        storeUrl(url);
        setImageLoaded(true);
    };
    const isImageLoaded = currentImageLoaded || isUrlStored(src);
    const classes = classNames('lazy-load-img', className, {
        'has-placeholder': !isImageLoaded,
        'has-image': isImageLoaded
    });
    return (
        <div className={classes}>
            <div className="placeholder">{fallbackComponent}</div>
            <div className="image-wrapper">
                <img src={src} {...imageProps} onLoad={() => updateImageLoadedUrl(src)} />
            </div>
        </div>
    );
};
LazyLoadImg.propTypes = {
    className: string,
    fallbackComponent: node,
    imageProps: object,
    src: string.isRequired
};

LazyLoadImg.defaultProps = {
    className: '',
    fallbackComponent: (
        <div className="image-placeholder">
            <FontAwesomeIcon className="image-placeholder-icon" icon={faImage} size={'7x'} />
        </div>
    ),
    imageProps: {}
};
export default LazyLoadImg;
