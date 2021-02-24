const prod = {
    recaptcha_site_key: '6LeAd1QaAAAAAEkFTsbdFCGMbm0SjNgqMe6LIn6R',
    age_threshold = 75,
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
    ]
};

const nonprod = {
    recaptcha_site_key: '6LeAd1QaAAAAAEkFTsbdFCGMbm0SjNgqMe6LIn6R',
    age_threshold = 75,
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
    ]
};
 
const dev = {
    recaptcha_site_key: '6LeAd1QaAAAAAEkFTsbdFCGMbm0SjNgqMe6LIn6R',
    age_threshold = 75,
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
    ]
};

const configMap = {
    'dev': dev,
    'prod': prod,
    'nonprod': nonprod,
};
  
const config = configMap[process.env.REACT_APP_STAGE];
  
export default {
    endpoints: config.endpoints,
    recaptcha_site_key: config.recaptcha_site_key,
    age_threshold: config.age_threshold
};