export const commonRequestConfig = { 
    failOnStatusCode: false 
  };
  
  export const requestConfig = {
    wars: (headersProps = {}) => ({
      ...commonRequestConfig,
      headers: {
        'Content-Type': 'application/json',
        ...(headersProps.agentId && { 'User-Agent': `User agent: ${headersProps.agentId}` }),
      },
    }),
    baseURL: 'https://www.swapi.tech/api',
  };  