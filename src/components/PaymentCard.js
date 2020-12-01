import React, { Component } from 'react'
import './PaymentCard.css'

import firebase from 'firebase'
import firebase_config from './firebase_config'

class PaymentCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            database: null,

            cardNumber: '',
            expirationDate: '',
            expirationYear: '',
            securityCode: '',
            cardName: '',

            cardNumberError: '',
            expirationDateError: '',
            securityCodeError: '',
            cardNameError: '',
        }
    }

    componentDidMount() {
        firebase.initializeApp(firebase_config)
        this.setState({ database: firebase.database() })
    }

    validateForm() {
        this.setState({ cardNumberError: ''})
        this.setState({ securityCodeError: ''})
        this.setState({ cardNameError: ''})
        this.setState({ expirationDateError: ''})

        // Number
        if(!this.state.cardNumber) {
            this.setState({ cardNumberError: 'Enter the card number'})
            return false
        }

        const cardNumberRegex = /^\d{16}$/
        if (!cardNumberRegex.test(this.state.cardNumber)){
            this.setState({ cardNumberError: 'Enter full number only'})
            return false
        }
            
        // Date
        if(!this.state.expirationMonth || this.state.expirationMonth === 'MM') {
            this.setState({ expirationDateError: 'Enter expiration date'})
            return false
        }

        if(!this.state.expirationYear || this.state.expirationYear === 'YY') {
            this.setState({ expirationDateError: 'Enter expiration date'})
            return false
        }
            
        // Security Code
        if(!this.state.securityCode) {
            this.setState({ securityCodeError: 'Enter security code'})
            return false
        }

        const securityCodeRegex = /^\d{3}$/
        if (!securityCodeRegex.test(this.state.securityCode)) {
            this.setState({ securityCodeError: 'Enter valid CVV'})
            return false
        }

        // Name
        if(!this.state.cardName){
            this.setState({ cardNameError: 'Enter the name'})
            return false
        }

        const cardNameRegex = /^[a-zA-Z][a-zA-Z\s]*$/
        if (!cardNameRegex.test(this.state.cardName)){
            this.setState({ cardNameError: 'Enter only alphabets'})
            return false
        }
            
        return true
    }

    async postPaymentForm() {
        const database = await this.state.database
        
        await database.ref('list').push().set({ 
            'card-number': this.state.cardNumber, 
            'expiration-month': this.state.expirationMonth,
            'expiration-year': this.state.expirationYear,
            'security-code': this.state.securityCode,
            'card-name': this.state.cardName,
        }, () => window.location.reload())
    }

    handlePaymentForm = event => {
        event.preventDefault()

        if( this.validateForm() ){
            this.postPaymentForm()
        }
    }


    render() {
        return ( 
        <div className="container">

            <form action="" className="wrapper" name="form-payment" onSubmit={this.handlePaymentForm}>
                
                <h1 className="title">Payment Details</h1>

                <div className="input-container">   
                    
                    <div className="input-field-container" id="card-number">
                        <label for="card-number">Card Number</label>
                        <input placeholder="Valid Card Number"  name="cardnumber" type="text" inputMode="numeric" maxLength="16" 
                        value={ this.state.cardNumber } onChange={ event => this.setState({ cardNumber: event.target.value }) } />
                        <div className="error-message">{ this.state.cardNumberError }</div>
                    </div>
                    
                    <div className="input-field-container" id="expiration-date">
                        <label for="expiration-date">Expiration Date</label>

                        <div>

                        <select name="expiration-month"
                        value={ this.state.expirationMonth } onChange={ event => this.setState({ expirationMonth: event.target.value }) } >
                            <option value="MM"  defaultValue>MM</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                            <option value="5" >5</option>
                            <option value="6" >6</option>
                            <option value="7" >7</option>
                            <option value="8" >8</option>
                            <option value="9" >9</option>
                            <option value="10" >10</option>
                            <option value="11" >11</option>
                            <option value="12" >12</option>
                        </select>

                        <select name="expiration-year" 
                        value={ this.state.expirationYear } onChange={ event => this.setState({ expirationYear: event.target.value }) } >
                            <option value="YY"  defaultValue>YY</option>
                            <option value="2021" >2021</option>
                            <option value="2022" >2022</option>
                            <option value="2023" >2023</option>
                            <option value="2024" >2024</option>
                            <option value="2025" >2025</option>
                            <option value="2026" >2026</option>
                            <option value="2027" >2027</option>
                            <option value="2028" >2028</option>
                            <option value="2029" >2029</option>
                            <option value="2030" >2030</option>
                            <option value="2031" >2031</option>
                            <option value="2032" >2032</option>
                            <option value="2033" >2033</option>
                            <option value="2034" >2034</option>
                            <option value="2035" >2035</option>
                            <option value="2036" >2036</option>
                        </select>

                        </div>
                        
                        <div className="error-message">{ this.state.expirationDateError }</div>
                    </div>
                    
                    <div className="input-field-container" id="security-code">
                        <label for="security-code">Security Code</label>
                        <input placeholder="CVC" name="security-code" type="password" inputMode="numeric" maxLength="3"
                        value={ this.state.securityCode } onChange={ event => this.setState({ securityCode: event.target.value }) } />
                        <div className="error-message">{ this.state.securityCodeError }</div>
                    </div>

                    <div className="input-field-container" id="card-name">
                        <label for="card-name">Card Owner</label>
                        <input placeholder="Name on card" name="card-name" type="text" maxLength="26"
                        value={ this.state.cardName } onChange={ event => this.setState({ cardName: event.target.value }) } />
                        <div className="error-message">{ this.state.cardNameError }</div>
                    </div>
                
                </div>

                <div className="submit-btn">
                    {/* TODO type submit */}
                    <button className="button-primary">CONFIRM PAYMENT</button>
                </div>
                
            </form>

        </div> )
    }
}

export default PaymentCard