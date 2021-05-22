import StorageManager from "./storageManager";

const storageManager = StorageManager.getInstance();

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

const POST = (url, body, callbackFn) => {
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        // .then((text) => {
        //     if (Platform.OS === 'android') {
        //       text = text.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars. 
        //     }
        //     return text;
        //   })
        //   .then(response => JSON.parse(response)) // Parse the text.)
          .then((responseJson) => {
            if(callbackFn && isFunction(callbackFn)){
                callbackFn(responseJson);
           }
         });

        
}

const POSTWithJWT = (url, body, callbackFn) => {
    const jwt = storageManager.get('jwt');
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'JWT': jwt
        },
        body: JSON.stringify(body),
    })
        .then((response) => (response.json()))
        // .then((text) => {
        //     if (Platform.OS === 'android') {
        //       text = text.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars. 
        //     }
        //     return text;
        //   })
        // .then(response => JSON.parse(response)) // Parse the text.
        .then((responseJson) => {
            // console.log(responseJson)
            if(callbackFn && isFunction(callbackFn)){
                callbackFn(responseJson);
            }
        });
}



export default {
    POST,
    POSTWithJWT
};