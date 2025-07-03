import { db } from '@/firebase';
import { Button, Divider, Form, Input, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react'

import JoditEditor from 'jodit-react';


export default function PageUpdate({ pageName }) {

    const [title, setTitle] = useState("")
    const [headerImage, setHeaderImage] = useState("")
    const [metaDescription, setmetaDescription] = useState("")
    const [about, setAbout] = useState("")
    const [size, setSize] = useState(0)

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)

    const titleRef = useRef()
    const headerImageRef = useRef()
    const metaDescriptionRef = useRef()

    function Submit() {
        setLoading(true)
        db.collection('pages').add({
            title, headerImage, metaDescription, about, slug: `/${pageName}`
        }).then((e) => {
            messageApi.success("Page Added Successfully!")
            setLoading(false)
        }).catch((err) => {
            messageApi.error(err.message)
        })
    }

    function Update() {
        setLoading(true)
        db.collection('pages').doc(`${pageName}`).update({
            title, headerImage, metaDescription, about
        }).then((e) => {
            messageApi.success("Page Updated Successfully!")
            setLoading(false)
        }).catch((err) => {
            messageApi.error(err.message)
        })
    }

    useEffect(() => {
        db.collection('pages').where('slug', "==", `${pageName}`).get()
            .then((snap) => {
                // const data = snap.data()
                console.log("Page Update", snap.size)
                if (snap.size > 0) {
                    setSize(snap.size)
                    const data = snap.docs[0].data()
                    setTitle(data.title)
                    setAbout(data.about)
                    setmetaDescription(data.metaDescription)
                    setHeaderImage(data.headerImage)
                    titleRef.current.value = data.title
                    metaDescriptionRef.current.value = data.metaDescription
                    headerImageRef.current.value = data.headerImage
                }
                else {
                    setTitle("")
                    setAbout("")
                    setmetaDescription("")
                    setHeaderImage("")
                    titleRef.current.value = ""
                    metaDescriptionRef.current.value = ""
                    headerImageRef.current.value = ""
                }

            })

    }, [pageName])

    return (
        <div>
            {contextHolder}

            <h2 style={{ marginBottom: 20 }}>{pageName}</h2>
            <Form>
                <Form.Item label="Title">
                    <input ref={titleRef} defaultValue={title} placeholder='Enter Page Title' onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>
                <Form.Item label="Header Image">
                    <input ref={headerImageRef} defaultValue={headerImage} placeholder='Enter header Image url' onChange={(e) => setHeaderImage(e.target.value)} />
                </Form.Item>
                <Form.Item >
                    <JoditEditor onBlur={e => setAbout(e)} value={about} />
                </Form.Item>

                <Form.Item label="Meta Description">
                    <input ref={metaDescriptionRef} defaultValue={metaDescription} placeholder='Enter Short Meta Description' onChange={(e) => setmetaDescription(e.target.value)} />
                </Form.Item>

                <Button loading={loading} 
                onClick={()=>{
                    if (title === "" || headerImage === "" || metaDescription === "" || about === "") {
                        messageApi.error("Please fill all fields")
                    }
                    else {
                        if (size > 0) {
                            Update()
                        }
                        else {
                            Submit()
                        }
                    }
                }} 
                type='primary' style={{ marginBottom: '5%' }}>Save</Button>

            </Form>
        </div>
    )
}
