import { db } from '@/firebase';
import { Button, Divider, Form, Input, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react'

import JoditEditor from 'jodit-react';


export default function RentalsItemUpdate({ collection, data }) {

    const [title, setTitle] = useState("")
    const [type, setType] = useState("null")
    const [price, setprice] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [distance, setdistance] = useState("")
    const [label, setLabel] = useState("null")
    const [star, setStar] = useState(3)
    const [description, setDescription] = useState("")

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)

    const titleRef = useRef()
    const typeRef = useRef()
    const priceRef = useRef()
    const thumbnailRef = useRef()
    const distanceRef = useRef()
    const labelRef = useRef()
    const starRef = useRef()
    const descriptionRef = useRef()

    function Submit() {
        setLoading(true)
        db.doc(`${collection}`).collection("cabs").add({
            title, price, distance, thumbnail, type, label, star, description
        }).then((e) => {
            messageApi.success("Item Added Successfully!")
            setLoading(false)
        }).catch((err) => {
            messageApi.error(err.message)
        })
    }

    function EditData() {
        setLoading(true)
        db.doc(`${collection}`).collection("cabs").doc(`${data.id}`).update({
            title, price, distance, thumbnail, type, label, star, description
        }).then((e) => {
            messageApi.success("Page Updated Successfully!")
            setLoading(false)
        }).catch((err) => {
            messageApi.error(err.message)
        })
    }

    console.log(type)
    useEffect(() => {

        if (data !== undefined) {

            db.doc(`${collection}`).collection("cabs").doc(`${data.id}`).get()
                .then((snap) => {
                    const data = snap.data()
                    if (data !== undefined) {
                        const dataLength = Object.keys(data).length
                        if (dataLength != 0) {
                            setTitle(data.title)
                            setType(data.type)
                            setdistance(data.distance)
                            setprice(data.price)
                            setThumbnail(data.thumbnail)
                            setLabel(data.label)
                            setStar(data.star)
                            setDescription(data.description)
                            titleRef.current.value = data.title
                            typeRef.current.value = data.type==undefined?"null":data.type
                            labelRef.current.value = data.label==undefined?"null":data.label
                            priceRef.current.value = data.price
                            thumbnailRef.current.value = data.thumbnail
                            distanceRef.current.value = data.distance
                            starRef.current.value = data.star
                            descriptionRef.current.value = data.description
                        } else {
                            setTitle("")
                            setdistance("")
                            setprice("")
                            setStar(3)
                            setThumbnail("")
                            setLabel("null")
                            setType("null")
                            setDescription("")
                            labelRef.current.value = "null"
                            titleRef.current.value = ""
                            typeRef.current.value = "null"
                            priceRef.current.value = ""
                            thumbnailRef.current.value = ""
                            distanceRef.current.value = ""
                            starRef.current.value = 3
                            descriptionRef.current.value = ""
                        }
                    }
                })
        }
    }, [data])

    return (
        <div>
            {contextHolder}

            <Form>
                <Form.Item label="Title">
                    <input ref={titleRef} defaultValue={title} placeholder='Enter Page Title' onChange={(e) => setTitle(e.target.value)} />
                </Form.Item>

                <Form.Item label="Type">
                    <select
                        ref={typeRef}
                        defaultValue={type==undefined?"null":type}
                        name="vehicletype"
                        className='p-1'
                        onChange={(e) => {
                            if (e.target.value !== "null") {
                                setType(e.target.value);
                                console.log(e.target.value)
                            }
                        }}
                    >
                        <option value="null">select type</option>
                        <option value="4">4 Wheeler</option>
                        <option value="2">2 Wheeler</option>
                    </select>
                </Form.Item>


                <Form.Item label="Label">
                    <select
                        ref={labelRef}
                        defaultValue={label==undefined?"null":label}
                        name="label"
                        className='p-1'
                        onChange={(e) => {
                            if (e.target.value !== "null") {
                                setLabel(e.target.value);
                                console.log(e.target.value)
                            }
                        }}
                    >
                        <option value="null">select Label</option>
                        <option value="Exclusive">EXCLUSIVE</option>
                        <option value="Recommended">RECOMMENDED</option>
                        <option value="Recommended">MOST BOOKED</option>
                    </select>
                </Form.Item>

                <Form.Item label="Price">
                    <input ref={priceRef} type='number' defaultValue={price} placeholder='Enter Price' onChange={(e) => setprice(e.target.valueAsNumber)} />
                </Form.Item>

                <Form.Item label="Distance (KM)">
                    <input ref={distanceRef} type='number' defaultValue={distance} placeholder='Enter Kilometers' onChange={(e) => setdistance(e.target.valueAsNumber)} />
                </Form.Item>

                <Form.Item label="Stars">
                    <input ref={starRef} type='number' defaultValue={star} placeholder='Enter Star' 
                    onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        if (value > 0 && value <= 5) {
                            setStar(value);
                        } else {
                        messageApi.error("Star rating must be between 0 and 5");
                        }
                    }} 
                    onBlur={(e)=>{
                        if (e.target.valueAsNumber <= 0 || e.target.valueAsNumber > 5) {
                            e.target.value = 3; // Reset to default value if out of range
                            setStar(3);
                        }
                    }}
                    />
                </Form.Item>

                <Form.Item label="Vehicle Image">
                    <input ref={thumbnailRef} defaultValue={thumbnail} placeholder='Enter Cab Image url' onChange={(e) => setThumbnail(e.target.value)} />
                </Form.Item>

                <Form.Item label="Description">
                    <input ref={descriptionRef} defaultValue={description} placeholder='Enter Cab Description' onChange={(e) => setDescription(e.target.value)} />
                </Form.Item>

                <Button loading={loading} onClick={data != undefined ? EditData : Submit} type='primary' style={{ marginBottom: '5%' }}>{data != undefined ? "Update this Vehicle" : "Add Vehicle"}</Button>

            </Form>
        </div>
    )
}
