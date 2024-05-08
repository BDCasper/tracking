import { React, useEffect, useState } from 'react';
import "./header.css";

export default function Header() {

    return(
        <div className='header-wrapper'>
            <a href="https://consolidation.kz"><img src="assets/images/consolid-logo.png" alt="" className='logo-img'/></a>
            <div className='back-to-main'><a href="https://consolidation.kz">Вернуться на Главную</a></div>
        </div>
    )
}