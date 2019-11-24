import React from 'react';
import {get} from 'lodash';
import {Navbar, Nav, Form, FormControl, Button, ButtonGroup, DropdownButton, Dropdown} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTh, faThLarge} from '@fortawesome/free-solid-svg-icons';
import {object, string, shape, func, number} from 'prop-types';
import './app.scss';
import {TILE_SIZES} from '../constants/tile-sizes';

import ImageDetailsContainer from './image-details/image-details.container';
import ImageGridContainer from './image-grid/image-grid.container';
const App = ({fetchCount, search, selectedImage, tileSize, actions}) => {
    const {updateSearch, updateTileSize, updateFetchCount} = actions;

    const handleSearchChange = evt => {
        const value = get(evt, 'target.value', '');
        updateSearch(value);
    };

    const handleCountChange = count => () => updateFetchCount(count);

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
                        <ButtonGroup className="mr-sm-2">
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
                        <DropdownButton as={ButtonGroup} title={`Count: ${fetchCount}`} id="bg-vertical-dropdown-2">
                            <Dropdown.Item eventKey="1" onClick={handleCountChange(10)}>
                                {'10'}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={handleCountChange(25)}>
                                {'25'}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={handleCountChange(50)}>
                                {'50'}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="4" onClick={handleCountChange(100)}>
                                {'100'}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="5" onClick={handleCountChange(250)}>
                                {'250'}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="6" onClick={handleCountChange(1000)}>
                                {'1000'}
                            </Dropdown.Item>
                        </DropdownButton>
                    </Form>
                </Navbar>
            )}
            <main>
                <section className="app-content">
                    {!selectedImage && <ImageGridContainer />}
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
    fetchCount: number.isRequired,
    search: string.isRequired,
    selectedImage: string,
    tileSize: object.isRequired
};
App.defaultProps = {
    selectedImage: null
};
export default App;
