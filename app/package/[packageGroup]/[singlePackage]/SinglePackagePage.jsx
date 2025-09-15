import Image from 'next/image'
import React from 'react'

import { mobile } from '@/components/utils/variables'
import { Collapse, Divider, Skeleton } from 'antd'
import { ClockCircleFilled } from '@ant-design/icons'



import { MdSupportAgent } from "react-icons/md";
import String2Html from '@/components/ui/String2Html'

import MyDiv from '@/components/ui/MyDiv'
import CostSection from './CostSection'




export default function SinglePackagePage({ data, packageGroup }) {

    function Include({ icon, name }) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image src={icon} alt={name} width={40} height={40} />
                <p >{name}</p>
            </div>
        )
    }

    // const data = finalData[0]


    // if (data == undefined) return (<div style={{ height: '30vh', padding: '2%' }}><Skeleton active /></div>)

    let travelArr = []
    data.travelJourney.map((d, i) => { travelArr.push(i) })

    return (
        <MyDiv image={data.images[0].link} title={data.name}>
            <div className='w-full flex sm:flex-row flex-col mt-15 packageSection gap-5'>
                <div className='w-full sm:w-[65%]'>
                    <h1>{data.title}</h1>
                    <h3 id='packageDetail' ><ClockCircleFilled /> {data.subtitle}</h3>
                    <Divider style={{ margin: '2%' }} />

                    <div>
                        <h2>Includes</h2>
                        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6`}>
                            {data.includeIcon.map((item, i) => (
                                <Include key={i} icon={item.icon} name={item.name} />
                            ))}
                        </div>
                    </div>

                    <Divider style={{ margin: '2%' }} />

                    <h2 className='mb-2'>Overview</h2>
                    <String2Html id={'overview'} string={data.overview} />

                    <Divider style={{ margin: '2%' }} />

                    <h2 className='mb-2'>Highlights</h2>
                    <String2Html id={'highlights'} string={data.highlights} />

                    <Divider style={{ margin: '2%' }} />

                    <h2 className='mb-2'>Travel Journey</h2>
                    <Collapse
                        size='large'
                        defaultActiveKey={travelArr}
                        accordion={false} style={{ background: 'none' }}
                        items={data.travelJourney.map((tj, i) => {
                            return {
                                key: i,
                                label: <h4>{tj.heading}</h4>,
                                children: <div>
                                    <p className='text-justify'>{tj.content}</p>
                                    <img src={tj.image} alt={tj.heading} loading='lazy' style={{ width: '100%', borderRadius: '20px', marginTop: 10 }} />
                                </div>
                            }
                        })}
                    />
                    <Divider style={{ margin: '2%' }} />

                    <h2>Inclusion</h2>
                    <String2Html id={'inclusion'} string={data.inclusion} />
                    <Divider style={{ margin: '2%' }} />

                    <h2>Exclusions</h2>
                    <String2Html id={'exclusion'} string={data.exclusion} />
                </div>

                <div className='w-full sm:w-[35%]'>
                    {data.isPrice &&
                        <CostSection
                            price={data.price}
                            hotelName={data.hotelName || []}
                            packageDetails={{ packageName: data.name, packageTitle: data.title, packageGroupName: packageGroup.name, packageSubTitle: data.subtitle }}
                        />
                    }

                    <div className='w-full border border-gray-300 bg-gray-200 rounded-3xl p-5 shadow-lg mt-5 mb-20'>
                        <h2 className='mb-5'>Need Help?</h2>
                        <div className='flex shrink-0 gap-2 items-start'>
                            <MdSupportAgent size={50} className='-mt-2' />
                            <div>
                                <p>Call us :<a href='tel:+919933237775'>+919933237775</a> | <a href="tel:+919933263867">+919933263867</a></p>
                                <p>Mail us : <a href="mailto:contact@andamancabs.in">contact@andamancabs.in</a></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </MyDiv>

    )
}


