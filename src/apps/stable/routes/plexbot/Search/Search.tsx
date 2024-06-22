// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-no-bind */

import React, { FunctionComponent, useEffect, useState } from 'react';

import {
    Select,
    Button,
    Box,
    MenuItem,
    InputLabel,
    FormControl,
    SelectChangeEvent,
    TextField
} from '@mui/material';

import { IProvider, ISearchFilter, MediaCategory, PaginatedResponseOfIProviderSearchItemResult } from '@plex-bot/api';

import { useGetSearch } from 'hooks/Plexbot/useGetSearch';
import { useGetSearchFilters } from 'hooks/Plexbot/useGetSearchFilter';
import { useCrawlLinks } from 'hooks/Plexbot/useCrawlLinks';
import { useGetProviders } from 'hooks/Plexbot/useGetProviders';

import FilterBuilder from './FilterBuilder';
import ModalAddConfirm from './ModalAddConfirm';
import CardsSearchResult from './CardsSearchResult';
import toast from 'components/toast/toast';

import { categories } from '../utils';

const Search: FunctionComponent = () => {
    const [selectedProvider, setSelectedProvider] = useState<IProvider | undefined>();
    const [currentCategory, setCurrentCategory] = React.useState('');
    const [filters, setFilters] = useState<ISearchFilter[]>([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const { mutate: mutateSearch, isLoading: isSearchLoading, data: searchResult } = useGetSearch();
    const { mutate: mutateFilters, data: filterResult } = useGetSearchFilters();
    const { mutate, isError: isCrawlLinkError, data: crawledLink, status: crawledLinkStatus } = useCrawlLinks();
    const { data: plexProviders, isLoading } = useGetProviders();

    const [localSearchResult, setLocalSearchResult] = useState<PaginatedResponseOfIProviderSearchItemResult | undefined>(searchResult);

    useEffect(() => {
        setLocalSearchResult(undefined);
    }, [selectedProvider]);

    useEffect(() => {
        setLocalSearchResult(searchResult);
    }, [searchResult]);

    useEffect(() => {
        if (isCrawlLinkError) {
            toast('The content already exist on the server please contact support');
        }
    }, [isCrawlLinkError]);

    useEffect(() =>{
        if (selectedProvider?.id && currentCategory) {
            mutateFilters({
                providerId: selectedProvider.id,
                mediaCategory: categories.findIndex((category) => category === currentCategory) as MediaCategory
            });
        }
    }, [selectedProvider, currentCategory, mutateFilters]);

    useEffect(() => {
        if (crawledLinkStatus === 'success') {
            setOpenModal(true);
        }
    }, [crawledLinkStatus]);

    const handleProviderChange = (event: SelectChangeEvent) => {
        setSelectedProvider(plexProviders?.find(provider => provider.id === event.target.value));
        setFilters([]);
    };
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCurrentCategory(event.target.value as string);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value as string);
    };

    return (

        <div className='padded-left padded-right padded-bottom-page'>

            <h1>Search</h1>

            { isLoading && <div>Loading...</div>}

            { !isLoading && plexProviders && (
                <Box
                    component='form'
                    noValidate
                    autoComplete='off'
                >
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id='provider-select-input'>Providers</InputLabel>
                        <Select
                            labelId='provider-select-label'
                            id='provider-select'
                            value={selectedProvider?.name}
                            label='Provider'
                            onChange={handleProviderChange}
                        >
                            {plexProviders.map((provider) => (
                                <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id='category-input'>Category</InputLabel>
                        <Select
                            labelId='category-select-label'
                            id='category-select'
                            value={currentCategory}
                            label='Category'
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <TextField
                        id='outlined-search-field'
                        value={search}
                        sx={{ m: 1, minWidth: 200 }}
                        onChange={handleSearchChange}
                        label='Search'
                        variant='outlined'
                    />

                    <h2>Filter</h2>
                    {
                        filterResult && (
                            <FilterBuilder
                                setFilters={setFilters}
                                filtersResult={filterResult}
                            />
                        )
                    }
                    <Button
                        sx={{
                            width: '100%'
                        }}
                        variant='outlined'
                        onClick={() => selectedProvider?.id && mutateSearch(
                            {
                                providerId: selectedProvider?.id,
                                query: {
                                    query: search,
                                    filters,
                                    category: categories.findIndex((category) => category === currentCategory) as MediaCategory
                                }
                            }

                        )}
                    >
                            Search
                    </Button>

                </Box>
            )}

            {
                localSearchResult && !isSearchLoading && selectedProvider?.url && (
                    <CardsSearchResult searchResult={localSearchResult} selectedProvider={selectedProvider} mutate={mutate}/>
                )
            }

            <ModalAddConfirm
                title={crawledLink?.name}
                mediaId={crawledLink?.id}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />

        </div>

    );
};

export default Search;
