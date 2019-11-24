import React, {useLayoutEffect, useState, useRef} from 'react';
import {node, object} from 'prop-types';
import classNames from 'classnames';
import './lazy-load-scroll-wrapper.scss';

const getElementBox = nodeRef => (nodeRef.current && nodeRef.current.getBoundingClientRect()) || null;

const isInView = (elementBox, viewPort, vOffset = 0, hOffset = 0) => {
    if (!elementBox) {
        return false;
    }
    return !(
        elementBox.bottom < -vOffset ||
        elementBox.top > viewPort.availHeight + vOffset ||
        elementBox.right < -hOffset ||
        elementBox.left > viewPort.availWidth + hOffset
    );
};

const LazyLoadScrollWrapper = ({children, size, viewPort}) => {
    const elementRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const handleSwitch = isShown => {
        if (isVisible === isShown) {
            return;
        }
        setIsVisible(isShown);
    };

    useLayoutEffect(
        () => {
            const elementBox = getElementBox(elementRef);
            const isShown = isInView(elementBox, viewPort, 500, 500);
            handleSwitch(isShown);
        },
        [elementRef, isVisible, setIsVisible, viewPort, size]
    );

    const classes = classNames('lazy-load-wrapper', {hidden: !isVisible});
    return (
        <div className={classes} ref={elementRef} style={size}>
            {isVisible && children}
        </div>
    );
};
LazyLoadScrollWrapper.propTypes = {
    children: node,
    size: object.isRequired,
    viewPort: object.isRequired
};
LazyLoadScrollWrapper.defaultProps = {
    children: null
};
export default LazyLoadScrollWrapper;
