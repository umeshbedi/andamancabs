import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import { Button, Divider, Image, message } from 'antd'
import { db } from '@/firebase'
import { DeleteFilled } from '@ant-design/icons'

export default function Media() {

  const [media, setMedia] = useState([])
  const [msg, showMsg] = message.useMessage()

  const mediadb = db.collection('media')

  async function deleteImage({id, deletehash}){
    const res = await fetch('/api/deleteImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_id:deletehash }),
    });
  
    await res.json().then((data) => {
      if (data.error) {
        msg.error(data.error);
      } else {
        msg.success('Image deleted successfully');
        mediadb.doc(id).delete().then(() => {
          console.log('Image document deleted successfully');
        }
        ).catch((error) => {
          console.error('Error deleting image document:', error);
          msg.error('Failed to delete image document');
        });
      }
    }
    ).catch((error) => {
      console.error('Error deleting image:', error);
      msg.error('Failed to delete image');
    });
    console.log('Delete result:', data);
  }

  useEffect(() => {
    mediadb
      .orderBy('createdAt', 'desc')
      .limit(20)
      .onSnapshot((snap) => {
        const tempMedia = []
        snap.forEach((sndata) => {
          tempMedia.push({ id: sndata.id, ...sndata.data() })
        })
        setMedia(tempMedia)
      })
  }, [])

  function UploadedImage({ image, onDelete }) {
    return (
      <div
        style={{ height: 80, display: 'flex', justifyContent: 'center', border: 'solid .5px #d9d9d9', background: 'white' }} >
        <Image src={image} height={'100%'}
          placeholder={
            <Image
              preview={false}
              src="/images/Loading_icon.gif"
              width={80}
              height={80}
              style={{ objectFit: 'cover' }}
            />
          }
        />
        <div>
          <DeleteFilled style={{ color: 'red', cursor: 'pointer', position: 'absolute' }}
            onClick={onDelete} />

        </div>
      </div>
    )
  }


  return (
    <div>
      {showMsg}
      <h2>Media Section</h2>
      <Divider />
      <ImageUpload to={'Photos'} />
      <Divider />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, transition: ".5s" }}>
        {media.map((image, index) => {
          const splitedUrl = image.link.split(".");
          splitedUrl[2] = splitedUrl[2] + "h";
          const newUrl = splitedUrl.join('.')
          return (
            <>
              <div>

                <UploadedImage
                  key={index}
                  image={image.link}
                  onDelete={() => deleteImage({id: image.id, deletehash: image.deletehash})}
                />
                <Button block style={{ borderRadius: 0 }}
                  onClick={() => {
                    navigator.clipboard
                      .writeText(image.link)
                      .then(() => {
                        msg.success("Copied");
                      })
                      .catch(() => {
                        msg.error("Failed to copy");
                      });
                  }}
                >Copy Link</Button>
              </div>
            </>

          )
        })
        }
      </div>

    </div>
  )
}
