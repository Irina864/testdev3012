'use client';
import { errorFileFormat } from '@/error';
import styles from './FormAvatar.module.scss';
import { useState } from 'react';

const FormAvatar = ({
  accept,
  nameFile,
  onImageChange,
  employerAvatar,
  storeImage,
}) => {
  const [imageUrl, setImageUrl] = useState(storeImage || null);
  const [imageError, setImageError] = useState(false);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
      const result = event.target.result;
      document.getElementById('uploadedImage').setAttribute('src', result);
      setImageUrl(result);
      onImageChange(file);
    };

    reader.readAsDataURL(file);
  };
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp'];
  const handleDeleteImage = () => {
    setImageUrl(null);
    document
      .getElementById('uploadedImage')
      .setAttribute('src', '/images/form/add_a_photo.svg');
    document.getElementById('uploadedImage').style.opacity = '1';
    onImageChange(null);
  };

  return (
    <>
      {employerAvatar ? (
        <div className={styles.box}>
          <div className={styles.wrap_img}>
            <div
              className={
                imageUrl
                  ? `${styles.boxImage} ${styles.upload} ${styles.circle}`
                  : `${styles.boxImage} ${styles.circle}`
              }
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input
                className={styles.inputFile}
                type="file"
                id="fileInput"
                name={nameFile}
                accept={accept}
                maxsize={6 * 1024 * 1024}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file.size > 6 * 1024 * 1024) {
                    // alert('Файл должен быть не более 6МБ');
                    setImageError(true);
                    return;
                  } else if (!validTypes.includes(file.type)) {
                    alert(errorFileFormat);
                    return;
                  } else {
                    setImageError(false);
                    handleImageUpload(e);
                  }
                }}
              />
              {imageUrl ? (
                <img
                  id="uploadedImage"
                  className={styles.image}
                  alt="Uploaded"
                  src={imageUrl}
                />
              ) : (
                <img
                  id="uploadedImage"
                  className={styles.imageHidden}
                  alt="Uploaded"
                  src={imageUrl}
                />
              )}
            </div>
            {imageUrl && (
              <div
                className={`${styles.boxImageReact} ${styles.circle}`}
                onClick={() => document.getElementById('fileInput').click()}
              ></div>
            )}
            {imageError && (
              <div
                className={`${styles.boxImageReact} ${styles.errorImage} ${styles.circle}`}
                onClick={() => document.getElementById('fileInput').click()}
              >
                Фото больше 6 МБ
              </div>
            )}
          </div>
          {!imageUrl && !imageError && (
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('fileInput').click();
              }}
              className={styles.deleteButton}
            >
              Добавить лого
            </button>
          )}
          {imageUrl ? (
            <button onClick={handleDeleteImage} className={styles.deleteButton}>
              Удалить лого
            </button>
          ) : (
            imageError && (
              <button
                onClick={() => document.getElementById('fileInput').click()}
                className={styles.deleteButton}
              >
                Заменить
              </button>
            )
          )}
        </div>
      ) : (
        <div className={styles.box}>
          <div className={styles.wrap_img}>
            <div
              className={
                imageUrl
                  ? `${styles.boxImage} ${styles.upload}`
                  : `${styles.boxImage}`
              }
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input
                className={styles.inputFile}
                type="file"
                id="fileInput"
                name={nameFile}
                accept={accept}
                maxsize={6 * 1024 * 1024}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file.size > 6 * 1024 * 1024) {
                    // alert('Файл должен быть не более 6МБ');
                    setImageError(true);
                    return;
                  } else {
                    setImageError(false);
                    handleImageUpload(e);
                  }
                }}
              />
              {imageUrl ? (
                <img
                  id="uploadedImage"
                  className={styles.image}
                  alt="Uploaded"
                  src={imageUrl}
                />
              ) : (
                <img
                  id="uploadedImage"
                  className={styles.imageHidden}
                  alt="Uploaded"
                  src={imageUrl}
                />
              )}
            </div>
            {imageUrl && (
              <div
                className={`${styles.boxImageReact}`}
                onClick={() => document.getElementById('fileInput').click()}
              ></div>
            )}
            {imageError && (
              <div
                className={`${styles.boxImageReact} ${styles.errorImage}`}
                onClick={() => document.getElementById('fileInput').click()}
              >
                Фото больше 6 МБ
              </div>
            )}
          </div>
          {imageUrl ? (
            <button onClick={handleDeleteImage} className={styles.deleteButton}>
              Удалить фото
            </button>
          ) : (
            imageError && (
              <button
                onClick={() => document.getElementById('fileInput').click()}
                className={styles.deleteButton}
              >
                Заменить
              </button>
            )
          )}
        </div>
      )}
    </>
  );
};

export default FormAvatar;
