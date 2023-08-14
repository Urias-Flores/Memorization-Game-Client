import { useEffect } from "react";

export default function Verify ({isCorrect, setIsCorrect, imagesSelected, imagesInGame }){
  useEffect(() => {
    for(let i = 0; i < imagesInGame.length; i++){
      if(imagesSelected[i].image !== imagesInGame[i].url){
        setIsCorrect(false)
      }
    }
  }, []);

  return (
    <div className='verify'>
      {
        isCorrect === false
          ?
            <p className='message lose'>Perdiste</p>
          :
            <p className='message success'>Correcto</p>
      }
    </div>
  )
}
