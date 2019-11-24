import {connect} from 'react-redux';

import ImageGrid from './image-grid';
import {getTileSize, getImagesStatus, getImgDataWithThumbnailUrl} from 'redux/selectors';

const mapStateToProps = state => ({
    data: getImgDataWithThumbnailUrl(state),
    status: getImagesStatus(state),
    tileSize: getTileSize(state)
});

export default connect(mapStateToProps)(ImageGrid);
