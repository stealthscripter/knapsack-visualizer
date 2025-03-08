
import Hero from '../components/Hero'
import Knapsack from '../components/Knapsack'
import NavBar from '../components/NavBar'
import Steps from '../components/Steps'

function AppLayout() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 sm:grid-cols-1  text-white'>
        <NavBar />
        <Hero />
        <Steps />
        <Knapsack />
    </div>
  )
}

export default AppLayout