import { useState } from 'react'

const ImageLoader = ({ product, backupSrc="/images/comingSoon.jpg" }) => {

    const [imageLoaded, setImageLoaded] = useState(false)
    const [loadingError, setLoadingError] = useState(false)

    return (
        <div className='img-loader'>
                <img
                    className='original-photo w-100'
                    src={loadingError ? backupSrc : product.image}
                    onLoad={()=>setImageLoaded(true)}
                    onError={() =>setLoadingError(true)}
                    alt={product.name}
                />

                {
                  !imageLoaded && <img 
                                    className='img-loading'
                                    src='/images/loadingSM.gif'
                                    />
                }
        </div>
    )
}

export default ImageLoader
