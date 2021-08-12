import styled from 'styled-components';

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


function SearchBar(props) {
    return (
        <SearchContainer>
            <SearchBox onChange={props.onChange} placeholder="Search for artist"></SearchBox>
        </SearchContainer>
    )
}



export default SearchBar;