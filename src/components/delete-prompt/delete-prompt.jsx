import React from 'react';
import {Button} from 'react-bootstrap';
import {func} from 'prop-types';
import {noop} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

import './delete-prompt.scss';

const ImageCard = ({onConfirm}) => {
    return (
        <div className="delete-prompt">
            <div className="prompt-text">{'Delete image?'}</div>
            <div className="prompt-buttons">
                <Button onClick={noop} className="delete-cancel" variant="secondary">
                    <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
                <Button onClick={() => onConfirm()} className="delete-confirm" variant="primary">
                    <FontAwesomeIcon icon={faCheckCircle} />
                </Button>
            </div>
        </div>
    );
};
ImageCard.propTypes = {
    onConfirm: func.isRequired
};
export default ImageCard;
