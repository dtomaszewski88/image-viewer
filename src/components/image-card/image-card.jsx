import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {func, shape, string} from 'prop-types';
import {noop} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExpandArrowsAlt, faTrash, faImage, faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import DeletePrompt from '../delete-prompt/delete-prompt';
import './image-card.scss';
import {removeImage} from '../../redux/actions/app.actions';

const imageItemStyle = {
    width: 300,
    height: 300
};

const ImageCard = ({imageItem, actions}) => {
    const {selectImage, removeImage} = actions;
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleDeleteConfirm = () => removeImage(imageItem.id);
    return (
        <div className="image-card" key={imageItem.id} style={imageItemStyle} onClick={() => setDeletePrompt(false)}>
            <div className="image-card-toolbar">
                <Button onClick={() => selectImage(imageItem.id)} className="open-details-button" variant="info">
                    <FontAwesomeIcon icon={faExpandArrowsAlt} />
                </Button>
                <Button
                    onClick={evt => {
                        evt.stopPropagation();
                        setDeletePrompt(true);
                    }}
                    className="remove-item"
                    variant="danger"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </div>
            <div className="image-card-content">
                {deletePrompt && <DeletePrompt onConfirm={handleDeleteConfirm} />}
                {!imageLoaded && (
                    <div className="image-placeholder">
                        <FontAwesomeIcon className="image-placeholder-icon" icon={faImage} size={'7x'} />
                    </div>
                )}
                <img
                    src={imageItem.thumbnail_url}
                    alt={imageItem.title}
                    className="image-img"
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <div className="image-card-desc">
                <div className="image-title">
                    <span className="desc-caption">{'Title: '}</span>
                    <span className="desc-text">{imageItem.title}</span>
                </div>
                <div className="image-author">
                    <span className="desc-caption">{'Author: '}</span>
                    <span className="desc-text">{imageItem.author}</span>
                </div>
            </div>
        </div>
    );
};
ImageCard.propTypes = {
    actions: shape({
        selectImage: func.isRequired,
        removeImage: func.isRequired
    }).isRequired,
    imageItem: shape({
        id: string.isRequired,
        thumbnail_url: string.isRequired,
        title: string.isRequired
    }).isRequired
};
export default ImageCard;
