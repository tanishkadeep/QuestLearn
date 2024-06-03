'use client'
import React, { useContext } from 'react'
import TopicContext from '@/context/Topic/topicContext'

const GetStarted = () => {
    const contentType = ['text', 'image', 'video', 'exercises', 'other']
    const { topic, setTopic } = useContext(TopicContext);

    const handleChange = (e) => {
        if (e.target.checked) {
            setTopic({ ...topic, type: [...topic.type, e.target.value] })
        } else {
            setTopic({ ...topic, type: topic.type.filter(type => type !== e.target.value) })
        }
    }

    const handleSubmit = () => {
        console.log(topic)
    }

    return (
        <div className="min-h-screen flex flex-col space-y-8 items-center justify-center bg-[#5454ec] font-poppins">
            <div className="bg-white space-y-4 mt-12 p-8 rounded-2xl shadow-lg max-w-screen-lg w-full">
                <h1 className="text-5xl font-bold mb-4">
                    Enter the details about the topic
                </h1>
                <input
                    type="text"
                    value={topic.title}
                    onChange={(e) => setTopic({ ...topic, title: e.target.value })}
                    placeholder="Enter topic name, information etc..."
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <h2 className="text-xl font-semibold mb-2">
                    Select the type of content you want to receive
                </h2>
                {
                    contentType.map((type, index) => {
                        return (
                            <div key={index} className="mb-2 flex items-center">
                                <input
                                    type="checkbox"
                                    id={type}
                                    name={type}
                                    value={type}
                                    onChange={handleChange}
                                    className="mr-2 checkbox checkbox-sm border-gray-500"
                                />
                                <label htmlFor={type} className="text-lg">{type}</label>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={handleSubmit} className='btn bg-[#ff36ca] px-8 text-lg border-none text-white hover:bg-[#f064cb]'>Submit</button>
        </div>
    )
}

export default GetStarted
