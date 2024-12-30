import styles from './Tooltip.module.scss';

const Tooltip = ({
  text,
  size = 'small',
  tooltipStyle,
  textStyle,
  imgStyle,
  forRightArrowTooltip,
  biggerText,
}) => {
  const imageSrc =
    size === 'large'
      ? '/images/form/info_large.svg'
      : '/images/form/info_small.svg';

  return (
    <div
      className={`${styles.tooltip} ${tooltipStyle} ${
        forRightArrowTooltip && styles.rightTooltip
      }`}
    >
      {' '}
      {/* Добавляем кастомные стили для тултипа */}
      <img
        className={`${styles.tooltip__img} ${imgStyle}`} // Добавляем кастомные стили для изображения
        src={imageSrc}
        alt="info"
      />
      <div
        className={`${styles.tooltiptext} ${textStyle}
        ${biggerText && styles.biggerText} 
        ${forRightArrowTooltip && styles.rightTooltipText}`}
      >
        {text}
      </div>{' '}
      {/* Добавляем кастомные стили для текста */}
    </div>
  );
};

export default Tooltip;
