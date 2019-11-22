import React from 'react';
import {map} from 'lodash';
import {Alert, Button, ButtonGroup} from 'react-bootstrap';
import {shape, object, func, arrayOf, number} from 'prop-types';
import './app.scss';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoffee, faImage, faExpandArrowsAlt, faTrash} from '@fortawesome/free-solid-svg-icons';

const App = ({data, dataCount, actions}) => {
    const {addData, removeData} = actions;
    const imageItemStyle = {
        width: 300,
        height: 300
    };
    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">{'Image Viewer'}</h1>
                <FontAwesomeIcon icon={faCoffee} />
                <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </header>
            <main>
                <section className="app-toolbar">
                    <ButtonGroup>
                        <Button onClick={() => addData()}>{'Add'}</Button>
                        <Button onClick={() => removeData()}>{'Remove'}</Button>
                    </ButtonGroup>
                </section>
                <section className="app-content">
                    <div className="image-grid">
                        {map(data, imageItem => {
                            return (
                                <div className="image-item" key={imageItem.id} style={imageItemStyle}>
                                    <div className="image-item-toolbar">
                                        <Button onClick={() => {}} className="open-details-button" variant="info">
                                            <FontAwesomeIcon icon={faExpandArrowsAlt} />
                                        </Button>
                                        <Button onClick={() => {}} className="remove-item" variant="danger">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                    <div className="image-item-content">
                                        {/*<FontAwesomeIcon className="image-placeholder" icon={faImage} size={'7x'} />*/}
                                        <img
                                            src={imageItem.thumbnail_url}
                                            alt={imageItem.title}
                                            className="image-img"
                                        />
                                    </div>
                                    <div className="image-item-desc">
                                        <div className="image-title">
                                            <span className="desc-caption">{'Title: '}</span>
                                            <span className="desc-text">{imageItem.title}</span>
                                        </div>
                                        <div className="image-author">
                                            <span className="desc-caption">{'Author: '}</span>
                                            <span className="desc-text">{imageItem.author}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
};
App.propTypes = {
    actions: shape({
        addData: func.isRequired,
        removeData: func.isRequired
    }).isRequired,
    data: arrayOf(object).isRequired,
    dataCount: number.isRequired
};
export default App;
