// United States figures, each with its source and the year it describes.
// Sources checked 2026-11-28: World Bank World Development Indicators (WDI),
// U.S. Census Bureau Vintage 2024 estimates, U.S. Bureau of Labor Statistics,
// CDC / National Center for Health Statistics, UNDP Human Development Report.
export const COUNTRY = {
  name: 'United States',
  short: 'USA',
  capital: 'Washington, D.C.',
  areaKm2: '9,833,517',
  areaSource: 'World Bank WDI, 2024',
  updated: '28 November 2026',
};

export const HEADLINE = [
  { label: 'Population', value: '341.8 million', year: 2025, change: '+0.5% on 2024', source: 'World Bank WDI' },
  { label: 'GDP', value: '$30.77 trillion', year: 2025, change: '+2.2% real growth', source: 'World Bank WDI' },
  { label: 'GDP per person', value: '$90,027', year: 2025, change: 'ranked 11th of 204', source: 'World Bank WDI' },
  { label: 'Unemployment', value: '4.2%', year: 2025, change: 'of the labour force', source: 'World Bank WDI (ILO model)' },
  { label: 'Consumer inflation', value: '2.9%', year: 2024, change: 'CPI, annual average', source: 'World Bank WDI / BLS' },
  { label: 'Life expectancy', value: '78.4 years', year: 2023, change: 'men 75.8, women 81.1', source: 'CDC / NCHS' },
];

// Yearly series, 2015-2025. GDP in $ trillion (current US$), WDI.
// Population in millions (Census Bureau / WDI). Unemployment % of labour
// force (WDI, ILO modelled). Inflation % CPI annual average (WDI / BLS).
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
export const SERIES = {
  gdp: { label: 'GDP, current US$', unit: '$ trillion', values: [18.30, 18.80, 19.61, 20.66, 21.54, 21.38, 23.73, 26.05, 27.81, 29.30, 30.77], source: 'World Bank WDI' },
  population: { label: 'Population', unit: 'millions', values: [320.7, 323.1, 325.1, 327.2, 328.2, 331.5, 332.0, 333.3, 334.9, 340.1, 341.8], source: 'Census Bureau / World Bank WDI' },
  unemployment: { label: 'Unemployment rate', unit: '% of labour force', values: [5.3, 4.9, 4.4, 3.9, 3.7, 8.1, 5.3, 3.7, 3.6, 4.0, 4.2], source: 'World Bank WDI (ILO model)' },
  inflation: { label: 'Consumer price inflation', unit: '% per year', values: [0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7, 8.0, 4.1, 2.9, null], source: 'World Bank WDI / BLS CPI' },
  gdpPerCapita: { label: 'GDP per person', unit: 'current US$', values: [57069, 58197, 60337, 63152, 65615, 64470, 71469, 78168, 83062, 86170, 90027], source: 'World Bank WDI' },
};

export const PEOPLE = [
  { label: 'Median age', value: '38.9 years', year: 2024, source: 'Census Bureau' },
  { label: 'Under 15', value: '17.1% of population', year: 2025, source: 'World Bank WDI' },
  { label: 'Aged 65 and over', value: '18.4% of population', year: 2025, source: 'World Bank WDI' },
  { label: 'Fertility rate', value: '1.63 births per woman', year: 2024, source: 'World Bank WDI' },
  { label: 'Urban population', value: '80.2%', year: 2025, source: 'World Bank WDI' },
  { label: 'Access to electricity', value: '100% of population', year: 2024, source: 'World Bank WDI' },
];

export const HEALTH = [
  { label: 'Life expectancy at birth', value: '78.4 years', year: 2023, note: 'Men 75.8, women 81.1; up 0.9 year on 2022.', source: 'CDC / NCHS Data Brief 521' },
  { label: 'Life expectancy at 65', value: '19.5 years', year: 2023, note: 'Men 18.2, women 20.7.', source: 'CDC / NCHS Data Brief 521' },
  { label: 'Infant mortality', value: '5.5 per 1,000 live births', year: 2024, note: 'Unchanged in practical terms from 2022 (5.6).', source: 'World Bank WDI' },
  { label: 'Under-5 mortality', value: '6.5 per 1,000 live births', year: 2024, note: '', source: 'World Bank WDI' },
  { label: 'Health spending per person', value: '$13,470', year: 2023, note: 'Highest of any country in the WDI series.', source: 'World Bank WDI' },
  { label: 'Human Development Index', value: '0.938', year: 2023, note: 'UNDP "very high human development" band.', source: 'UNDP Human Development Report' },
];

