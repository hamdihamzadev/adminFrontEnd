<template>
    <section>
        <b-container class="p-4" fluid>
            <div class="p-4 bg-page">
                <h3><strong>Create new customer</strong></h3>
                <p class="text-secondary mb-5">Fill in the details of your new customer below.</p>
                <b-form @submit.prevent="createAccount" >
                    <b-row class="g-4">
                        <b-col lg="6">
                            <b-form-group label="FirstName">
                                <b-form-input id="input" type="text" placeholder="Enter your firstName"
                                    v-model="formCustomer.firstName" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col lg="6">
                            <b-form-group label="LastName">
                                <b-form-input id="input" type="text" placeholder="Enter your lastName"
                                    v-model="formCustomer.lastName" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col lg="6">
                            <b-form-group label="Phone">
                                <b-form-input id="input" v-model="formCustomer.phone" type="tel" name="phone" maxlength="10" placeholder="Enter your number" > placeholder="Enter your phone"
                                    v-model="formCustomer.phone" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col lg="6">
                            <b-form-group label="Contry">
                                <b-form-input id="input" type="text" placeholder="Enter your contry"
                                    v-model="formCustomer.contry" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col lg="6">
                            <b-form-group label="City">
                                <b-form-input id="input" type="text" placeholder="Enter your city"
                                    v-model="formCustomer.city" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col lg="6">
                            <b-form-group label="Adress">
                                <b-form-input id="input" type="text" placeholder="Enter your adress"
                                    v-model="formCustomer.adress" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="6">
                            <b-form-group label="Email">
                                <b-form-input id="input" type="email" placeholder="exemple@gmail.com"
                                    v-model="formCustomer.email" required>
                                </b-form-input>
                            </b-form-group>
                            <span class="small text-danger" v-show="ErrorEmail">Email already used</span>
                        </b-col>

                        <b-col cols="6">
                            <b-form-group label="Password">
                                <b-form-input id="input" type="password" placeholder="Enter your password"
                                    v-model="formCustomer.password" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-button 
                                type="submit"
                                class="w-100 mt-5 d-flex justify-content-center align-items-center gap-1 "
                                variant="primary" id="btn-addcutomer">
                                <i class='bx bx-user-plus'></i> <span>Add Customer</span>
                            </b-button>
                        </b-col>

                    </b-row>
                </b-form>
            </div>
            <b-alert
                    id="alert"
                    class="position-absolute bottom-0 d-flex align-items-center gap-3"
                    :show="dismissCountDown" 
                    dismissible
                    variant="success"
                    @dismissed="dismissCountDown=0"
                    @dismiss-count-down="dismissSecs">
                    <p class="mb-0"><strong>{{ textAlert }}</strong></p>
                </b-alert>
        </b-container>
    </section>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "AddCustomer",
        data() {
            return {
                formCustomer: {
                    nameStore:'',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    contry: '',
                    city: '',
                    adress: '',
                    email: '',
                    password: ''
                },
                ErrorEmail: false,
                dismissSecs: 2,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                textAlert:'Account is created with success',
                apiUrl: process.env.VUE_APP_API_URL
            }
        },


        methods: {

            showAlert() {
                this.showDismissibleAlert=true
                this.dismissCountDown = this.dismissSecs
            },

            async signup() {
                let token=localStorage.getItem('token')
                this.formCustomer.nameStore=localStorage.getItem('nameStore')

                try {
                    const response = await axios.post(`${this.apiUrl}/api/customers/signup`, this.formCustomer,{
                        headers:{
                           Authorization: `Bearer ${token}`
                        }
                    })
                    response.data.message === 'customer is created with successful' ? this.ErrorEmail = false : null
                } catch (error) {
                    if (error.response.data.message && error.response.data.message === 'email already used') {
                        this.ErrorEmail = true
                    } else {
                        console.log(`the error in signup is ${error}`)
                    }
                }
            },

            // BTN CREATE ACCOUNT
            async createAccount() {
                if (
                    this.formCustomer.firstName !== '' && 
                    this.formCustomer.lastName !== '' && 
                    this.formCustomer.contry !== '' &&
                    this.formCustomer.city !== '' &&
                    this.formCustomer.adress !== '' &&
                    this.formCustomer.email !== '' && 
                    this.formCustomer.password !== '' &&
                    this.formCustomer.phone !==''
                ) {
                    
                    await this.signup() 
                    !this.ErrorEmail ?
                    (
                        this.showAlert(),
                    this.formCustomer.adress = '',
                    this.formCustomer.city ='',
                    this.formCustomer.contry = '',
                    this.formCustomer.email = '',
                    this.formCustomer.firstName = '',
                    this.formCustomer.lastName='',
                    this.formCustomer.password='',
                    this.formCustomer.phone=''
                ) 
                : null
                }
            },

            resetalue(event) {
                event.preventDefault()
                this.formCustomer.adress = '', this.formCustomer.city ='', this.formCustomer.contry = '', this.formCustomer.email = '', 
                this.formCustomer.firsName = '', this.formCustomer.lastName, this.formCustomer.password, this.formCustomer.phone
            },

        },

    }
</script>


<style lang="scss" coped>
    .bg-page {
        background-color: var(--couleur-primaire-1);
    }

    form {
        #input {
            background-color: transparent;
            border-color: var(--couleur-primaire-2);
            color: var(--couleur-primaire-3);

            &:focus {
                border-color: white;
                box-shadow: none;
                color: white
            }
        }

        #input::placeholder {
            color: var(--couleur-primaire-2);
        }

    }

    #btn-addcutomer {
        background-color: var(--couleur-primaire-4);
        margin: auto;
    }

    #btn-reset {
        margin: auto;
    }

    #select-product {
        height: 37px;
        border-radius: 0.375rem;
    }

    #sb-quantity {
        height: 37px;
        border-radius: 0.375rem;
    }

    #alert{
        right: 20px;
    }
</style>