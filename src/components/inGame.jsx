import GridImagesAnswer from "./gridImagesAnswer.jsx";
import GridImagesSelection from "./gridImagesSelection.jsx";
import {useEffect} from "react";

export default function InGame (
  { imagesSelected,
    setImagesSelected,
    imagesInGame,
    remainingTime,
    setDisplay,
    setCount
  }
  ){

  /*
  useEffect(() => {
    setTimeout( () => {
      setCount(3)
      setDisplay('verify')
    },  remainingTime)
  }, [])
  */

  return (
    <>
      <GridImagesAnswer
        numberImages={imagesInGame.length}
        images={imagesSelected}
        setImages={setImagesSelected}
      />

      <GridImagesSelection
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
    </>
  )
}
