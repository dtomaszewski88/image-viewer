import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectImage, removeImage} from 'redux/actions/app.actions';

import ImageCard from './image-card';
import {getTileSize} from 'redux/selectors';

const mapStateToProps = state => ({
    tileSize: getTileSize(state)
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            selectImage,
            removeImage
        },
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageCard);
