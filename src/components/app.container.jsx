import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTileSize, updateSearch} from 'redux/actions/app.actions';
import {getImgDataWithThumbnailUrl, getTileSize, getSelectedImage, getSearch} from 'redux/selectors';

import App from './app';

const mapStateToProps = state => ({
    search: getSearch(state),
    selectedImage: getSelectedImage(state),
    data: getImgDataWithThumbnailUrl(state),
    tileSize: getTileSize(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            updateTileSize,
            updateSearch
        },
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
