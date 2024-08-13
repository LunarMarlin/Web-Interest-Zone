import React, { useRef, useState } from 'react';

const ContentInput = ({ value, setText, placeholder = null }) => {

    const textareaRef = useRef(null);

    return (
        <div className='flex flex-grow w-full bg-white rounded-md ' >
            <div contentEditable id='editable' ref={textareaRef} className={"input placeholder-gray-400 w-full resize-none text-lg overflow-y-auto"} value={value} onChange={(e) => setText(e.target.value)} required>

            </div>
        </div >
    );
}

export default ContentInput;