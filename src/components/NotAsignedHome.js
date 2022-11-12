import React, {useState, useEffect  } from "react"
import ProductHero from "../views/ProductHero"



export default function NotAsignedHome() {
  const title = 'Su cuenta aún no fue activada'
  const description = 'Por favor comuniquese con la asociacón para continuar con el proceso de registro.'


  return (
    <>     
      <ProductHero title={title} description={description} showConozcanos={false} />
    </>
  )
}
