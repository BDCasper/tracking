import { useState } from 'react';
import "./index.css";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function Calculator() {
    
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [typeOfGood, setType] = useState('');
    const [weight, setWeight] = useState(0);
    const [volume, setVolume] = useState(0);
    const [amount, setAmount] = useState(1);
    const [show, setShow] = useState(false);
    const [checkWeight, setCheckWeight] = useState(true);
    const [checkVolume, setCheckVolume] = useState(true);
    const [checkAmount, setCheckAmount] = useState(true);

    
    const [arrOfPlaces, setArrOfPlaces] = useState([
        { id: 1, text: "Абакан-(Хакасия Республика)" },
        { id: 2, text: "Азово с.-(Омская Область)" },
        { id: 3, text: "Астана" },
        { id: 4, text: "Абакан-(Хакасия Республика)" },
        { id: 5, text: "Азово с.-(Омская Область)" },
        { id: 6, text: "Астана" },
        { id: 7, text: "Абакан-(Хакасия Республика)" },
        { id: 8, text: "Азово с.-(Омская Область)" },
        { id: 9, text: "Астана" },
        { id: 10, text: "Абакан-(Хакасия Республика)" },
        { id: 11, text: "Азово с.-(Омская Область)" },
        { id: 12, text: "Астана" },
        { id: 13, text: "Абакан-(Хакасия Республика)" },
        { id: 14, text: "Азово с.-(Омская Область)" },
        { id: 15, text: "Астана" },
      ]);

      const calculate = async () => {
        setCheckWeight(true);
        setCheckVolume(true);
        setCheckAmount(true);

        if(weight == 0 || volume === 0 || amount === 0) {
            if(weight === 0) setCheckWeight(false);
            if(volume === 0) setCheckVolume(false);
            if(amount === 0) setCheckAmount(false);
            return;
        }
        setShow(true);
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
        <div className='calc-page'>
            <div className='calc-page-background-filter'>
                <div className="calc-main">
                    <p className="calc-zagolovok">Экспресс-расчёт стоимости доставки</p>
                    <div className="calc-from-to">
                        <div className='calc-from-block'>
                            <span className="calc-titles">Откуда:</span>
                            <div className="calc-from-line">
                                <Dropdown value={from} onChange={(e) => setFrom(e.target.value)} options={arrOfPlaces} optionLabel="text" placeholder={arrOfPlaces[0].text}
                                    filter valueTemplate="" className="calc-from-list" />
                            </div>
                        </div>
                        <div className='calc-to-block'>
                            <span className="calc-titles">Куда:</span>
                            <div className="calc-to-line">
                                <Dropdown value={to} onChange={(e) => setTo(e.target.value)} options={arrOfPlaces} optionLabel="text" placeholder={arrOfPlaces[0].text}
                                    filter valueTemplate="" className="calc-to-list" />
                            </div>
                        </div>
                    </div>
                    <div className='calc-type-block'>
                    <span className="calc-titles">Характер груза:</span>
                        <div className="calc-type-line">
                            <Dropdown value={typeOfGood} onChange={(e) => setType(e.target.value)} options={arrOfPlaces} optionLabel="text" placeholder={arrOfPlaces[0].text} 
                                filter valueTemplate="" className="calc-to-list" />
                        </div>
                    </div>
                    <div className='calc-data'>
                        <div className='calc-weight-block'>
                            <span className="calc-titles">Вес (кг):</span>
                            <div className='calc-data-lines'>
                                <InputText keyfilter="int" placeholder="0" className={!checkWeight ? "wrong-input" : ""} onChange={e => setWeight(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className='calc-volume-block'>
                            <span className="calc-titles">Объемы (м<sup>3</sup>):</span>
                            <div className='calc-data-lines'>
                                <InputText keyfilter="int" placeholder="0" className={!checkVolume ? "wrong-input" : ""} onChange={e => setVolume(Number(e.target.value))}/>
                            </div>
                        </div>
                        <div className='calc-amount-block'>
                            <span className="calc-titles">Кол-во мест:</span>
                            <div className='calc-data-lines'>
                                <InputText keyfilter="int" placeholder="1" value={amount} className={!checkAmount ? "wrong-input" : ""} onChange={e => setAmount(Number(e.target.value))}/>
                            </div>
                        </div>
                        <Button label="Рассчитать" className="calc-data-button" onClick={calculate}/>
                    </div>
                </div>
            </div>
        </div>
    );
}