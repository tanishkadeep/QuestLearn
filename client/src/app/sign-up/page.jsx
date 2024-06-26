import React from 'react'
import SignUp from './SignUp'

const signup = () => {
    return (
        <>
            <div className={`font-jost signInWrapper lg:min-h-screen flex flex-col lg:flex-row items-center justify-center`}>
                <div className="image flex items-center justify-center relative min-h-screen bg-center bg-cover lg:w-1/2 bg-[url('https://img.freepik.com/premium-photo/hand-doctor-reassuring-her-female-patient_33855-13.jpg?w=1060')]">
                    <div className='absolute h-full inset-0 bg-gradient-to-l from-transparent via-opacity-50 to-black' />
                    <div className="message relative leading-tight md:leading-normal lg:leading-none font-extrabold px-4 md:px-20 lg:px-20 xl:px-24 pt-20 pb-10 z-10 text-7xl md:text-8xl lg:text-7xl xl:text-8xl text-white">
                        Start tracking injuries
                        <span className='block'>Sign Up Today!</span>
                    </div>
                </div>
                <div className="form w-full lg:w-1/2">
                    <SignUp />
                </div>
            </div>
        </>
    )
}

export default signup