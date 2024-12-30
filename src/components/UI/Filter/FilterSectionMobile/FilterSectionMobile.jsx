import styles from './FilterSectionMobile.module.scss';

const FilterSectionMobile = ({ label, onReset, hasValue, children }) => (
  <div className={styles.filterSectionMobile}>
    <div className={styles.labelWrap}>
      <label className={styles.filterLabel}>{label}</label>
      {hasValue && (
        <button className={styles.reset} onClick={onReset}>
          Сбросить
        </button>
      )}
    </div>
    {children}
  </div>
  // <div className={styles.filterSection}>
  //   <div className={styles.filterReset}>
  //     <span className={styles.filterLabel}>{label}</span>
  //     {hasValue && (
  //       <button className={styles.reset} onClick={onReset}>
  //         Сбросить
  //       </button>
  //     )}
  //   </div>
  //   {children}
  // </div>
);

export default FilterSectionMobile;
