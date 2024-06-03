import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ISearchFilter } from '@plex-bot/api';
import React, { useState } from 'react';

interface FilterBuilderProps {
    setFilters: (filters: ISearchFilter[]) => void;
    filtersResult: ISearchFilter[];
}

const FilterBuilder: React.FC<FilterBuilderProps> = ({
    filtersResult,
    setFilters
}) => {
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: ISearchFilter }>({});

    function handleFilterValue(name: string): string {
        return selectedFilters[name]?.value || '';
    }

    function handleFilterChange(name: string | undefined, label: string | undefined, value: string): void {
        if (!name || !label) return;

        setSelectedFilters((prevFilters) => {
            const newFilters = {
                ...prevFilters,
                [name]: {
                    label,
                    name,
                    value,
                    options: []
                }
            };
            // Convert the filters object to an array and update the parent state
            setFilters(Object.values(newFilters));
            return newFilters;
        });
    }

    return (
        <>

            {
                filtersResult.map((filter) => (
                    <FormControl key={filter.name} sx={{ m: 1, mb:2, minWidth: 200 }}>
                        <InputLabel id={`filter-input-${filter.name}`}>{filter.label}</InputLabel>

                        <Select
                            labelId={`filter-select-label-${filter.name}`}
                            id={`filter-select-${filter.name}`}
                            value={filter.name ? handleFilterValue(filter.name) : ''}
                            label={filter.label}
                            onChange={
                                (event) => handleFilterChange(filter.name, filter.label, event.target.value as string)
                            }
                        >
                            {filter.options?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))
            }
        </>
    );
};

export default FilterBuilder;
