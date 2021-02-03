import { useState } from 'react'

const SearchBox = ({ history }) => {

    const [keyword, setKeyword] = useState("")

    const submitHandler = e => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)

        } else {
            history.push('/')
        }
    }

    return (
        
        <form  className='m-1' onSubmit={submitHandler}>
           <input 
             type="text"
             style={{borderRadius: '5px', height: '40px', fontSize: '18px'}}
             onChange={e=>setKeyword(e.target.value)}
             value={keyword}
             placeholder='Search drones...'
             id='searchbar'
            /> 
            <label htmlFor="searchbar">
                <i className='fas fa-search'></i>
            </label>
        </form>
    )
}

export default SearchBox
