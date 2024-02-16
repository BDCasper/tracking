import * as React from 'react';
import "./index.css";
import Button from '@mui/material/Button';

export default function Calculator() {


    return(
        <>
        <div className="calculator">
            <div className="posOne">
                <div className="posOneText" data-dropdown>

                </div>
            </div>
            <Button variant="contained" className="butt">Calculate</Button>
        </div>
        </>
    );
}