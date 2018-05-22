import React from 'react';
import FilterGroup from '../filtersGroup/FiltersGroup';
import Filter from '../filtersGroup/Filter';
import { translate } from '../../../i18n';

const filterName = 'attributes';

const CategoryFilters = props => (
  <FilterGroup title={translate('our_categories')}>
    <Filter
      name="TOUS"
      setFilter={() => props.setFilter([filterName, ''])}
      selected={props.filtersEnabled[filterName].length === 0}
    />
    {props.filtersValues[filterName].map(attribute => (
      <Filter
        key={attribute.id}
        name={attribute.value}
        setFilter={() => props.setFilter([filterName, attribute.id])}
        selected={props.filtersEnabled[filterName].includes(attribute.id)}
      />
    ))}
  </FilterGroup>
);

CategoryFilters.propTypes = {};

export default CategoryFilters;
