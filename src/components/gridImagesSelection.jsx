import { Images } from "../models/image.js";

export default function GridImagesSelection ({ imagesSelected, setImagesSelected }){

  const addImage = ( url ) => {
    let isChanged = false;
    const newImages = imagesSelected.map( item => {
      if( item.selected === false && !isChanged){
        item.image = url
        item.selected = true

        isChanged = true;
        return item
      }
      return item
    })

    setImagesSelected(newImages)
  }

  return (
    <div className='grid-images-selection'>
      {
        Images.length === 10 &&
        Images.map( image =>
          <div
            key={image.id}
            className='item-background selection'
            onClick={ () => { addImage( image.url ) } }
          >
            <img
              src={image.url}
              className='item-image'
              alt="img"
            />
          </div>
        )
      }
    </div>
  )
}
