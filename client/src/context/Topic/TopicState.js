'use client'
import { useState } from "react";
import TopicContext from "./topicContext";

const TopicState = (props) => {
    const [topic, setTopic] = useState({
        title: '',
        type: [],
    });
    return (
        <TopicContext.Provider value={{ topic, setTopic }}>
            {props.children}
        </TopicContext.Provider>
    );
}

export default TopicState;