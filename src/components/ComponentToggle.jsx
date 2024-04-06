import { useState } from 'react';

function ComponentToggle({ components }) {
    const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

    return (
        <div>
            <div>
                {components[currentComponentIndex].component}
            </div>
            <div className='component-toggle'>
                {components.map((item, index) => {
                    return <button
                        key={index}
                        onClick={() => setCurrentComponentIndex(index)}
                        disabled={currentComponentIndex === index}
                        className={currentComponentIndex === index ? 'active' : ''}
                    >{item.name}</button>
                })}
            </div>
        </div>
    );
}

export default ComponentToggle;