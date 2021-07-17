import styled from 'styled-components';
// import { FaSearch } from "react-icons/fa";

const SearchContainer = styled.div`
    display: block;
    width: 50%;
    align-self: center;
    box-sizing: inherit;
`

const SearchBox = styled.input`
    padding: 0.5vh;
    width: 100%;
    align-self: center;
    box-sizing: inherit;
`

// const SearchButton = styled.button`
//     float: right;
//     width: 20%;
//     padding: 4px 8px;
//     background: white;
//     border-radius: 8px;
//     box-sizing: inherit;

// `

// const SearchIcon = styled(FaSearch)`
//     align-self: center;
//     box-sizing: inherit;
// `

function SearchBar(props){
    return(
        <SearchContainer>
            <SearchBox onChange={props.onChange} placeholder="Search for artist"></SearchBox>
            {/* <SearchButton>
                <SearchIcon/>
            </SearchButton> */}
        </SearchContainer>
    )
}



export default SearchBar;