const { REACT_APP_ENV } = process.env;

let url;

if (REACT_APP_ENV === 'production') {
    url = 'http://18.216.8.21';
} else {
    url = 'http://192.168.0.25:8000';
}

export const env = REACT_APP_ENV;
export const backendURLPath = url;
