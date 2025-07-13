import React from 'react'
import Home from './HomePage'
import ClientLayout from '@/components/ClientLayout'


const page = () => {
  return (
    <div>
      <ClientLayout>
     <Home/> 
     </ClientLayout>
    </div>
  )
}

export default page
