import GridImagesAnswer from "./gridImagesAnswer.jsx";
import GridImagesSelection from "./gridImagesSelection.jsx";
import {useEffect} from "react";

export default function InGame ({ imagesSelected, setImagesSelected, remainingTime, remainingTimeState, setRemainingTimeState, setDisplay, setCount }){
  useEffect(() => {
    setTimeout( () => {
      setCount(3)
      setDisplay('counter')
    },  remainingTime)
  }, [])

  useEffect(() => {
    if( remainingTimeState === 0 ) {
      setRemainingTimeState(10000)
      return;
    }

    const interval = setInterval( () => {
      setRemainingTimeState(remainingTimeState - 1000)
    }, 1000)

    return () => clearInterval(interval)
  }, [remainingTimeState]);


  return (
    <>
      <GridImagesAnswer
        numberImages={6}
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
