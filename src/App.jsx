// import Experience from './components/Experience'
import Overlay from './components/Overlay'

function App() {
  return (
    <>
      {/* <Experience /> */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#111' }}>
        <Overlay />
      </div>
    </>
  )
}

export default App