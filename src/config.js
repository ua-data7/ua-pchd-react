const prod = {
    endpoints: [
        {
            name: "enumValues",
            endpoint: "https://frruryqr87.execute-api.us-west-2.amazonaws.com/dev",
            region: "us-west-2"
        },
        {
            name: "regPublish",
            endpoint: "https://frruryqr87.execute-api.us-west-2.amazonaws.com/dev",
            region: "us-west-2"
        },
        {
            name: "zipCheck",
            endpoint: "https://frruryqr87.execute-api.us-west-2.amazonaws.com/dev",
            region: "us-west-2"
        },
        {
            name: "esri",
            endpoint: "https://frruryqr87.execute-api.us-west-2.amazonaws.com/dev",
            region: "us-west-2"
        },
    ]
};

const nonprod = {
    endpoints: [
        {
            name: "enumValues",
            endpoint: "https://isgr6ntyzj.execute-api.us-west-2.amazonaws.com/nonprod",
            region: "us-west-2"
        },
        {
            name: "regPublish",
            endpoint: "https://isgr6ntyzj.execute-api.us-west-2.amazonaws.com/nonprod",
            region: "us-west-2"
        },
        {
            name: "zipCheck",
            endpoint: "https://isgr6ntyzj.execute-api.us-west-2.amazonaws.com/nonprod",
            region: "us-west-2"
        },
        {
            name: "esri",
            endpoint: "https://isgr6ntyzj.execute-api.us-west-2.amazonaws.com/nonprod",
            region: "us-west-2"
        },
    ]
};

const dev = {
    endpoints: [
        {
            name: "enumValues",
            endpoint: "https://isgr6ntyzj.execute-api.us-west-2.amazonaws.com/nonprod",
            region: "us-west-2"
        },
        {
            name: "regPublish",
            endpoint: "https://isgr6ntyzj.execute-api.us-west-2.amazonaws.com/nonprod",
            region: "us-west-2"
        },
        {
            name: "zipCheck",
            endpoint: "https://isgr6ntyzj.execute-api.us-west-2.amazonaws.com/nonprod",
            region: "us-west-2"
        },
        {
            name: "esri",
            endpoint: "https://isgr6ntyzj.execute-api.us-west-2.amazonaws.com/nonprod",
            region: "us-west-2"
        },
    ]
};

const configMap = {
    'dev': dev,
    'prod': prod,
    'nonprod': nonprod,
};

const config = configMap[process.env.REACT_APP_STAGE];

export const recaptcha_site_key = '6LeAd1QaAAAAAEkFTsbdFCGMbm0SjNgqMe6LIn6R';
export const age_threshold = 75;
export const endpoints = config.endpoints;
