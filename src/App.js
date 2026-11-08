//Import all dependencies, other Components
import Header from './my-components/Header';//import Header Component
import Footer from './my-components/Footer';//import Footer Component
import Home from './my-components/Home'; //import Home Component
import AdvancedJS from './my-components/Advanced'; //import AdvancedJS Component
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FAQ from './my-components/FAQ'; //import FAQ Component
import Invoice from './my-components/Invoice'; //import Invoice Component
import './App.css';
import Dashboard from './my-components/Dashboard'; //import Dashboard Component
import Statement from './my-components/Statement'; //import Statement Component
//Function Component "App"
function App() {

  //Component UI: HTML Rendering
  return (
    <>{/*React Fragment: serve as parent component in JSX and doesn't add anything to the DOM*/}
      <BrowserRouter>
        <div className='container-fluid px-0'>
          <Header />
          <Routes>
            {/*This determines what components should be shown on what route*/}
            <Route path='/' element={<Home />} />
            <Route path='/advancedJS' element={<AdvancedJS />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/statement' element={<Statement />}/>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}
//Export this component to the entire app, can be re-used or hooked into other Components
export default App;

