import Navigation from './components/Navigation'
import ProfilePhoto from './components/ProfilePhoto'
import Name from './components/Name'
import Titles from './components/Titles'
import Footer from './components/Footer'

export default function Homepage() {
  return (
    <div className="homepage">
      <Navigation />
      <main className="main-content">
        <ProfilePhoto />
        <Name />
        <Titles />
      </main>
      <Footer />
    </div>
  )
} 