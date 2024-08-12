
const Input = ({ Label, value, setText, type = 'text', fullw = false, placeholder = null }) => {
    return (
        <div className={fullw ? 'w-full' : ''}>
            <label>{Label}</label>
            <input placeholder={placeholder} className={"input placeholder-gray-400 " + (fullw ? 'w-full' : '')} type={type} value={value} onChange={(e) => setText(e.target.value)} required />
        </div>
    );
}

export default Input;