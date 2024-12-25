import React from 'react'
import Sidebar from './Sidebar'
import ToasterContext from '../context/ToasterContext'
import Followbar from './Followbar'

interface MyLayoutProps {
    children: React.ReactNode
}

const MyLayout: React.FC<MyLayoutProps> = ({ children }) => {
    return (
        <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                    <Sidebar />
                    <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                        <ToasterContext />
                        {children}
                    </div>
                    <Followbar />
                </div>
            </div>
        </div>
    )
}

export default MyLayout
