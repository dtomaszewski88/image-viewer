import React, {useState} from 'react';
import {func, shape, string} from 'prop-types';
import {Form, InputGroup, FormControl, Button, Col} from 'react-bootstrap';
import {get, noop} from 'lodash';
import './image-details.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faArrowLeft, faShareSquare, faTimesCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import DeletePrompt from '../delete-prompt/delete-prompt';
const ImageDetails = ({actions, imageItem}) => {
    const {selectImage, updateImage, removeImage} = actions;
    const [deletePrompt, setDeletePrompt] = useState(false);

    const handleImageUpdate = field => evt => {
        const value = get(evt, 'target.value', '');
        updateImage(imageItem.id, field, value);
    };

    const handleDeleteConfirm = () => removeImage(imageItem.id);

    return (
        <div className="image-details" onClick={() => setDeletePrompt(false)}>
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
            <img
                className={'detailed-image'}
                src={imageItem.download_url}
                alt={imageItem.title}
                style={{width: '100%'}}
            />
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
