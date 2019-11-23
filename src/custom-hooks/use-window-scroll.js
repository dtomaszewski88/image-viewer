import {useLayoutEffect, useState} from 'react';
import {forEach} from 'lodash';

export const useWindowScroll = (() => {
    const SCROLL_HANDLERS_MAP = {};

    const windowScrollListener = () => {
        const {scrollX, scrollY} = window;
        forEach(SCROLL_HANDLERS_MAP, setCurrentScroll => {
            setCurrentScroll({scrollX, scrollY});
        });
    };

    return (key, throttleTime = 100) => {
        const [currentScroll, setCurrentScroll] = useState({scrollX: 0, scrollY: 0});
        useLayoutEffect(() => {
            window.addEventListener('scroll', windowScrollListener);
            if (!SCROLL_HANDLERS_MAP[key]) {
                SCROLL_HANDLERS_MAP[key] = setCurrentScroll;
            }
            return () => {
                delete SCROLL_HANDLERS_MAP[key];
                window.removeEventListener('scroll', windowScrollListener);
            };
        });
        return [currentScroll];
    };
})();
