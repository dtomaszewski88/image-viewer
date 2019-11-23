import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addData, removeData} from 'redux/actions/app.actions';
import {getSortedData, getSelectedImage} from 'redux/selectors';

import App from './app';

const mapStateToProps = state => ({
    selectedImage: getSelectedImage(state),
    data: getSortedData(state)
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
