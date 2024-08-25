const url = 'https://www.course-api.com/react-tours-project'
import Tours from './Tours'
import Loading from './Loading'
import { useState, useEffect } from 'react'
const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id != id)
    setTours(newTours)
  }

  const fetchTours = async () => {
    // setIsLoading(true)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        setIsLoading(false)
        setIsError(true)
        return
      }
      const tours = await response.json()
      setTours(tours)
    } catch (error) {
      setIsError(true)
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTours()
  }, [])
  
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  // TODO
  if (isError) {
    return <h1>There is an error.</h1>
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button
            type="button"
            style={{ marginTop: '2rem' }}
            className="btn"
            onClick={() => {
              fetchTours()
            }}
          >
            refresh
          </button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
