const getApiUrl = (env: string) => {
    switch(env){
        case 'dev':
            return 'https://us-central1-fohn-demo.cloudfunctions.net/v2'
        case 'prod':
            return 'https://us-central1-fohnjs.cloudfunctions.net/v2'
        case 'dev-local':
            return 'http://127.0.0.1:5001/fohn-demo/us-central1/v2'
        case 'prod-local':
            return 'http://127.0.0.1:5001/fohnjs/us-central1/v2'
    }
}

export default getApiUrl