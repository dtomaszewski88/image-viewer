import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTileSize, updateSearch, updateFetchCount} from 'redux/actions/app.actions';
import {getTileSize, getSelectedImage, getSearch, getFetchCount} from 'redux/selectors';

import App from './app';

const mapStateToProps = state => ({
    fetchCount: getFetchCount(state),
    search: getSearch(state),
    selectedImage: getSelectedImage(state),
    tileSize: getTileSize(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            updateTileSize,
            updateSearch,
            updateFetchCount
        },
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
