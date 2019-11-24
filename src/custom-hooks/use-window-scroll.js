import {useLayoutEffect, useRef} from 'react';
import {throttle} from 'lodash';

export const useWindowScroll = (callback, throttleTime = 2000) => {
    const scrollValue = useRef({scrollX: 0, scrollY: 0});
    const windowScrollListener = () => {
        const {scrollX, scrollY} = window;
        scrollValue.current = {scrollX, scrollY};
        callback(scrollValue.current);
    };
    const throttledScrollListener = throttle(windowScrollListener, throttleTime);
    useLayoutEffect(() => {
        window.addEventListener('scroll', throttledScrollListener);
        return () => {
            window.removeEventListener('scroll', throttledScrollListener);
        };
    });
};
