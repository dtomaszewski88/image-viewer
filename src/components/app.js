import React from 'react';
import {map} from 'lodash';
import {Button, ButtonGroup} from 'react-bootstrap';
import {shape, object, func, arrayOf, string} from 'prop-types';
import './app.scss';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoffee, faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons';
import ImageCardContainer from './image-card/image-card.container';
import ImageDetailsContainer from './image-details/image-details.container';

const App = ({data, actions, selectedImage}) => {
    const {addData, removeData} = actions;
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
                    {!selectedImage && (
                        <div className="image-grid">
                            {map(data, imageItem => {
                                return <ImageCardContainer key={imageItem.id} imageItem={imageItem} />;
                            })}
                        </div>
                    )}
                    {selectedImage && <ImageDetailsContainer imageItem={selectedImage} />}
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
    selectedImage: string
};
App.defaultProps = {
    selectedImage: null
};
export default App;
