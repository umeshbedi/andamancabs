"use server"

export async function uploading({imageObj}) {
    
        var formdata = new FormData();
        formdata.append("image", imageObj);
        formdata.append("type", "file");
        formdata.append("titile", "Simple image");
        formdata.append("description", "This is the description of Simple image");

        var requestOptions = {
            method: 'POST',
            headers: { "Authorization": "Client-ID 41770e05b6777b0" },
            body: formdata,
            redirect: 'follow'
        };

        await fetch("https://api.imgur.com/3/image", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                // if (result.success) {
                //     const data = result.data

                //     if (to == "Images") {
                //         packagedb.update({
                //             images: firebase.firestore.FieldValue.arrayUnion(data.link)
                //         }).then(() => messageApi.open({ key: 'updatable', type: 'success', content: 'Uploaded' }))
                //     }
                //     else if (to == "Photos") {
                //         db.collection("media").add({
                //             deletehash: data.deletehash,
                //             imageID: data.id,
                //             link: data.link,
                //             width: data.width,
                //             height: data.height,
                //             createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                //         }).then(() => messageApi.open({ key: 'updatable', type: 'success', content: 'Uploaded' }))
                //     }
                //     else {
                //         packagedb.update({
                //             thumbnail: data.link
                //         }).then(() => messageApi.open({ key: 'updatable', type: 'success', content: 'Uploaded' }))
                //     }


                // } else {
                //     messageApi.error(result.data.error)
                //     console.log(result)
                // }
                // // console.log(result.data)
                // setImageObj(null)
            })
            .catch(error => {
                console.log('error', error);
                // messageApi.error("Something went wrong")
                // setImageObj(null)
            }
            );
    
}