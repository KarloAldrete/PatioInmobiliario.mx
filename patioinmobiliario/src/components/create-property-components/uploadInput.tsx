'use client';
import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

export default function Uploader({ onChange }) {
    const [fileList, setFileList] = useState<File[]>([]);

  const props = {
    name: 'file',
    multiple: true,
    // action: '/api/upload',
    beforeUpload(file: File) {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg';
      const maxFileSize = 4 * 1024 * 1024;

      if (file.size > maxFileSize) {
        message.error('El tamaño del archivo excede el límite permitido (4MB).');
        return false;
      }

      if (!isJpgOrPng) {
        message.error('Solo se admiten archivos JPG/PNG.');
        return false;
      }

      message.success('Archivo válido.');
      setFileList((prevList: File[]) => [...prevList, file]);
      return false;
    },
    onRemove(file) {
      setFileList((prevList) => prevList.filter((f) => f !== file));
    },
    onDrop(e) {
      console.log('Archivos soltados', e.dataTransfer.files);
    },

    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        onChange(info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} archivo subido correctamente.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} archivo falló al subirse.`);
      }
    }
  };

  return (
    <div className="module-container">
      <div className="module-title">
        <h2>Sube tus fotos</h2>
      </div>

      <Dragger {...props} className="uploader" accept="image/png, image/jpeg">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haz clic o arrastra el archivo a esta área para subirlo</p>
        <p className="ant-upload-hint">
          Soporta un solo archivo o una selección múltiple.
          <br />
          El tamaño máximo por archivo es de 4MB.
        </p>
      </Dragger>

    </div>
  );
};
