import React from 'react'

export const Separador = () => {
    return (
        <div className="flex items-center bg-gray-100 pt-7">
            <div className="border-t-2 border-b-2 h-2 border-gray-600 flex-grow"></div>
            <div className="px-3 font-extralight text-gray-800 text-xl  border-r-2 border-l-2 rounded-lg"> <img className="relative w-14 xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="/logo-min.png" alt="" /></div>
            <div className="border-t-2 border-b-2 h-2 border-yellow-400 flex-grow"></div>
        </div>
    )
}
