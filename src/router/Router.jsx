import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import SearchResultList from '../pages/SearchResultList'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Booked from '../pages/Booked'
import MyAccount from '../Dashboard/UserAccount/MyAccount'
import Bookings from '../Dashboard/AdminPanel/Bookings'
import AdminTours from '../Dashboard/AdminPanel/AdminTours'
import CreateTours from '../Dashboard/AdminPanel/CreateTours'
import UpdateTours from '../Dashboard/AdminPanel/UpdateTour'
import FAQ from '../pages/FAQ'
import TermsPage from '../pages/TermsPage'
import PrivacyPage from '../pages/PrivacyPage'
import BookingConditionsPage from '../pages/BookingConditionsPage'
import Blog from '../pages/Blog'
import BlogPost from '../pages/BlogPost'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/my-account' element={<MyAccount />} />
        <Route path='/all-booking' element={<Bookings />} />
        <Route path='/all-tours' element={<AdminTours />} />
        <Route path='/update-tour/:id' element={<UpdateTours />} />
        <Route path='/create' element={<CreateTours />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/tours/:id' element={<TourDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/booked' element={<Booked />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/tours/search' element={<SearchResultList />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/terms' element={<TermsPage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/booking-conditions' element={<BookingConditionsPage />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:slug' element={<BlogPost />} />
    </Routes>
  )
}
export default Router