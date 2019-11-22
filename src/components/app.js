import React from 'react';
import {map} from 'lodash';
import {Alert, Button, ButtonGroup} from 'react-bootstrap';
import {shape, object, func, arrayOf, number} from 'prop-types';
import './app.scss';

const App = ({data, dataCount, actions}) => {
    const {addData, removeData} = actions;
    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">{'Image Viewer'}</h1>
            </header>
            <main>
                <section className="app-toolbar">
                    <ButtonGroup>
                        <Button onClick={() => addData()}>{'Add'}</Button>
                        <Button onClick={() => removeData()}>{'Remove'}</Button>
                    </ButtonGroup>
                </section>
                <section className="app-content">
                    <h4>{`Data count ${dataCount}`}</h4>
                    {map(data, item => {
                        return (
                            <Alert key={item.id} variant={'info'}>
                                {item.text}
                            </Alert>
                        );
                    })}
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
