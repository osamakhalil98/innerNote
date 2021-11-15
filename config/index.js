const dev = process.env.DEV_URL;

const prod = process.env.PROD_URL;

export const server = dev ? dev : prod;
