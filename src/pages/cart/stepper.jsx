import React from 'react'
import { Steps, Step } from "react-step-builder";
import Cart from './cart.step1';
import DetailCommand from './detailCommand.step4';
import InformationDelivery from './informationDelivery.step2';
import RecapCommand from './recapCommand.step3';

export default function Stepper() {
    return (
        <>
            <Steps>
                <Step component={Cart}/>
                <Step component={InformationDelivery}/>
                <Step component={RecapCommand}/>
                <Step component={DetailCommand}/>
            </Steps>
        </>
    )
}
