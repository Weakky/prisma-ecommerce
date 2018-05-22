import React from 'react';
import FilterGroup from '../filtersGroup/FiltersGroup';
import Filter from '../filtersGroup/Filter';
import { translate } from '../../../i18n';

const filterName = 'brands';

const BrandFilters = props => (
  <FilterGroup title={translate('our_brands')}>
    <Filter
      name="TOUS"
      setFilter={() => props.setFilter([filterName, ''])}
      selected={props.filtersEnabled[filterName].length === 0}
    />
    {props.filtersValues[filterName].map(brand => (
      <Filter
        key={brand.id}
        name={brand.name}
        setFilter={() => props.setFilter([filterName, brand.id])}
        selected={props.filtersEnabled[filterName].includes(brand.id)}
      />
    ))}
  </FilterGroup>
);

BrandFilters.propTypes = {};

export default BrandFilters;
