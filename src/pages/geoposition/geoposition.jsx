import { useState } from 'react';
import "./geoposition.css";
import { TextField, Button } from '@mui/material';
import { backend } from '../../App';

export default function Geoposition() {
    const [refCode, setRefCode] = useState("");
    const [arrayOfData, setArrayOfData] = useState([]);
    const [show, setShow] = useState(undefined);
    
    const checkRefCode = async () => {
        if(refCode !== "") {
            await fetch(`${backend}/api/find?ref=${refCode}`, {
              headers: { 'Content-Type': 'apppcation/json' }
            }).then((res) => {
              if (res && res.status === 200) {
                res.json().then((data) => {
                    if(data.data === false) {
                        setShow(false);
                    } else {
                        setArrayOfData(data.data)
                        setShow(true);
                    }
                });
              } else {
                console.log("No Data");
              }
            })
        } else setShow(undefined)
    }

    return(
    <div className="tracking">
        <div className='backgroundFilter'>
            <div className="NumberInput">
                <TextField
                id="filled-search"
                label="Enter reference number"
                type="search"
                variant="filled"
                onChange={(e) => setRefCode(e.target.value)}
                />
                <Button variant="contained" className="findRef" onClick={(checkRefCode)}>find</Button>
            </div>
            {show === true && (<div className='info'>
                <div className="upperInfo">
                    <table>
                        <tbody>
                            <tr className="topRows">
                                <th>Количество:</th>
                                <th>Вес:</th>
                                <th>Объём:</th>
                            </tr>
                            <tr className="topRows">
                                <td>{arrayOfData[5]}</td>
                                <td>{arrayOfData[3]} кг</td>
                                <td>{arrayOfData[4]} (м<sup>3</sup>)</td>
                            </tr>
                            <tr className='lowRows'>
                                <th>Откуда:</th>
                                <th>Куда:</th>
                            </tr>
                            <tr className='lowRows'>
                                <td>{arrayOfData[1]}</td>
                                <td>{arrayOfData[2]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='information'>
                    <table>
                        <tbody>
                            <tr>
                                <th className="leftRow">Reference number</th>
                                <td>{arrayOfData[0]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">time of pick up</th>
                                <td>{arrayOfData[6]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">time of shipment</th>
                                <td>{arrayOfData[7]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">time of arrival</th>
                                <td>{arrayOfData[8]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">current status</th>
                                <td>{arrayOfData[9]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">transport number</th>
                                <td>{arrayOfData[10]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">mode of transport</th>
                                <td>{arrayOfData[11]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow" id="lastOneLeft">customs clearance date</th>
                                <td id="lastOneRight">{arrayOfData[12]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            )}
            {show === false && refCode !== ""  && (
                <div className="wrongRef NumberInput">
                    <p className="wrongRefText">Wrong reference number</p>
                </div>
            )}
        </div>
    </div>
    );
}