import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectImage, updateImage, removeImage} from 'redux/actions/app.actions';

import ImageCard from './image-details';

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            selectImage,
            updateImage,
            removeImage
        },
        dispatch
    )
});

export default connect(
    null,
    mapDispatchToProps
)(ImageCard);
