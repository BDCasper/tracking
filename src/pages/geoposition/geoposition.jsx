import { useEffect, useState } from 'react';
import "./geoposition.css";
import { TextField, Button } from '@mui/material';
import { backend } from '../../App';

export default function Geoposition() {
    const [refCode, setRefCode] = useState("");
    const [arrayOfData, setArrayOfData] = useState([]);
    const [show, setShow] = useState(undefined);
    const [wrongInput, setWrongInput] = useState(false);
    const [emptyInput, setEmptyInput] = useState(false);
    
    const handleKeywordKeyPress = (e) => {
        if( e.key === 'Enter' ) checkRefCode();
      };

    const checkRefCode = async () => {
        if(refCode !== "") {
            setEmptyInput(false);
            await fetch(`${backend}/api/find?ref=${refCode}`, {
              headers: { 'Content-Type': 'apppcation/json' }
            }).then((res) => {
              if (res && res.status === 200) {
                res.json().then((data) => {
                    if(data.data === false) {
                        setShow(false);
                        setWrongInput(true)
                    } else {
                        setArrayOfData(data.data)
                        setShow(true);
                    }
                });
              } else {
                console.log("No Data");
              }
            })
        } else {
            setEmptyInput(true);
            setShow(false)
        }
    }

    useEffect(() => {
        (
            async() => {
               setWrongInput(false); 
               if(refCode !== '') setEmptyInput(false);
            }
        )()
    },[refCode])

    return(
    <div className="tracking">
        <div className='backgroundFilter'>
            <div className="NumberInput">
                <div className='NumberInput-line'>
                    <TextField
                    id="filled-search"
                    label="Введите реферальный номер"
                    type="search"
                    variant="filled"
                    onChange={(e) => setRefCode(e.target.value)}
                    onKeyUp={handleKeywordKeyPress}
                    />
                    <Button variant="contained" className="findRef" onClick={(checkRefCode)}>find</Button>
                    {wrongInput && (
                    <div className="wrongRef">Данного заказа не существует</div>
                    )}
                    {emptyInput && (
                            <div className="wrongRef">Вы не ввели реферальный номер</div>
                    )}
                </div>
            </div>

            {show === true && (<div className='info'>
                <div className="upperInfo">
                    <table>
                        <tbody>
                            <tr className="topRows">
                                <th>Количество:</th>
                                <th>Вес:</th>
                                <th>Объём:</th>
                                <th>Откуда:</th>
                                <th>Куда:</th>
                            </tr>
                            <tr className="lowRows">
                                <td>{arrayOfData[5]}</td>
                                <td>{arrayOfData[3]} кг</td>
                                <td>{arrayOfData[4]} (м<sup>3</sup>)</td>
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
                                <th className="leftRow">Реферальный номер</th>
                                <td>{arrayOfData[0]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">Дата получения</th>
                                <td>{arrayOfData[6]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">Дата отправления</th>
                                <td>{arrayOfData[7]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">Дата прибытия</th>
                                <td>{arrayOfData[8]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">Текущий статус</th>
                                <td>{arrayOfData[9]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">Номер транспорта</th>
                                <td>{arrayOfData[10]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow">Модель транспорта</th>
                                <td>{arrayOfData[11]}</td>
                            </tr>
                            <tr>
                                <th className="leftRow" id="lastOneLeft">Дата таможенного оформления</th>
                                <td id="lastOneRight">{arrayOfData[12]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            )}
        </div>
    </div>
    );
}