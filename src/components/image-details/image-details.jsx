import React, {useState} from 'react';
import {func, shape, string} from 'prop-types';
import {Form, InputGroup, FormControl, Button, Col} from 'react-bootstrap';
import {get} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faArrowLeft, faShareSquare} from '@fortawesome/free-solid-svg-icons';
import DeletePrompt from '../delete-prompt/delete-prompt';
import LazyLoadImg from '../lazy-load-img/lazy-load-img';

import './image-details.scss';

const ImageDetails = ({actions, imageItem}) => {
    const {selectImage, updateImage, removeImage} = actions;
    const [deletePrompt, setDeletePrompt] = useState(false);

    const handleImageUpdate = field => evt => {
        const value = get(evt, 'target.value', '');
        updateImage(imageItem.id, field, value);
    };

    const handleDeleteConfirm = () => removeImage(imageItem.id);
    const imageFallback = (
        <img className={'img-details-placeholder'} src={imageItem.thumbnail_url} alt={'placeholder'} />
    );
    return (
        <div className="image-details" onClick={() => setDeletePrompt(false)}>
            <LazyLoadImg
                src={imageItem.download_url}
                imageProps={{alt: imageItem.title, className: 'details-image'}}
                fallbackComponent={imageFallback}
            />
            <div className="details-size-info">
                {imageItem.width}
                {'x'}
                {imageItem.height}
            </div>
            <div className="details-toolbar-top">
                <Button
                    onClick={evt => {
                        evt.stopPropagation();
                        setDeletePrompt(true);
                    }}
                    className="delete-button"
                    variant="danger"
                >
                    {'Delete Image'}
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <a href={imageItem.download_url} target={'_blank'} className="open-button btn btn-secondary">
                    {'Open in full size'}
                    <FontAwesomeIcon icon={faShareSquare} />
                </a>
                <Button onClick={() => selectImage(null)} className="go-back-button" variant="primary">
                    {'Go Back'}
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
            </div>
            <div className="details-toolbar-bottom">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail" md={3}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">{'Title'}</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Title"
                                aria-label="Title"
                                aria-describedby="basic-addon1"
                                value={imageItem.title}
                                onChange={handleImageUpdate('title')}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword" md={9}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">{'Description'}</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                as="textarea"
                                rows="3"
                                placeholder="Description"
                                aria-label="Description"
                                aria-describedby="basic-addon1"
                                value={imageItem.description}
                                onChange={handleImageUpdate('description')}
                            />
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
            </div>
            {deletePrompt && <DeletePrompt onConfirm={handleDeleteConfirm} />}
        </div>
    );
};
ImageDetails.propTypes = {
    actions: shape({
        selectImage: func.isRequired
    }).isRequired,
    imageItem: shape({
        id: string.isRequired,
        thumbnail_url: string.isRequired,
        title: string.isRequired
    }).isRequired
};
export default ImageDetails;
