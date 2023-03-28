import React,{useEffect,useRef} from 'react'

import '../Table.css'
function Table({countries,cases}) {            
            return (
                <div className="tablemain">
                    {/* {countries.map(({ country, cases }) => (
                        <tr>
                            <td>{country}</td>
                            <td><strong>{cases}</strong></td>
                        </tr>
                    ))} */}
                            <tr>
                            <td>{countries}</td>
                            <td><strong>{cases}</strong></td>
                        </tr>
                </div>
            )
}

export default Table