import {default as axios} from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NoImageIcon from '../assets/images/no-image-icon.png'
import NumberFormat from 'react-number-format'
import { QuantityButtons } from '../components/QuantityButtons'
import Layout from '../components/Layout'
import { FaChevronLeft, FaHeart } from 'react-icons/fa'
import PageNotFound from './PageNotFound'

export const DetailVehicle = () => {
  const {id} = useParams()
  const [detailData, setDetailData] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [responseStatus, setResponseStatus] = useState(null)
  
  useEffect(() => {
    window.scrollTo(0,0)
    getDetailData()
  }, [])

  const getDetailData = async () => {
    const {data, status} = await axios.get(`http://localhost:5000/vehicle/${id}`, {
      validateStatus: function (status) {
        return status < 500; 
      }    
    })
    setResponseStatus(status)
    if(status === 200){
      setDetailData(data.result)
    }
  }

  return (
    <>
    {
      responseStatus === 200 &&
      <Layout>
        <main>
          <div className="container">
            <div className="back-link mb-5">
              <Link to="#"><FaChevronLeft className='back-black' /></Link>
              <div>&ensp;Detail</div>
            </div>
            <div className="row detail g-0 mb-5 d-flex justify-content-between align-items-center">
              <div className="detail-image col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start align-items-center">
                <img className="img-fluid" src={detailData.image || NoImageIcon} />
              </div>
              <div className="col-12 col-lg-6 px-lg-3">
                <div className="mb-5">
                  <h1 className="mb-4">{detailData.name}</h1>
                  <h3>{detailData.location}</h3>
                </div>
                <div className={detailData.is_available === 1 ? "status-true mb-2" : "status-false mb-2"}>
                  {detailData.is_available === 1 ? 'Available' : 'Not available'}
                </div>
                <div className={detailData.has_prepayment === 1 ? "status-true mb-2" : "status-false mb-2"}>
                  {detailData.has_prepayment === 1 ? `Minimal Prepayment: Rp. ${Math.round(detailData.price*(20/100)).toFixed(2)}/day` : 'No Prepayment'}
                </div>
                <div className="mb-4">
                  <p>Capacity: {detailData.capacity} {detailData > 1 ? 'People' : 'Person'}</p>
                  <p>Type: {detailData.category}</p>
                  <p>Reservation deadline: {detailData.reservation_deadline}</p>
                </div>
                <h2 className="text-end"><NumberFormat value={detailData.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={"Rp. "} suffix={"/Day"} /></h2>
              </div>
            </div>
            <div className="row mb-5">
              <div className="photo-list col-12 col-xxl-6 d-none">
                {/* <div className="d-flex justify-content-between align-items-center">
                  <i className="fa-solid fa-chevron-left"></i>
                  <div className="image-container">
                    <img className="img-fluid" src="/assets/images/image-detail-fixie-gray-yogyakarta1.png"
                      alt="fixie-gray-yogyakarta-1" />
                  </div>
                  <div className="image-container">
                    <img className="img-fluid" src="/assets/images/image-detail-fixie-gray-yogyakarta2.png"
                      alt="fixie-gray-yogyakarta-2" />
                  </div>
                  <i className="fa-solid fa-chevron-right"></i>
                </div> */}
              </div>
              <div className="col-12 col-xxl-6 quantity">
                <div className="d-flex h-100 align-items-end">
                    <QuantityButtons initNumber={1} max={detailData.stock} currentNumber={(value) => setQuantity(value)} />
                </div>
              </div>
            </div>
            <div className="row pb-5">
              <div className="action-button-list d-flex flex-column flex-md-row justify-content-between flex-wrap">
                <Link to="#" className="button-action btn-dark flex-grow-1 my-2">Chat Admin</Link>
                <Link to={`/reservation/${detailData.id}`} className="button-action btn-primary flex-grow-1 my-2 mx-md-2">Reservation</Link>
                <Link to="#" className="button-action btn-dark flex-grow my-2"><FaHeart />&ensp;Like</Link>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    }
    {
      responseStatus === 404 &&
      <PageNotFound />
    }
    
    </>
    
  )
}

export default DetailVehicle