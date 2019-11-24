import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {func, number, shape, string} from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExpandArrowsAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import DeletePrompt from '../delete-prompt/delete-prompt';
import LazyLoadImg from '../lazy-load-img/lazy-load-img';
import classNames from 'classnames';

import './image-card.scss';

const ImageCard = ({imageItem, actions, tileSize}) => {
    const {selectImage, removeImage} = actions;
    const [deletePrompt, setDeletePrompt] = useState(false);

    const handleDeleteConfirm = () => removeImage(imageItem.id);
    const handleSelect = () => selectImage(imageItem.id);

    const classes = classNames('image-card', {'with-delete-prompt': deletePrompt});
    return (
        <div
            className={classes}
            key={imageItem.id}
            style={tileSize}
            onClick={() => setDeletePrompt(false)}
            onDoubleClick={handleSelect}
        >
            <div className="image-card-toolbar">
                <Button onClick={handleSelect} className="open-details-button" variant="info">
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
                <LazyLoadImg
                    src={imageItem.thumbnail_url}
                    imageProps={{
                        alt: imageItem.title,
                        className: 'image-img'
                    }}
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
    }).isRequired,
    tileSize: shape({
        width: number.isRequired,
        height: number.isRequired
    }).isRequired
};

export default ImageCard;
