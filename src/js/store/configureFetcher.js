import createFetcher from '../middlewares/Fetcher';

export default () => createFetcher({
  uri: process.env.BACKEND,
  isFetcherAction: type => /FETCH_REQUEST$/.test(type),
  port: process.env.BACKEND_PORT,
});
