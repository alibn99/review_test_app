import React from 'react';
import Carousel from "@/components/Carousel";

const Task1 = () => {
    return (
        <div>
            <Carousel selectedProducts={[{other_settings:{video_url:'Test1'}},{other_settings:{video_url:'Test2'}}]}/>
        </div>
    );
};

export default Task1;