import React from 'react';
import FilterGroup from '../filtersGroup/FiltersGroup';
import Filter from '../filtersGroup/Filter';
import { translate } from '../../../i18n';

const OptionsFilters = props =>
  props.filtersValues['options'].map(option => (
    <FilterGroup
      key={option.id}
      title={`${translate('our')} ${option.name.toLowerCase()}`}
      withAll={false}
    >
      <Filter
        name="TOUS"
        setFilter={() => props.setFilter([option.name, null])}
        selected={props.filtersEnabled[option.name].length === 0}
      />
      {option.values.map(optionValue => (
        <Filter
          key={`${option.id}-${optionValue.id}`}
          name={optionValue.name}
          setFilter={() => props.setFilter([option.name, optionValue.id])}
          selected={props.filtersEnabled[option.name].includes(optionValue.id)}
        />
      ))}
    </FilterGroup>
  ));

OptionsFilters.propTypes = {};

export default OptionsFilters;