export const EDUCATION = [
  { label: 'Government spending on education', value: '5.4% of GDP', year: 2022, note: '', source: 'World Bank WDI' },
  { label: 'Tertiary enrolment (gross)', value: '79.4%', year: 2022, note: '', source: 'World Bank WDI' },
  { label: 'Primary completion rate', value: '99.6%', year: 2024, note: '', source: 'World Bank WDI' },
  { label: 'Lower secondary completion', value: '98.7%', year: 2024, note: '', source: 'World Bank WDI' },
  { label: 'Upper secondary completion', value: '92.4%', year: 2024, note: '', source: 'World Bank WDI' },
  { label: 'Pupil-teacher ratio, primary', value: '13 pupils per teacher', year: 2023, note: 'Secondary: 15.', source: 'World Bank WDI' },
];

export const TRADE = [
  { label: 'Exports of goods and services', value: '$3,215 billion', year: 2024, note: '', source: 'World Bank WDI' },
  { label: 'Imports of goods and services', value: '$4,114 billion', year: 2024, note: '', source: 'World Bank WDI' },
  { label: 'Trade balance', value: '−$898 billion', year: 2024, note: 'Imports minus exports, from the two figures above.', source: 'Derived from World Bank WDI' },
  { label: 'Exports as share of GDP', value: '11.0%', year: 2024, note: '', source: 'World Bank WDI' },
];

// Census Bureau Vintage 2024 population estimates, 1 July 2024.
export const STATES = [
  { name: 'California', pop: 39431263, growth: '+0.6%' },
  { name: 'Texas', pop: 31290831, growth: '+1.8%' },
  { name: 'Florida', pop: 23372215, growth: '+2.0%' },
  { name: 'New York', pop: 19867248, growth: '+0.7%' },
  { name: 'Pennsylvania', pop: 13078751, growth: '+0.2%' },
  { name: 'Illinois', pop: 12710158, growth: '+0.2%' },
  { name: 'Ohio', pop: 11883737, growth: '+0.3%' },
  { name: 'Georgia', pop: 11180878, growth: '+1.0%' },
  { name: 'North Carolina', pop: 11046024, growth: '+1.5%' },
  { name: 'Michigan', pop: 10077331, growth: '+0.3%' },
];

export const SOURCES = [
  { name: 'World Bank — World Development Indicators', what: 'Population, GDP, GDP per person, unemployment, inflation, trade, health and education series. CC BY 4.0.', link: 'data.worldbank.org' },
  { name: 'U.S. Census Bureau — Vintage 2024 Population Estimates', what: 'National and state populations, 1 July 2024; state growth rates 2023–2024.', link: 'census.gov' },
  { name: 'U.S. Bureau of Labor Statistics', what: 'Consumer Price Index (CPI-U) annual averages behind the inflation series; unemployment series LNS14000000.', link: 'bls.gov' },
  { name: 'CDC / National Center for Health Statistics', what: 'Life expectancy 2023 (78.4 years) and life expectancy at 65, NCHS Data Brief No. 521, December 2024.', link: 'cdc.gov/nchs' },
  { name: 'UNDP — Human Development Report', what: 'Human Development Index 0.938 for 2023.', link: 'hdr.undp.org' },
];

export const NAV = [
  { hash: '#/', label: 'Overview' },
  { hash: '#/economy', label: 'Economy' },
  { hash: '#/people', label: 'People' },
  { hash: '#/health', label: 'Health' },
  { hash: '#/education', label: 'Education' },
  { hash: '#/work', label: 'Work & prices' },
  { hash: '#/trade', label: 'Trade' },
  { hash: '#/states', label: 'States' },
  { hash: '#/sources', label: 'Sources' },
];
