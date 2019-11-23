import React from 'react';
import {get, map} from 'lodash';
import {Navbar, Nav, Form, FormControl, Button, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTh, faThLarge} from '@fortawesome/free-solid-svg-icons';
import {object, arrayOf, string, shape, func} from 'prop-types';
import './app.scss';
import {TILE_SIZES} from '../constants/tile-sizes';

import ImageCardContainer from './image-card/image-card.container';
import ImageDetailsContainer from './image-details/image-details.container';

const App = ({data, search, selectedImage, tileSize, actions}) => {
    const {updateSearch, updateTileSize} = actions;

    const handleSearchChange = evt => {
        const value = get(evt, 'target.value', '');
        updateSearch(value);
    };

    return (
        <div className="app">
            {!selectedImage && (
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand href="#home">{'Image Viewer'}</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">{'Home'}</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl
                            value={search}
                            onChange={handleSearchChange}
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <ButtonGroup>
                            <Button
                                onClick={() => updateTileSize(TILE_SIZES.SMALL)}
                                className="go-back-button"
                                variant={tileSize === TILE_SIZES.SMALL ? 'primary' : 'secondary'}
                            >
                                <FontAwesomeIcon icon={faTh} />
                            </Button>
                            <Button
                                onClick={() => updateTileSize(TILE_SIZES.LARGE)}
                                className="go-back-button"
                                variant={tileSize === TILE_SIZES.LARGE ? 'primary' : 'secondary'}
                            >
                                <FontAwesomeIcon icon={faThLarge} />
                            </Button>
                        </ButtonGroup>
                    </Form>
                </Navbar>
            )}
            <main>
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
        updateSearch: func.isRequired,
        updateTileSize: func.isRequired
    }).isRequired,
    data: arrayOf(object).isRequired,
    search: string.isRequired,
    selectedImage: string,
    tileSize: object.isRequired
};
App.defaultProps = {
    selectedImage: null
};
export default App;
