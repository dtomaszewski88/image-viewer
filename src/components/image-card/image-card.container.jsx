import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectImage, removeImage} from 'redux/actions/app.actions';

import ImageCard from './image-card';

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
    null,
    mapDispatchToProps
)(ImageCard);
