import React, {useState} from 'react';
import {map, times} from 'lodash';
import {Alert, Spinner} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {object, arrayOf, shape, number, string} from 'prop-types';
import ImageCardContainer from '../image-card/image-card.container';
import {useWindowScroll} from 'custom-hooks/use-window-scroll';
import {TILE_SIZES} from '../../constants/tile-sizes';
import {FETCH_STATUS} from '../../constants/fetch-status';
import LazyLoadScrollWrapper from '../lazy-load-scroll-wrapper/lazy-load-scroll-wrapper';

import './image-grid.scss';

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

const ImageGrid = ({data, tileSize, status}) => {
    const [viewPort, setViewPort] = useState({});

    useWindowScroll(scroll => {
        setViewPort(getViewPort(scroll));
    });
    const renderItems = () =>
        map(data, imageItem => {
            return (
                <LazyLoadScrollWrapper size={tileSize} key={imageItem.id} viewPort={viewPort}>
                    <ImageCardContainer imageItem={imageItem} tileSize={tileSize} />
                </LazyLoadScrollWrapper>
            );
        });
    return (
        <div className="image-grid">
            {
                {
                    [FETCH_STATUS.ERROR]: (
                        <Alert variant={'danger'}>
                            <div className="error-message-wrap">
                                <FontAwesomeIcon icon={faExclamationCircle} className={'data-error-icon'} size={'5x'} />
                                <h3 className="data-error-text">{'Error fetching data'}</h3>
                            </div>
                        </Alert>
                    ),
                    [FETCH_STATUS.LOADING]: (
                        <div className="loading-placeholder-wrap">
                            {times(10, n => {
                                return (
                                    <div className="loading-placeholder" key={n} style={tileSize}>
                                        <Spinner animation="grow" variant="secondary" />
                                    </div>
                                );
                            })}
                        </div>
                    ),
                    [FETCH_STATUS.READY]: renderItems()
                }[status]
            }
        </div>
    );
};
ImageGrid.propTypes = {
    data: arrayOf(object).isRequired,
    status: string.isRequired,
    tileSize: shape({
        width: number.isRequired,
        height: number.isRequired
    })
};

ImageGrid.defaultProps = {
    tileSize: TILE_SIZES.SMALL
};
export default ImageGrid;
