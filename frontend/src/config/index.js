const config = {
  prod: {
    API_BASE: 'https://todo-list-backend-pearl.vercel.app/api',
  },
  test: {
    API_BASE: 'http://localhost:8080/api',
  },
  dev: {
    API_BASE: 'http://localhost:8080/api',
  },
};

export default config;
