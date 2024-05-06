import { React, useEffect, useState } from 'react';
import "./index.css";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { arrOfPlaces, arrOfTypes } from "./data"
import InputMask from 'react-input-mask';
import { backend } from '../../App';
import MediaQuery from "react-responsive";

export default function Calculator() {

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [typeOfGood, setType] = useState("");
    const [weight, setWeight] = useState(0);
    const [volume, setVolume] = useState(0);
    const [amount, setAmount] = useState(1);
    const [show, setShow] = useState(false);

    const [checkWeight, setCheckWeight] = useState(true);
    const [checkVolume, setCheckVolume] = useState(true);
    const [checkAmount, setCheckAmount] = useState(true);
    const [checkFrom, setCheckFrom] = useState(true);
    const [checkTo, setCheckTo] = useState(true);
    const [checkType, setCheckType] = useState(true);

    const [choose, setChoose] = useState("1");

    const [price, setPrice] = useState([100000, 200000, 300000, 400000]);
    const [priceMain, setPriceMain] = useState(0);

    const [seen, setSeen] = useState(false)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [checkName, setCheckName] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);


    function togglePop() {
        setSeen(!seen);
    };

    const calculate = async () => {
        setCheckWeight(true);
        setCheckVolume(true);
        setCheckAmount(true);
        setCheckFrom(true);
        setCheckTo(true);
        setCheckType(true);

        if (weight === 0 || volume === 0 || amount === 0 || from === to || from === "" || to === "" || typeOfGood === "") {
            setShow(false);
            if (weight === 0 || isNaN(weight)) setCheckWeight(false);
            if (volume === 0 || isNaN(volume)) setCheckVolume(false);
            if (amount === 0) setCheckAmount(false);
            if (from === "") setCheckFrom(false);
            if (to === "") setCheckTo(false);
            if (typeOfGood === "") setCheckType(false);
            if (from === to) {
                setCheckFrom(false);
                setCheckTo(false);
            }
            return;
        }

        await fetch(`https://consolidformula.onrender.com/calculate`, {
            method: "POST",
            // credentials: 'include',
            body: JSON.stringify({
                action: 'calculate',
                from: from,
                to: to,
                amount: amount,
                typeOfGood: typeOfGood,
                weight: weight,
                volume: volume
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: "follow"
        }).then((res) => {
            if (res && res.status === 200) {
                res.json().then((data) => {
                    setPriceMain(data.price);
                    setShow(true);
                    console.log(data)
                });
            } else {
                console.log("No Data");
            }
        })
    }

    useEffect(() => {
        (
            async () => {
                setShow(false);
                setCheckWeight(true);
                setCheckVolume(true);
                setCheckAmount(true);
                setCheckFrom(true);
                setCheckTo(true);
                setCheckType(true);
            })();
    }, [weight,
        volume,
        amount,
        from,
        to,
        typeOfGood])

    useEffect(() => {
        (
            async () => {
                setName(name.trim());
            })();
    }, [name])

    const sendForm = async (e) => {
        e.preventDefault();
        setCheckName(false);
        setCheckPhone(false);

        if (name === '' || phoneNumber === '') {
            if (name === '') setCheckName(true);
            if (phoneNumber === '') setCheckPhone(true);
            return;
        }
        else setSeen(!seen);

        await fetch(`${backend}`, {
            method: "POST",
            // credentials: 'include',
            body: JSON.stringify({
                action: 'saveData',
                name: name,
                phone: "'" + phoneNumber,
                from: from.text,
                to: to.text,
                weight: weight,
                volume: volume,
                amount: amount,
                typeOfGood: typeOfGood.text
            })
        })
    }

    return (
        <div className={show ? 'calc-page exp' : 'calc-page'}>
            <div className='calc-background'>
                <div className="calc-main">
                    <p className="calc-zagolovok">Экспресс-расчёт стоимости доставки</p>
                    <div className="calc-from-to">
                        <div className='calc-from-block'>
                            <span className="calc-titles">Откуда:</span>
                            <div className={!checkFrom ? "calc-from-line wrong-input" : "calc-from-line"}>
                                <Dropdown value={from} onChange={(e) => setFrom(e.target.value)} options={arrOfPlaces} optionLabel="text" placeholder="Выберите.."
                                    filter valueTemplate="" />
                            </div>
                        </div>
                        <div className='calc-to-block'>
                            <span className="calc-titles">Куда:</span>
                            <div className={!checkTo ? "calc-to-line wrong-input" : "calc-to-line"}>
                                <Dropdown value={to} onChange={(e) => setTo(e.target.value)} options={arrOfPlaces} optionLabel="text" placeholder="Выберите.."
                                    filter valueTemplate="" />
                            </div>
                        </div>
                    </div>
                    <div className='calc-type-block'>
                        <span className="calc-titles">Характер груза:</span>
                        <div className={!checkType ? "calc-type-line wrong-input" : "calc-type-line"}>
                            <Dropdown value={typeOfGood} onChange={(e) => setType(e.target.value)} options={arrOfTypes} optionLabel="text" placeholder="Выберите.."
                                filter valueTemplate="" className='font-bold' pt={{
                                    item: ({ context }) => ({
                                        className: 'calc-type-item'
                                    })
                                }} />
                        </div>
                    </div>
                    <div className='calc-data'>
                        <div className='calc-data-blocks calc-weight-block'>
                            <span className="calc-titles">Вес (кг):</span>
                            <div className='calc-data-lines'>
                                <InputText keyfilter="money" placeholder="0" className={!checkWeight ? "wrong-input" : ""} onChange={e => setWeight(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className='calc-data-blocks calc-volume-block'>
                            <span className="calc-titles">Объем (м<sup>3</sup>):</span>
                            <div className='calc-data-lines'>
                                <InputText keyfilter="money" placeholder="0" className={!checkVolume ? "wrong-input" : ""} onChange={e => setVolume(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className='calc-data-blocks calc-amount-block'>
                            <span className="calc-titles">Кол-во мест:</span>
                            <div className='calc-data-lines'>
                                <InputText keyfilter="int" placeholder="1" value={amount} className={!checkAmount ? "wrong-input" : ""} onChange={e => setAmount(Number(e.target.value))} />
                            </div>
                        </div>
                        <Button label="Рассчитать" className="calc-data-button" onClick={calculate} />
                    </div>
                </div>
                <MediaQuery minWidth={1200}>
                    {show &&
                        <div className='answer'>
                            {/* <div className='answer-from-to'>Варианты перевозки между: {from.id} - {to.id}</div> */}
                            <div className='answer-table'>
                                <table>
                                    <thead>
                                        <tr>
                                            {/* <th></th> */}
                                            <th>Заберем</th>
                                            <th>Перевезем</th>
                                            <th>Доставим</th>
                                            <th>Цена, тг</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr className={choose === "1" ? "choosed" : ""} onClick={() => setChoose("1")}>
                                            <td><input type="radio" value="1" checked={choose === "1"} onChange={e => setChoose(e.target.value)} /></td>
                                            <td></td>
                                            <td>{from.capital} - {to.capital}</td>
                                            <td></td>
                                            <td>{price[1]}</td>
                                        </tr>
                                        <tr className={choose === "2" ? "choosed" : ""} onClick={() => setChoose("2")}>
                                            <td><input type="radio" value="2" checked={choose === "2"} onChange={e => setChoose(e.target.value)} /></td>
                                            <td></td>
                                            <td>{from.capital} - {to.capital}</td>
                                            <td>{to.id}</td>
                                            <td>{price[2]}</td>
                                        </tr>
                                        <tr className={choose === "3" ? "choosed" : ""} onClick={() => setChoose("3")}>
                                            <td><input type="radio" value="3" checked={choose === "3"} onChange={e => setChoose(e.target.value)} /></td>
                                            <td>{from.id}</td>
                                            <td>{from.capital} - {to.capital}</td>
                                            <td></td>
                                            <td>{price[3]}</td>
                                        </tr> */}
                                        <tr className={choose === "4" ? "choosed" : ""} onClick={() => setChoose("4")}>
                                            {/* <td><input type="radio" value="4" checked={choose === "4"} onChange={e => setChoose(e.target.value)} /></td> */}
                                            <td>{from.id}</td>
                                            <td>{from.capital} - {to.capital}</td>
                                            <td>{to.id}</td>
                                            <td>{Math.round(priceMain)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='asnwer-result'>ИТОГО: {Math.round(priceMain).toLocaleString('ru')}.00 тг</div>
                            <Button label="ОФОРМИТЬ ЭКСПРЕСС ДОСТАВКУ" className="answer-button" onClick={togglePop} />
                        </div>
                    }
                </MediaQuery>
                <MediaQuery maxWidth={1200}>
                    {show &&
                        <div className='answer'>
                            {/* <div className='answer-from-to'>Варианты перевозки между: {from.id} - {to.id}</div> */}
                            <div className='answer-table'>
                                {/* <table>
                                    <thead>
                                        <th><input type="radio" value="1" checked={choose === "1"} onChange={e => setChoose(e.target.value)} />Перевезем</th>
                                    </thead>
                                    <tbody>
                                        <tr className={choose === "1" ? "choosed" : ""} onClick={() => setChoose("1")}>
                                            <td>{from.capital} <img className='truck' src="assets/images/delivery-truck.png" alt="" /> {to.capital}</td>
                                            <td className='answer-table-price'>Цена: {price[3]} тг</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <thead>
                                        <th><input type="radio" value="2" checked={choose === "2"} onChange={e => setChoose(e.target.value)} />Перевезём + Доставим</th>
                                    </thead>
                                    <tbody>
                                        <tr className={choose === "2" ? "choosed" : ""} onClick={() => setChoose("2")}>
                                            <td>{from.capital} <img className='truck' src="assets/images/delivery-truck.png" alt="" /> {to.capital}</td>
                                            <td><img className='down-arrow' src="assets/images/down-arrow.png" alt="" /></td>
                                            <td>{to.id}</td>
                                            <td className='answer-table-price'>Цена: {price[0]} тг</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <thead>
                                        <th><input type="radio" value="3" checked={choose === "3"} onChange={e => setChoose(e.target.value)} />Перевезем</th>
                                    </thead>
                                    <tbody>
                                        <tr className={choose === "3" ? "choosed" : ""} onClick={() => setChoose("3")}>
                                            <td>{from.id}</td>
                                            <td><img className='down-arrow' src="assets/images/down-arrow.png" alt="" /></td>
                                            <td>{from.capital} <img className='truck' src="assets/images/delivery-truck.png" alt="" /> {to.capital}</td>
                                            <td className='answer-table-price'>Цена: {price[1]} тг</td>
                                        </tr>
                                    </tbody>
                                </table> */}
                                <table>
                                    {/* <thead>
                                        <th><input type="radio" value="4" checked={choose === "4"} onChange={e => setChoose(e.target.value)} />Перевезем</th>
                                    </thead> */}
                                    <tbody>
                                        <tr className={choose === "4" ? "choosed" : ""} onClick={() => setChoose("4")}>
                                            <td>{from.id}</td>
                                            <td><img className='down-arrow' src="assets/images/down-arrow.png" alt="" /></td>
                                            <td>{from.capital} <img className='truck' src="assets/images/delivery-truck.png" alt="" /> {to.capital}</td>
                                            <td><img className='down-arrow' src="assets/images/down-arrow.png" alt="" /></td>
                                            <td>{to.id}</td>
                                            <td className='answer-table-price'>Цена: {Math.round(priceMain)} тг</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='asnwer-result'>ИТОГО: {Math.round(priceMain).toLocaleString('ru')}.00 тг</div>
                            <Button label="ОФОРМИТЬ ЭКСПРЕСС ДОСТАВКУ" className="answer-button" onClick={togglePop} />
                        </div>
                    }
                </MediaQuery>
            </div>

            {seen ?
                <>
                    <div className="popup" onClick={togglePop}></div>
                    <div className='popup-block'>
                        <div className="popup-inner">
                            <form>
                                <div className='popup-title'>Оставьте ваши данные</div>
                                <div className='popup-subtitle'>для того, чтобы получить варианты перевозок</div>
                                <input className={checkName ? "popup-input-name wrongInput" : "popup-input-name"} type="text" placeholder='Имя' id='name' name="name" value={name} onChange={e => setName(e.target.value)} />
                                <InputMask className={checkPhone ? "popup-input-phone wrongInput" : "popup-input-phone"} value={phoneNumber} name="phone" mask="+7 (999) 999-99-99" placeholder="+7 (999) 999-99-99" onChange={e => setPhoneNumber(e.target.value)} />
                                <Button type='submit' label="Отправить" className="popup-button" onClick={sendForm} />
                            </form>
                        </div>
                    </div>
                </>
                : null}
        </div>
    );
}