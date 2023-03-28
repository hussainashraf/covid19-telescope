import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, CardContent,Card } from "@material-ui/core";
import Information from "../components/Information";
import '../main.css'
import Graph from "./Graph";
import Table from './Table'
import nFormatter from "./Number";
// import axios from "axios";
function Dashbord() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])

  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        // console.log(response)
        .then((data) => {
          const countries = data.map((item) => ({
            name: item.country,
            value: item.countryInfo.iso2,
          }));
          setTableData(data)
          setCountries(countries);
        });
    };
    getData();
  }, []);
  useEffect(() => {
  fetch('https://disease.sh/v3/covid-19/all')
  .then(response=>response.json())
  .then(data=>setCountryInfo(data))

  }, [])
  
  const onCountryChange = async e => {
    const url = e.target.value==='worldwide'?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${e.target.value}`
    await fetch(url)
    .then(response =>response.json())
    .then(data=>{
      setCountry(e.target.value);
      setCountryInfo(data)
    })
    
  };
  
  return (
    <div className="flex justify-evenly p-10">
      <div className="app_left">
        <div className="flex justify-between mb-20 object-center">
          <h1>Covid-19 Tracker App</h1>
          <FormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem vlaue="worldwide">worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
  
        <div className="flex justify-between cursor-pointer">
          <Information  title="Covid Cases " cases={countryInfo.todayCases} total={countryInfo.cases} />
          <Information  title="Recovered Cases" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <Information  title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
      </div>
      <Card className="app_right">
        <CardContent>
        <h3>Live Cases by Country</h3>
        <Table countries={country} cases={countryInfo.cases}/>
        <h3>World Wide new Cases</h3>
        <Graph/>
        <p className="text-xs text-black font-medium">Update in Every 10 min</p>
        </CardContent>
      </Card>

      
    </div>
  );
}

export default Dashbord;
