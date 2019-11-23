import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        data: Symbol('Data'),
        dataCount: Symbol('DataCount'),
        actions: {
            updateTileSize: jest.fn(),
            updateSearch: jest.fn()
        }
    };
    ReactDOM.render(<App {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
