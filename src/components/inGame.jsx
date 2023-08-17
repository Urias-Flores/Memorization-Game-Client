import GridImagesAnswer from "./gridImagesAnswer.jsx";
import GridImagesSelection from "./gridImagesSelection.jsx";

export default function InGame ({ imagesSelected, setImagesSelected, imagesInGame }) {
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
