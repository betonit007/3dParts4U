import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Carousel = ({ topProducts: products }) => {

  const [pause, setPause] = useState({ index: 0, pause: false })

  const id = useRef()

  const handleLeftClick = () => {
    pause.index === 0 ?
      setPause({ index: products.length - 1, pause: true })
      :
      setPause({ index: pause.index - 1, pause: true })
  }

  const handleRightClick = () => {
    pause.index === products.length - 1 ?
      setPause({ index: 0, pause: true })
      :
      setPause({ index: pause.index + 1, pause: true })
  }


  useEffect(() => {
    pause.pause ?
      clearInterval(id.current)
      :
      id.current = setInterval(() => {
        if (pause.index === products.length - 1) {
          setPause({ index: 0 })

        } else setPause({ index: pause.index + 1 })
      }, 3000)

    return () => clearInterval(id.current)

  }, [pause])


  console.log(products)
  return (

    <div className='carousel-container'>
      {products[pause.index] &&
        <div className="carousel-inner" style={{ backgroundImage: `url(${products[pause.index].image})` }}>
          <div className="left">
            {pause.pause && <i onClick={handleLeftClick} className="fas fa-angle-double-left fa-3x"></i>}
          </div>
          <div className="center" >
            <Link to={`/product/${products[pause.index]._id}`}>
              <h1>{products[pause.index].name} - <span>${products[pause.index].price}</span></h1>
            </Link>
            {pause.pause && <i onClick={() => setPause({ ...pause, pause: false })} className="fa fa-play fa-2x"></i>}
          </div>
          <div onClick={handleRightClick} className="right">
            {pause.pause && <i className="fas fa-angle-double-right fa-3x"></i>}
          </div>
        </div>
      }
    </div>
  )
}

export default Carousel

// When exactly does React clean up an effect? React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time. We’ll discuss why this helps avoid bugs and how to opt out of this behavior in case it creates performance issues later below.
