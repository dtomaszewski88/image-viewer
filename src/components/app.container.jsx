import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addData, removeData} from 'redux/actions/app.actions';
import {getAppData, getAppDataCount} from 'redux/selectors';

import App from './app';

const mapStateToProps = state => ({
    data: getAppData(state),
    dataCount: getAppDataCount(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            addData,
            removeData
        },
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
