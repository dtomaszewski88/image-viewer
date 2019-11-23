export const useImgUrlCache = (() => {
    const IMG_URL_CACHE = {};
    const storeUrl = url => {
        IMG_URL_CACHE[url] = true;
    };
    const isUrlStored = url => {
        return IMG_URL_CACHE[url];
    };
    return () => [isUrlStored, storeUrl];
})();
