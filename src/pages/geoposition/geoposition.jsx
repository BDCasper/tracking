import { useState } from 'react';
import "./geoposition.css";
import { TextField, Button } from '@mui/material';
import { backend } from '../../App';

export default function Geoposition() {
    const [refCode, setRefCode] = useState("");
    const [arrayOfData, setArrayOfData] = useState([]);
    const [show, setShow] = useState(undefined);
    
    const checkRefCode = async () => {
        setShow(true);
        setArrayOfData(['abobabebebubo','abobabebebubo','abobabebebubo','abobabebebubo','abobabebebubo','abobabebebubo','abobabebebubo','abobabebebubo','abobabebebubo','abobabebebubo'])
        // if(refCode !== "") {
        //     await fetch(`${backend}/api/find?ref=${refCode}`, {
        //       headers: { 'Content-Type': 'apppcation/json' }
        //       // credentials: 'include'
        //     }).then((res) => {
        //       if (res && res.status === 200) {
        //         res.json().then((data) => {
        //             if(data.data === false) {
        //                 setShow(false);
        //             } else {
        //                 setArrayOfData(data.data)
        //                 setShow(true);
        //             }
        //         });
        //       } else {
        //         console.log("No Data");
        //       }
        //     })
        // } else setShow(undefined)
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
            <div className='info'>
            {show === true && (<>
                <div className="upperInfo">
                    <table>
                        <tbody>
                            <tr>
                                <th className="topRow">Количество:</th>
                                <th className="topRow" id="topRowNonBorder">Вес:</th>
                                <th className="topRow" id="topRowNonBorder">Объём:</th>
                            </tr>
                            <tr>
                                <th>hello</th>
                                <th id="topRowNonBorder">hello</th>
                                <th id="topRowNonBorder">hello</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="midInfo">
                    <table>
                        <tbody>
                            <tr>
                                <th className="topRow">Откуда:</th>
                                <th className="topRow">Куда:</th>
                                <th className="topRow">Объём:</th>
                            </tr>
                            <tr>
                                <th className="lowRow" >hello</th>
                                <th className="lowRow" id="topRowNonBorder">hello</th>
                                <th className="lowRow" id="topRowNonBorder">hello</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='information'>
                    <table>
                        <tbody>
                            <tr>
                                <th className="leftRow">Reference number</th>
                                <th>{arrayOfData[0]}</th>
                            </tr>
                            <tr>
                                <th className="leftRow">route</th>
                                <th>{arrayOfData[1]}</th>
                            </tr>
                            <tr>
                                <th className="leftRow">estimated time of pick up</th>
                                <th>{arrayOfData[2]}</th>
                            </tr>
                            <tr>
                                <th className="leftRow">estimated time of shipment</th>
                                <th>{arrayOfData[3]}</th>
                            </tr>
                            <tr>
                                <th className="leftRow">estimated time of arrival</th>
                                <th>{arrayOfData[4]}</th>
                            </tr>
                            <tr>
                                <th className="leftRow">current status</th>
                                <th>{arrayOfData[5]}</th>
                            </tr>
                            <tr>
                                <th className="leftRow">updated date</th>
                                <th>{arrayOfData[6]}</th>
                            </tr>
                            <tr>
                                <th className="leftRow">transport number</th>
                                <th>{arrayOfData[7]}</th>
                            </tr>
                            <tr>
                                <th className="leftRow">mode of transport</th>
                                <th>{arrayOfData[8]}</th>
                            </tr>
                            <tr>
                                <th className="leftRow" id="lastOneLeft">customs clearance date</th>
                                <th id="lastOneRight">{arrayOfData[9]}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
            )}
            </div>
            {show === false && refCode !== ""  && (
                <div className="wrongRef NumberInput">
                    <p className="wrongRefText">Wrong reference number</p>
                </div>
            )}
        </div>
    </div>
    );
}