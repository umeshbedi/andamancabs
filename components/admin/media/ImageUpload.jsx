import { DeleteFilled, PlusOutlined } from '@ant-design/icons'
import { Upload, Image, message } from 'antd'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import { db } from '@/firebase'

export default function ImageUpload({ to, groupId, packageId, packageFor }) {
    const [imageObj, setImageObj] = useState(null)
    const [images, setImages] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const packagedb = db.collection(`${packageFor}`).doc(`${groupId}`).collection("singlePackage").doc(`${packageId}`)


    async function deleteImage({ id, deletehash, image }) {
        messageApi.open({ key: 'updatable', type: 'loading', content: 'Loading...', duration: 0 })
        const res = await fetch('/api/deleteImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_id: deletehash }),
        });

        await res.json().then((data) => {
            if (data.error) {
                messageApi.error(data.error);
            } else {

                if (to == "Images") {
                    packagedb.update({
                        images: firebase.firestore.FieldValue.arrayRemove(image)
                    })
                        .then(() => messageApi.success('Image deleted successfully'))
                } else {
                    packagedb.update({
                        thumbnail: ""
                    })
                        .then(() => messageApi.success('Image deleted successfully'))
                }

            }
        }
        ).catch((error) => {
            console.error('Error deleting image:', error);
            msg.error('Failed to delete image');
        });
        // console.log('Delete result:', data);
        messageApi.destroy()
    }

    useEffect(() => {
        packagedb.onSnapshot((snap) => {
            if (to == "Thumbnails") {
                if (snap.data().thumbnail != "") {
                    setImages([snap.data().thumbnail])
                } else {
                    setImages([])
                }
            }
            else {
                to != 'Photos' ? setImages(snap.data().images) : setImages([]);
            }

        })
    }, [])



    useEffect(() => {
        async function uploadImage() {
            if (imageObj != null) {
                messageApi.open({ key: 'updatable', type: 'loading', content: 'Loading...', duration: 0 })
                var formdata = new FormData();
                formdata.append("file", imageObj);
                formdata.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // Replace with your preset
                formdata.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                };

                await fetch("https://api.cloudinary.com/v1_1/" + process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME + "/image/upload", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.asset_id != "") {
                            const data = { link: result.secure_url, deletehash: result.public_id, id: result.asset_id, width: result.width, height: result.height }

                            if (to == "Images") {
                                packagedb.update({
                                    images: firebase.firestore.FieldValue.arrayUnion(data)
                                }).then(() => messageApi.open({ key: 'updatable', type: 'success', content: 'Uploaded' }))
                            }
                            else if (to == "Photos") {
                                db.collection("media").add({
                                    deletehash: data.deletehash,
                                    imageID: data.id,
                                    link: data.link,
                                    width: data.width,
                                    height: data.height,
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                }).then(() => messageApi.open({ key: 'updatable', type: 'success', content: 'Uploaded' }))
                            }
                            else {
                                packagedb.update({
                                    thumbnail: data
                                }).then(() => messageApi.open({ key: 'updatable', type: 'success', content: 'Uploaded' }))
                            }


                        } else {
                            messageApi.error(result.data.error)
                            console.log(result)
                        }
                        // console.log(result)
                        messageApi.destroy()
                        setImageObj(null)
                    })
                    .catch(error => {
                        console.log('error', error);
                        messageApi.error("Something went wrong")
                        setImageObj(null)
                    }
                    );
            }
        }

        uploadImage();

    }, [imageObj])

    function UploadedImage({ image, onDelete }) {
        return (
            <div
                style={{ height: 80, width: 80, display: 'flex', justifyContent: 'center', borderRadius: 10, border: 'solid .5px #d9d9d9' }} >
                <Image src={image} height={'100%'} />
                <div>
                    <DeleteFilled style={{ color: 'red', cursor: 'pointer', position: 'absolute' }}
                        onClick={onDelete} />

                </div>
            </div>
        )
    }

    function UploadButton() {
        return (
            <Upload
                showUploadList={false}
                accept="image/png, image/jpeg"
                onChange={({ file }) => {
                    setImageObj(file.originFileObj)

                }}
            >
                <div style={{ height: 80, width: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 10, border: 'solid .5px #d9d9d9' }}>
                    <div style={{ display: "flex", alignItems: 'center', flexDirection: 'column' }}>
                        <PlusOutlined />
                        <div style={{ marginTop: 8, }}>Add Image</div>
                    </div>
                </div>

            </Upload>
        )
    }

    return (
        <div style={{ marginBottom: 20 }}>
            {contextHolder}
            <p style={{ marginBottom: 5 }}>Add {to}:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, transition: ".5s" }}>
                {images.map((image, index) => (
                    <UploadedImage
                        key={index}
                        image={image.link}
                        onDelete={() => deleteImage({ id: image.id, deletehash: image.deletehash, image: image })}
                    />
                ))
                }
                {images.length < 1 && <UploadButton />}
            </div>
        </div>
    )
}
