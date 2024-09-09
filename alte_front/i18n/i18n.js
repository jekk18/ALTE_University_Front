import NextI18Next from 'next-i18next';

const NextI18NextInstance = new NextI18Next({
    otherLanguages: ['en'], // Add other supported languages here
    defaultLanguage: 'ka',
});

export default NextI18NextInstance;