// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-no-bind */

import React, { FunctionComponent, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetPlexBotProviders } from 'hooks/Plexbot/useGetPlexProviders';
import Page from '../../../../components/Page';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { categories } from './utils';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useGetSearch } from 'hooks/Plexbot/useGetSearch';
import { IProvider, ISearchFilter, MediaCategory } from '@plex-bot/api';
import { useGetSearchFilters } from 'hooks/Plexbot/useGetSearchFilter';

import FilterBuilder from './Search/FilterBuilder';
import { useCrawlLinks } from 'hooks/Plexbot/useCrawlLinks';

const Search: FunctionComponent = () => {
    const [currentProvider, setCurrentProvider] = React.useState('');
    const [currentCategory, setCurrentCategory] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [filters, setFilters] = useState<ISearchFilter[]>([]);
    const [shouldFetchFilters, setShouldFetchFilters] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState({} as IProvider);

    const { mutate: mutateSearch, isLoading: isSearchLoading, data: searchResult } = useGetSearch();

    const { mutate, data: crawledLink } = useCrawlLinks();

    const {
        isLoading: isFilterLoading,
        data: filterResult
    } = useGetSearchFilters(
        currentProvider,
        categories.findIndex((category) => category === currentCategory) as MediaCategory,
        shouldFetchFilters
    );

    useEffect(() => {
        setShouldFetchFilters(false);
    }, [isFilterLoading, filterResult]);

    useEffect(() =>{
        if (currentProvider && currentCategory) {
            setShouldFetchFilters(true);
        }
        if (currentProvider) {
            setSelectedProvider(plexProviders?.find(provider => provider.id === currentProvider) || {} as IProvider);
        }
    }, [currentProvider, currentCategory]);

    const handleProviderChange = (event: SelectChangeEvent) => {
        setCurrentProvider(event.target.value as string);
        setFilters([]);
    };
    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCurrentCategory(event.target.value as string);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value as string);
    };

    const { data: plexProviders, isLoading } = useGetPlexBotProviders();

    return (
        <Page
            id='plexBotIndexPage'
            title='PlexBot'
            className='mainAnimatedPage libraryPage'
        >

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
                                value={currentProvider}
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
                            onClick={() => mutateSearch(
                                {
                                    providerId: currentProvider,
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
                    searchResult?.items && !isSearchLoading && selectedProvider?.url && (
                        <div>
                            <h2>Search Results</h2>
                            <Box
                                sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
                            >
                                {searchResult.items.map((result) => (
                                    <Card sx={{ maxWidth: 345 }} key={result.title}>
                                        <CardMedia
                                            component='img'
                                            alt='img thumbnail'
                                            height='140'
                                            image={`${selectedProvider.url}${result.thumbnailUrl}`}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant='h5' component='div'>
                                                {result.title}
                                            </Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                {result.description}
                                            </Typography>

                                            <Button
                                                sx={{ marginTop: 2 }}
                                                onClick={() => result.url && mutate({ url: result.url })}
                                                variant='outlined'
                                            >
                                                Download
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </div>
                    )
                }

            </div>

        </Page>
    );
};

export default Search;
