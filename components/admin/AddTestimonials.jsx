import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Image, Input, Modal, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { db } from '@/firebase'

const testimonialdb = db.doc(`pages/testimonials`)

export default function TestiMonials() {
    const [testimonials, settestimonials] = useState([])

    const [name, setname] = useState(null)
    const [image, setImage] = useState(null)
    const [content, setcontent] = useState(null)

    const [index, setIndex] = useState(null)

    const [msg, showMsg] = message.useMessage()

    const [open, setOpen] = useState(false)

    const nameRef = useRef()
    const imageRef = useRef()
    const contentRef = useRef()

    function addtestimonials(e) {
        const temptestimonials = [...testimonials]
        console.log(e)
        temptestimonials.push(e)
        settestimonials(temptestimonials)
        testimonialdb.update({ testimonials: temptestimonials })
            .then(() => { msg.success("added") })
            .catch((e) => { msg.error(e.message) })
    }



    function deletetestimonials(i) {
        const temptestimonials = [...testimonials]
        temptestimonials.splice(i, 1)
        settestimonials(temptestimonials)
        testimonialdb.update({ testimonials: temptestimonials })
            .then(() => { msg.success("deleted") })
            .catch((e) => { msg.error(e.message) })
    }

    function Edittestimonials() {
        const temptestimonials = [...testimonials]
        temptestimonials[index] = { name, content, image }
        settestimonials(temptestimonials)
        setOpen(false)
        testimonialdb.update({ testimonials: temptestimonials })
            .then(() => { msg.success("updated") })
            .catch((e) => { msg.error(e.message) })
    }

    useEffect(() => {
        testimonialdb.onSnapshot((snap) => {
            const data = snap.data()

            if (data !== undefined) {
                settestimonials(data.testimonials)
            }

        })

    }, [])

    return (
        <div>
            {showMsg}
            <Form style={{ border: "solid 1px lightgrey", padding: '2%' }} onFinish={addtestimonials}>
                <h2 style={{ color: "grey" }}><i>Add TestiMonials</i></h2>
                <br />
                <Form.Item name={'name'} label="Name">
                    <Input required type="text" placeholder='Enter Name of person...' />
                </Form.Item>
                <Form.Item name={'image'} label="image">
                    <Input type="text" placeholder='Enter Image url...' />
                </Form.Item>
                <Form.Item name={'content'} label="Content">
                    <Input.TextArea required type="text" placeholder='Enter Content...' />
                </Form.Item>
                <Button htmlType='submit'><PlusOutlined /> Add New</Button>
            </Form>
            <div>
                <h2 style={{ color: "grey", marginTop: 30, marginBottom: 30 }}><i>TestiMonials</i></h2>
                {testimonials.length != 0 &&
                    testimonials.map((item, i) => (
                        <div key={i}>
                            <Image src={item.image} width={100} height={100} />
                            <p className='font-bold text-gray-600'><i>
                                #{i + 1}. {item.name} | <span className='font-normal'>{item.content}</span> |  <span>
                                    <EditFilled onClick={() => {
                                        setOpen(true)
                                        setTimeout(() => {
                                            nameRef.current.value = item.name;
                                            setname(item.name)
                                            imageRef.current.value = item.image;
                                            setImage(item.image)
                                            contentRef.current.value = item.content;
                                            setcontent(item.content)
                                            setIndex(i)
                                        }, 100);

                                    }} />
                                </span> | <span style={{ color: 'red' }}>
                                    <DeleteFilled
                                        onClick={() => deletetestimonials(i)} />
                                </span>
                            </i></p>
                            <hr className='mt-3' />
                        </div>
                    ))
                }
            </div>
            <br />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={[<Button key={0} type='primary' onClick={Edittestimonials}>Save</Button>]}
                destroyOnHidden
            >
                <div className='flex flex-col gap-4 mt-6'>
                    <div>
                        <span>Name: </span>
                        <input ref={nameRef} type="text" placeholder='Enter name...' onChange={(e) => setname(e.target.value)} />
                    </div>

                    <div>
                        <span>Image: </span>
                        <input ref={imageRef} type="text" placeholder='Enter Image url...' onChange={(e) => setImage(e.target.value)} />
                    </div>

                    <div>
                        <span>Content: </span>
                        <input ref={contentRef} type="text" placeholder='Enter content...' onChange={(e) => setcontent(e.target.value)} />
                    </div>
                    {/* <Form.Item name={'name'} label="name">
                    </Form.Item>
                    <Form.Item name={'image'} label="image">
                    </Form.Item>
                    <Form.Item name={'content'} label="Content">
                    </Form.Item> */}

                </div>
            </Modal>
        </div>
    )
}
