import { IProvider } from '@plex-bot/api';

export const categories = [
    'Film',
    'Série',
    'Animé'
];

export function parseTitle(input: string, provider: IProvider): string[] {
    if (provider.name === 'wawacity') {
        const beforeBracketMatch = input.match(/^(.*?)\[/);
        const bracketMatch = input.match(/\[(.*?)\]/);
        const dashMatch = input.match(/- (.*)/);

        const contentBeforeBracket = beforeBracketMatch ? beforeBracketMatch[1].trim() : '';
        const contentWithinBrackets = bracketMatch ? bracketMatch[1].trim() : '';
        const contentAfterDash = dashMatch ? dashMatch[1].trim() : '';

        return [
            contentBeforeBracket,
            contentWithinBrackets,
            contentAfterDash
        ];
    } else {
        return input.split('|');
    }
}

