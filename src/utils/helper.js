import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';





export const getPhotoReference = (id, setImage, setLoading) => {
    let pathReference = '';
    pathReference = storage().ref('users/' + id + '/' + id + '_profile.png');

    pathReference.getDownloadURL().then(function (url) {
        // console.log('fetchUrl', url);
        setImage ? setImage(url) : null;
        setLoading ? setLoading(false) : null
    }).catch((error) => {
        console.log('photoReferenceError', JSON.stringify(error))
        setLoading ? setLoading(false) : null
    });
};

export const getMessagePhoto = (chatId,msgId, setImage, setLoading) => {
    let pathReference = '';
    pathReference = storage().ref('chats/' + chatId + '/' + msgId + 'image.png');

    pathReference.getDownloadURL().then(function (url) {
        // console.log('fetchUrl', url);
        setImage ? setImage(url) : null;
        setLoading ? setLoading(false) : null
    }).catch((error) => {
        console.log('photoReferenceError', JSON.stringify(error))
        setLoading ? setLoading(false) : null
    });
};

export const getUID = () => {
    const uid = auth().currentUser?.uid
    return uid
}

export const getUser = async (uid, setLoading) => {

    return new Promise((resolve, reject) => {
        setLoading(true)
        firestore().collection('accounts').doc(uid).get()
            .then(async documentSnapshot => {
                setLoading(false)
                if (documentSnapshot.exists) {
                    // console.log('User data: ', documentSnapshot.data());
                    let user = documentSnapshot.data()
                    resolve(user)
                } else {
                    console.log('userNotFound')
                    resolve(false)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log('getUserError', JSON.stringify(err))
                resolve(false)
            })
    })
};
export const apiKey = 'AIzaSyBvHrNY97feVsDO4gBj3kst0kVLYzF8joc'



export const getFormattedDate =  (d) => {
    const date = new Date(d)
    // return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}   ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`
    return date.toLocaleString({ timeZone: 'local' }) 
}



export const getAddress = async (zipCode, city) => {
    return new Promise(async (resolve, reject) => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            // const requestURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=AIzaSyCQnrFtSSdCvG7PFfGvotppt7Cxbd1RnuM`;
            // const requestURL = `https://maps.googleapis.com/maps/api/geocode/json?address=postal_code:${zipCode}&country:US&key=${apiKey}`;
            const requestURL = `https://maps.googleapis.com/maps/api/geocode/json?address=postal_code:${zipCode}&key=${apiKey}`;
            console.log('requestUrl', requestURL)
            fetch(requestURL, requestOptions)
                .then(response => response.json())
                .then(result => resolve(result))
                .catch(error => (console.log('error', error), reject(false)));
        } catch (error) {
            reject(false)
        }
    })
};

