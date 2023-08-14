
class Image{
  constructor(id, url) {
    this.id = id;
    this.url = url;
  }
}

export function getRandomImages(num_images){
  const images = []
  for(let i = 0; i < num_images; i ++){
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    images[i] = new Image( i, `/images/image-${randomNumber}.svg` );
  }
  return images;
}

export const Images = [
  new Image( 1, `/images/image-1.svg` ),
  new Image( 2, `/images/image-2.svg` ),
  new Image( 3, `/images/image-3.svg` ),
  new Image( 4, `/images/image-4.svg` ),
  new Image( 5, `/images/image-5.svg` ),
  new Image( 6, `/images/image-6.svg` ),
  new Image( 7, `/images/image-7.svg` ),
  new Image( 8, `/images/image-8.svg` ),
  new Image( 9, `/images/image-9.svg` ),
  new Image( 10, `/images/image-10.svg` ),
]

export const TestImages = [
  new Image( 1, `/images/image-3.svg` ),
  new Image( 2, `/images/image-2.svg` ),
  new Image( 3, `/images/image-6.svg` ),
  new Image( 4, `/images/image-9.svg` ),
  new Image( 5, `/images/image-1.svg` ),
  new Image( 6, `/images/image-4.svg` ),
]
