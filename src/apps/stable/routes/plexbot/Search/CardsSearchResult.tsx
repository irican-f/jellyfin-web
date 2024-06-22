import React from 'react';

import {
    Button,
    CardActions,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Typography
} from '@mui/material';

import { PaginatedResponseOfIProviderSearchItemResult, IProvider, ICrawlLink } from '@plex-bot/api';

import { UseMutateFunction } from '@tanstack/react-query';
import { FetchCrawlLinksParams } from 'hooks/Plexbot/useCrawlLinks';
import { parseTitle } from '../utils';

interface CardsSearchResultProps {
    searchResult: PaginatedResponseOfIProviderSearchItemResult;
    selectedProvider: IProvider;
    mutate: UseMutateFunction<ICrawlLink, Error, FetchCrawlLinksParams, unknown>;
}

const CardsSearchResult : React.FC<CardsSearchResultProps> = ({ searchResult, selectedProvider, mutate }) => {
    const formattedItems = searchResult.items?.map((result) => result?.title ? { ...result, title: parseTitle(result.title, selectedProvider) } : { ...result, title: [] });

    return (
        <div>
            <h2>Search Results</h2>
            <Grid container spacing={2}>
                {formattedItems?.map((result) => (
                    <Grid key={result.url} item xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardMedia
                                component='img'
                                alt='img thumbnail'
                                height={200}
                                image={`${selectedProvider.url}${result.thumbnailUrl}`}
                            />
                            <CardContent>
                                <Typography sx={{ textOverflow: 'ellipsis', height: 70 }} gutterBottom variant='h5' component='div'>
                                    {result?.title[0]}
                                </Typography>

                                {result.title?.slice(1).map((title) => (
                                    <Chip
                                        sx={{ margin: 0.5 }}
                                        key={title}
                                        color='primary'
                                        variant='outlined'
                                        label={title}
                                    />
                                ))}

                                <CardActions>
                                    <Button
                                        // eslint-disable-next-line react/jsx-no-bind
                                        onClick={() => result.url && mutate({ url: `${selectedProvider.url}${result.url}` })}
                                        variant='outlined'
                                    >
                                    Download
                                    </Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CardsSearchResult;
