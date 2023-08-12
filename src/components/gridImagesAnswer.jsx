import close from '../assets/images/close.svg'

export default function gridImagesAnswer ({ numberImages = 4, images = [], setImages  }){
  if(images.length === 0){
    for( let i = 0; i < numberImages; i++ ){
      images[i] = {
        key : i,
        image: '/images/gray.png',
        selected: false
      };
    }
  }

  const removeImage = ( key ) => {
    const newImages = images.map( item => {
      if(item.key === key){
        item.image = '/images/gray.png'
        item.selected = false

        return item
      }
      return item
    })

    setImages(newImages)
  }

  return (
    <div className='grid-images-answer'>
      {
        images.map( item =>
          <div key={ item.key } className='item-background'>
            {
              item.selected &&
              <div
                className='remove-image'
                onClick={ () => { removeImage( item.key ) } }
              >
                <img className="x-image" src={close} alt="close"/>
              </div>
            }

            <img
              src={ item.image || images }
              className='item-image'
              alt="item"
            />
          </div>
        )
      }
    </div>
  )
}
