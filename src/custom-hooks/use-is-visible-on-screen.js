import {useLayoutEffect, useRef, useState} from 'react';
import {useWindowScroll} from './use-window-scroll';
import {debounce, throttle} from 'lodash';

const getViewPort = ({scrollX, scrollY}) => {
    const {availHeight, availWidth} = window.screen;
    return {
        top: scrollY,
        left: scrollX,
        availWidth,
        availHeight,
        right: scrollX + availWidth,
        bottom: scrollY + availHeight
    };
};

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

export const useIsVisibleOnScreen = (key, options = {}, initialRef = null) => {
    const elementRef = useRef(initialRef);
    const {debounceTime = 500, vOffset = 200, hOffset = 200} = options;
    const [isVisibleOnScreen, setIsVisibleOnScreen] = useState(false);
    const [currentScroll] = useWindowScroll(key);
    const setVisibleDebounced = debounce(setIsVisibleOnScreen, debounceTime);
    const isInViewThrottled = throttle(isInView, 200);
    useLayoutEffect(
        () => {
            const viewPort = getViewPort(currentScroll);
            const elementBox = getElementBox(elementRef);
            setVisibleDebounced(isInViewThrottled(elementBox, viewPort, vOffset, hOffset));
        },
        [elementRef.current, currentScroll]
    );

    return [elementRef, isVisibleOnScreen];
};
