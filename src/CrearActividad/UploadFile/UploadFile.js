import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { Backup } from '@material-ui/icons';

import './UploadFile.css'

export default function UploadFile({ file, setFile }) {

    //consts
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxFileSize /* in mega bytes */ = 100;
    const browseFileInput = useRef();

    // state
    const [isOver, setIsOver] = useState(false);

    // handle drag event
    const handleDrag = (nowIsOver) => {
        return (event) => {
            event.stopPropagation();
            event.preventDefault();
            setIsOver(nowIsOver)
        }
    }
    // handle drop event
    const dropFile = (event) => {
        event.preventDefault();
        setIsOver(false);
        updateFile(event.dataTransfer.files[0]);
    }
    // handle browse events
    const browseFile = () => {
        let file = browseFileInput.current.files[0];
        updateFile(file);
    }
    // set file (checking available types)
    const updateFile = (file) => {
        // mime type different than allowed
        if (!allowedMimeTypes.includes(file.type)) {
            alert('No se permite este tipo de archivo')
            return null;
        }
        // size grater than 100MB
        if (file.size > maxFileSize * 1e6) {
            alert(`Tamaño máximo ${maxFileSize} MB`)
            return null;
        }
        setFile(file);
    }
    const browse = () => {
        browseFileInput.current.click();
    }

    return (
        <div
            className={`upload-area ${isOver ? 'is-over' : ''}`}
            onDragOver={handleDrag(true)}
            onDragLeave={handleDrag(false)}
            onDrop={dropFile}
        >
            <Backup />
            <span>
                {
                    file ? file.name : isOver ? "Suelta aquí" : "Arrastra un archivo o"
                }
            </span>
            <Button
                variant="contained"
                onClick={browse}
            >
                Buscar archivo
            </Button>
            {/* hidden input file */}
            <input
                type="file"
                hidden
                ref={browseFileInput}
                onChange={browseFile}
            />
        </div>
    )
}