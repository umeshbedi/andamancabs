import { db } from '@/firebase';
import { Button, Divider, Form, Input, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react'

import JoditEditor from 'jodit-react';
import firebase from 'firebase/compat/app';
import { Rate } from 'antd';

export default function ActivityItemUpdate({ collection, data, allItemData, index }) {

    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [thumbnail, setthumbnail] = useState("")
    const [headerImage, setHeaderImage] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [slug, setSlug] = useState("")

    // New states
    const [activityPlace, setActivityPlace] = useState('');
    const [price, setPrice] = useState(0);
    const [childPrice, setChildPrice] = useState(0);
    const [duration, setDuration] = useState('');
    const [stars, setStars] = useState(0);

    // New age states
    const [adultAge, setAdultAge] = useState('');
    const [childAge, setChildAge] = useState('');

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)

    const titleRef = useRef()
    var headerImageRef = useRef(null)
    var thumbnailRef = useRef(null)
    var metaDescriptionRef = useRef(null)
    var slugRef = useRef(null)

    // New refs
    const activityPlaceRef = useRef();
    const priceRef = useRef();
    const childPriceRef = useRef();
    const durationRef = useRef();
    const starsRef = useRef();

    // Age refs
    const adultAgeRef = useRef();
    const childAgeRef = useRef();

    function submit() {
        setLoading(true)
        db.doc(`${collection}`).update({
            data: firebase.firestore.FieldValue.arrayUnion({
                title,
                thumbnail,
                about,
                headerImage,
                metaDescription,
                slug: `/activities/${slug}`,
                activityPlace,
                price,
                childPrice,
                adultAge,     // Save adult age
                childAge,     // Save child age
                duration,
                stars
            })
        }).then((e) => {
            messageApi.success("Item Added Successfully!")
            setLoading(false)
        }).catch((err) => {
            messageApi.error(err.message)
        })
    }

    function editData() {
        allItemData.data[index] = {
            title,
            thumbnail,
            about,
            headerImage,
            metaDescription,
            slug: `/activities/${slug}`,
            activityPlace,
            price,
            childPrice,
            adultAge,     // Save adult age
            childAge,     // Save child age
            duration,
            stars
        };

        setLoading(true)
        db.doc(`${collection}`).update({
            data: allItemData.data
        }).then((e) => {
            messageApi.success("Item Updated Successfully!")
            setLoading(false)
        }).catch((err) => {
            messageApi.error(err.message)
        })
    }

    useEffect(() => {
        if (data != undefined) {
            setAbout(data.about)
            setTitle(data.title)
            setHeaderImage(data.headerImage)
            setMetaDescription(data.metaDescription)
            setthumbnail(data.thumbnail)
            setSlug(data.slug.split("/activities/")[1])
            setActivityPlace(data.activityPlace);
            setPrice(data.price);
            setChildPrice(data.childPrice || 0);
            setDuration(data.duration);
            setStars(data.stars);

            // Fetch age fields from db
            setAdultAge(data.adultAge || '');
            setChildAge(data.childAge || '');

            priceRef.current.value = data.price;
            childPriceRef.current.value = data.childPrice || 0;
            activityPlaceRef.current.value = data.activityPlace;
            durationRef.current.value = data.duration;
            starsRef.current.value = data.stars;

            // Update age refs
            adultAgeRef.current.value = data.adultAge || '';
            childAgeRef.current.value = data.childAge || '';

            console.log("Index from update", index)
            console.log("all items data", allItemData)
        }
    }, [data])

    console.log(slug)

    return (
        <div>
            {contextHolder}

            <Form>
                <Form.Item label="Title">
                    <input ref={titleRef} defaultValue={title} placeholder='Enter Page Title'
                        onBlur={(e) => {
                            setTitle(e.target.value)
                            if (slug === "" || slug === undefined) {
                                const slug = titleRef.current.value.split(" ").join("-")
                                setSlug(slug)
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item label="Unique Url">
                    <div className='flex items-center gap-2 text-nowrap'>
                        <p className='bg-gray-300 p-1'>/activities/</p>
                        <input ref={slugRef} defaultValue={slug} placeholder='Enter Unique URL' onBlur={(e) => setSlug(e.target.value)} />
                    </div>
                </Form.Item>

                <Form.Item label="Header Image Url">
                    <input ref={headerImageRef} defaultValue={headerImage} placeholder='Enter Header Image Url' onBlur={(e) => setHeaderImage(e.target.value)} />
                </Form.Item>

                <Form.Item label="Thumbnail Url">
                    <input ref={thumbnailRef} defaultValue={thumbnail} placeholder='Enter Thumbnail Url' onBlur={(e) => setthumbnail(e.target.value)} />
                </Form.Item>

                <Form.Item label="Activity Place">
                    <input ref={activityPlaceRef} defaultValue={activityPlace} placeholder="Enter Activity Place" onChange={(e) => setActivityPlace(e.target.value)} />
                </Form.Item>

                <Form.Item label="Price (Adult)">
                    <input
                        type='number'
                        ref={priceRef}
                        defaultValue={price}
                        placeholder="Enter Adult Price"
                        onChange={(e) => setPrice(e.target.valueAsNumber)}
                    />
                </Form.Item>

                <Form.Item label="Adult Age">
                    <input
                        type='text'
                        ref={adultAgeRef}
                        defaultValue={adultAge}
                        placeholder="Enter Adult Age"
                        onChange={(e) => setAdultAge(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Price (Child)">
                    <input
                        type='number'
                        ref={childPriceRef}
                        defaultValue={childPrice}
                        placeholder="Enter Child Price"
                        onChange={(e) => setChildPrice(e.target.valueAsNumber)}
                    />
                </Form.Item>

                <Form.Item label="Child Age">
                    <input
                        type='text'
                        ref={childAgeRef}
                        defaultValue={childAge}
                        placeholder="Enter Child Age"
                        onChange={(e) => setChildAge(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Duration in Hours">
                    <input ref={durationRef} defaultValue={duration} placeholder="Enter Duration" onChange={(e) => setDuration(e.target.value)} />
                </Form.Item>

                <Form.Item label="Stars">
                    <Rate ref={starsRef} onChange={setStars} value={stars} />
                </Form.Item>

                <Form.Item label="Short Description">
                    <input ref={metaDescriptionRef} defaultValue={metaDescription} placeholder='Enter Thumbnail Url' onChange={(e) => setMetaDescription(e.target.value)} />
                </Form.Item>

                <div>
                    <p style={{ marginBottom: 10 }}>Activity Details:</p>
                    <JoditEditor value={about} onBlur={e => { setAbout(e) }} />
                </div>

                <Button loading={loading} onClick={data != undefined ? editData : submit} type='primary' style={{ marginBottom: '5%' }}>{data != undefined ? "Update" : "Submit"}</Button>
            </Form>
        </div>
    )
}