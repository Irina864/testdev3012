import FormCheckbox from '../../Form/FormCheckbox/FormCheckbox';
import styles from './FilterRegion.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserText,
  getCityandRegionData,
} from '@/store/cityAndRegionSlice';
import { useEffect, useState } from 'react';
import { cities } from '@/data/cities';
import useResponsiveLayout from '@/hooks/useResponsiveLayout';

const FilterRegion = ({ onSelect, currentRegion }) => {
  const [selected, setSeleted] = useState(
    currentRegion === 'Любой город' ? ['Любой город'] : []
  );
  const { isMobile } = useResponsiveLayout();
  const dispatch = useDispatch();
  const citiesAndRegions = useSelector((state) => {
    return state.citiesAndRegions.data;
  });

  const citiesFiltered = [
    ...new Set(
      cities.filter((region) =>
        region.toLowerCase().includes(currentRegion.toLowerCase())
      )
    ),
  ];
  // cities.filter((region) =>
  //   region.toLowerCase().includes(currentRegion.toLowerCase())
  // )

  const filteredRegions = citiesAndRegions
    .filter(
      (item) =>
        item.type === 'state' ||
        item.type === 'administrative' ||
        item.type === 'city' ||
        item.type === 'town' ||
        item.type === 'village'
    )
    .map((item, index) => {
      return item.name;
    });
  const uniqueFilteredRegions = [...new Set(filteredRegions)];
  // const regionsForMap = citiesFiltered;
  const regionsForMap = citiesFiltered.sort((a, b) => a.localeCompare(b));
  // uniqueFilteredRegions.length > 0 ? uniqueFilteredRegions : citiesFiltered;

  // useEffect(() => {
  //   dispatch(updateUserText(currentRegion));
  //   dispatch(getCityandRegionData(currentRegion));
  //   console.log(uniqueFilteredRegions, regionsForMap);
  // }),
  //   [currentRegion];
  return (
    <div className={styles.region}>
      <div
        className={`${styles.region__checkbox} ${
          currentRegion.length > 3 &&
          currentRegion !== 'Любой город' &&
          regionsForMap.length > 0 &&
          styles.cities
        }`}
      >
        {isMobile ? null : (
          <FormCheckbox
            array={['Любой город']}
            nameCheckbox="city"
            id="city"
            onChange={(e) => {
              e.preventDefault();
              e.target.checked ? onSelect('Любой город') : onSelect('');
              setSeleted(e.target.checked ? 'Любой город' : '');
            }}
            selectedValues={selected}
          />
        )}
      </div>
      {currentRegion.length > 3 &&
        currentRegion !== 'Любой город' &&
        regionsForMap.length > 0 && (
          <div className={styles.wrap}>
            <div className={styles.region__wrap}>
              {regionsForMap.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.option} ${
                    currentRegion === item && styles.option_active
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect(item);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default FilterRegion;
