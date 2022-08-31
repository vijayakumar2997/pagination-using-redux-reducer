//import logo from './logo.svg';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { getBeers } from './redux/reducers/beerSlice';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
// require("bootstrap/less/bootstrap.less");

function App() {

  const [getData, setGetdata] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const getbeerData = useSelector((state) => state.beerReducer.entities);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let input ={};
      input.pageNo =1;
      const data = await dispatch(getBeers(input));
      if (data.payload.length > 0) {
        setSearchData(data.payload);
        setGetdata(data.payload);
      }
    }

    fetchData()
      .catch(console.error);

   
    // axios.get('https://api.punkapi.com/v2/beers?page=1&per_page=10')
    // .then(function (res) {
    //   console.log(res);
    // setSearchData(res.data);
    // setGetdata(res.data);
    //})
  }, [])


  const column = [
    {
      name: "Id",
      selector: row => row.id,
    },
    {
      name: "Name",
      selector: row => row.name,
    },
    {
      name: "Tagline",
      selector: row => row.tagline,
    },
    {
      name: " First_brewed",
      selector: row => row.first_brewed,
    },
    {
      name: "Description",
      selector: row => row.description,
    }
  ]
  const handlePageClick = async(event) => {
    const newOffset = (event * 10) % 10;
    // axios.get(`https://api.punkapi.com/v2/beers?page=${event}&per_page=10`)
    //   .then(function (res) {
    //     console.log(res);
    //     setSearchData(res.data);
    //     setGetdata(res.data);
    //   })
    let input ={};
    input.pageNo =event;
     const data = await dispatch(getBeers(input));
      if (data.payload && data.payload.length > 0) {
        setSearchData(data.payload);
        setGetdata(data.payload);
      }else{
        setSearchData([]);
        setGetdata([]);
      }
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(getData[0].name, getData.length);
    // let result = getData.filter((dataValue) => {
    //   return (dataValue.name).includes(inputValue);
    // });
    let result = getbeerData.filter(item => item.name === inputValue)
    setGetdata(result)
  }
  return (
    <div className="APP">
      <div className="container">
        <Container>
          <form onSubmit={handleSubmit}>
            <input value={inputValue} onChange={handleChange} />
            <button type="submit">Search</button>
            <input type="button" onClick={() => setGetdata(searchData)} value="Reset" />
          </form>
          <Table className="table table-striped">
            <thead>
              <tr>
                {column && column.map((item, i) => {
                  return (
                    <th key={i}>{item.name}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {/* {rows && rows.map((item,index) => {
            return ( */}

              {getData && getData.map((field, i) => {
                return (
                  <tr key={i}>
                    <td>{field.id}</td>
                    <td>{field.name}</td>
                    <td>{field.tagline}</td>
                    <td>{field.first_brewed}</td>
                    <td>{field.description}</td>
                  </tr>
                )
              })}

              {/* )
          })} */}
            </tbody>
          </Table>
          <Pagination
            activePage={2}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            onChange={handlePageClick}
          />
        </Container>
        {/* columns={column}
              data={getData}

              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              paginationComponentOptions={{
                rowsPerPageText: "Records per page:",
                rangeSeparatorText: "out of",
              }} */}

      </div>

    </div>
  )

}


export default App;
