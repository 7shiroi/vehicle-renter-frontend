import React, { Component } from 'react'
import Footer from '../components/Footer'
import ItemContent from '../components/ItemContent'
import Navbar from '../components/Navbar'
import ImageContentMerapi from '../assets/images/image-main-content-merapi-yogyakarta.png'
import ImageContentBromo from '../assets/images/image-main-content-bromo-malang.png'
import ImageContentTelukBogam from '../assets/images/image-main-content-teluk-bogam-kalimantan.png'
import ImageContentMalioboro from '../assets/images/image-main-content-malioboro-yogyakarta.png'

export default class Home extends Component {
  state = {
    items: [
      {name: "Merapi", location: "Yogyakarta", image: ImageContentMerapi},
      {name: "Teluk Bogam", location: "Kalimantan", image: ImageContentTelukBogam},
      {name: "Bromo", location: "Malang", image: ImageContentBromo},
      {name: "Malioboro", location: "Yogyakarta", image: ImageContentMalioboro},
    ]
  }

  render() {
    return (
      <>
        <Navbar isLoggedIn={this.props.isLoggedIn} />
        <header className='home-header'>
          <div className='header-content h-100'>
            <div className='container'>
              <div className='row'>
                <div className='col-12 col-sm-5'>
                  <h1 className='display-2 py-5'><strong>Explore and<br/>Travel</strong></h1>
                  <p className='mb-3'>Vehicle Finder</p>
                  <div className='white-line'></div>
                </div>
              </div>
            </div>
          </div>

        </header>
        <main className='py-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h2>Popular in Town</h2>
                    </div>
                    <div className='col text-end'>
                        <a href='#'>View All</a>
                    </div>
                </div>
                <div className='d-flex flex-column flex-md-row flex-md-wrap justify-content-between align-items-center'>
                  {
                    this.state.items.map((obj, idx) => (   
                    <ItemContent key={`items-${idx}`} image={obj.image} name={obj.name} location={obj.location} />
                  ))
                  }
                </div>
            </div>
        </main>
        <Footer />
      </>
    )
  }
}
