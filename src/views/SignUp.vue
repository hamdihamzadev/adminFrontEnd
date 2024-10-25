<template>
    <b-row>
        <b-col lg="5"><img src="../assets/Rectangle 56.png" alt="" class="vh-100 w-100 d-none d-lg-block "></b-col>
        <b-col lg="7" class="d-flex flex-column justify-content-center vh-100">
            <div class="text-center">
                <strong id="welcome">Create Your Account Today !</strong>
                <p id="subtitle-welcome">Join us now to unlock exclusive benefits and personalized experiences</p>
            </div>

            <!--  modal -->
            <b-modal ref="modal" id="modal-success" centered title="Welcome!" hide-footer>
                <div class="success-animation">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>
                <p class="my-4 text-center">Your account has been created successfully. Now go to login to your account </p>
                <b-button class="w-100 mt-3"  variant="success"><router-link to="/Login" tag="li" class="list-unstyled" ><a href="" class="text-white text-decoration-none" >Sign in</a></router-link></b-button>
            </b-modal>


            <b-form @submit.prevent="signup" id="form-signup">

                <div class="row">
                    <b-form-group class="col-6">
                        <label id="custom-labelel">First Name</label>
                        <b-form-input id="Name" v-model="form.firsName" type="text" required>
                        </b-form-input>
                    </b-form-group>


                    <b-form-group class="col-6">
                        <label id="custom-labelel">Last Name</label>
                        <b-form-input id="Age" v-model="form.lastName" type="text" required>
                        </b-form-input>

                    </b-form-group>
                </div>

                <label id="custom-labelel">Email</label>
                <b-form-group>
                    <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>
                    <span class="small text-danger" v-show="ErrorForm.showError">{{ErrorForm.text}}</span>
                </b-form-group>

                <label id="custom-labelel">Password</label>
                <b-form-group>
                    <b-form-input type="password" id="password" v-model="form.password" required></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="light" class="fw-bold w-100" id="button" @click="createAccout">
                    Create account
                </b-button>
                <p class="text-center mt-3">Already have an account?
                    <a href="" @click="gotoLogin">Sign in</a>
                </p>

            </b-form>
        </b-col>
    </b-row>

</template>

<script>
    import axios from 'axios';
    export default {
        name: 'SignUp',

        data() {
            return {
                form: {
                    firsName: '',
                    lastName: '',
                    email: '',
                    password: ''
                },
                apiUrl: process.env.VUE_APP_API_URL,
                ErrorForm: {
                    text: 'email already used',
                    showError: false
                },
            }
        },

        methods: {

            async signup() {
                try {
                    const response = await axios.post(`${this.apiUrl}/api/admin/signup`, this.form)
                    response.data.message === 'Your account is created with successful' ? this.ErrorForm.showError = false : null
                } catch (error) {
                    if (error.response.data.message && error.response.data.message === 'email already used') {
                        this.ErrorForm.showError = true
                    } else {
                        console.log(`the error in signup is ${error}`)
                    }
                }
            },

            // BTN CREATE ACCOUNT
           async createAccout() {
                if (this.form.firsName !== '' && this.form.lastName !== '' && this.form.email !== '' && this.form.password !== '') {
                    await this.signup() 
                    !this.ErrorForm.showError ? (this.$bvModal.show('modal-success'),this.form.firsName='',this.form.lastName='',this.form.email='',this.form.password='') : null
                }
            },

            // gotoLogin
            gotoLogin(){
                this.$router.push('Login')
            }

        },
    }
</script>

<style scoped>

    #welcome {
        font-size: 22px;
    }

    #subtitle-welcome {
        font-size: 14px;
        color: #969696;
        margin-top: 4px;
    }

    #logo {
        position: absolute;
        top: 41px;
        transform: translate(167%, 66%);
    }

    #form-signup {
        margin-inline: 24%;
        margin-top: 26px;
    }

    #Name,
    #Age,
    #email,
    #password {
        background: transparent;
        border: 1px solid #969696;
        height: 46px;
        margin-bottom: 7px;
        display: block;
        color: white;
        border-radius: 6px;
        padding-left: 15px;
    }





    #email::placeholder {
        color: #969696;
    }

    #password::placeholder {
        color: #969696;
    }

    #Age::placeholder {
        color: #969696;
    }

    #Name::placeholder {
        color: #969696;
    }




    #Name:focus {
        color: #ffffff;
        box-shadow: none;
        border-color: white;
    }

    #Age:focus {
        color: #ffffff;
        box-shadow: none;
        border-color: white;
    }

    #email:focus {
        color: #ffffff;
        box-shadow: none;
        border-color: white;
    }

    #password:focus {
        color: #ffffff;
        box-shadow: none;
        border-color: white;
    }


    #button {

        margin-top: 35px;
        color: #02021E;
        height: 46px;

    }

    #custom-labelel {
        background: #02021e;
        position: relative;
        top: 8px;
        width: AUTO;
        text-align: center;
        left: 11px;
        font-size: 13px;
        display: inline-block;
        padding: 0px 4px;
    }

    /* animation success sign up */
    .checkmark {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #4bb71b;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #4bb71b;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
    position:relative;
    top: 5px;
    right: 5px;
   margin: 0 auto;
}
.checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #4bb71b;
    fill: #fff;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
 
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes scale {
    0%, 100% {
        transform: none;
    }

    50% {
        transform: scale3d(1.1, 1.1, 1);
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #4bb71b;
    }
}

/* hide modal */
::v-deep .modal-content .modal-header button{
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
}

    /* Style for tablets (less than de 992px) */
    @media (max-width: 991.98px) {

        #img {
            display: none;
        }

        #form-signup {
            margin-inline: 12%;

        }
    }

    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        #img {
            display: none;
        }

        #form-signup {
            margin-inline: 5%;

        }
    }
</style>