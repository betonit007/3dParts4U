import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Carousel = ({ topProducts: products }) => {

  const [pause, setPause] = useState({ index: 0, paused: false })

  const id = useRef()

  const handleLeftClick = () => {
    pause.index === 0 ?
      setPause({ index: products.length - 1, paused: true })
      :
      setPause({ index: pause.index - 1, paused: true })
  }

  const handleRightClick = () => {
    pause.index === products.length - 1 ?
      setPause({ index: 0, paused: true })
      :
      setPause({ index: pause.index + 1, paused: true })
  }


  useEffect(() => {
    pause.paused ?
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
            {pause.paused && <i onClick={handleLeftClick} className="fas fa-angle-double-left fa-3x"></i>}
          </div>
          <div onClick={() => setPause({ ...pause, paused: !pause.paused })} className="center" >
            <Link className='text-primary' to={`/product/${products[pause.index]._id}`}>
              <h1>{products[pause.index].name} - <span>${products[pause.index].price}</span></h1>
            </Link>

            <div>
              {products.map((p, i) => (i === pause.index ?
                <span key={i}><i className="fas fa-circle" /></span>
                :
                <span key={i}><i className="far fa-circle" /></span>)
              )
              }
            </div>

          </div>
          <div onClick={handleRightClick} className="right">
            {pause.paused && <i className="fas fa-angle-double-right fa-3x"></i>}
          </div>
        </div>
      }
    </div>
  )
}

export default Carousel

// When exactly does React clean up an effect? React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time. We’ll discuss why this helps avoid bugs and how to opt out of this behavior in case it creates performance issues later below.
