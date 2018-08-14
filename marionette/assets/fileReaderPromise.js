export default file => {
    const reader  = new FileReader();
    return new Promise((resolve,reject) => {
        reader.onload = event => {
            resolve(event.target.result);
        }
        reader.onerror = error => {
            reject(error)
        }
        try {
            reader.readAsDataURL(file)
        } 
        catch(error) {
            resolve('/images/noavatar.jpg')
        }
    });
}