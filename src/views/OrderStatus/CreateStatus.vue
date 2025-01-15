<template>
    <section>
        <b-container class="p-4" fluid>
            <div class="rounded" id="border-page">
                <h5 class="p-4 m-0 border-bottom" id="title"><strong>Create New Status</strong></h5>
                <b-form @submit.prevent="createStatus" class="p-4">
                    <b-row class="g-4">

                        <b-col cols="12">
                            <b-form-group label="Name*">
                                <b-form-input id="input-name" type="text" placeholder="Enter name status"
                                    v-model="formStatus.name" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Description">
                                <b-form-textarea id="input-description" placeholder="Enter descript status..." rows="3"
                                    v-model="formStatus.description" max-rows="6">
                                </b-form-textarea>
                            </b-form-group>
                        </b-col>

                        <b-col cols="4">
                            <b-form-group label="Icon">
                                <b-button id="btn-icon" :style="`background-color:${formStatus.backgroundColor}`"
                                    @click="$bvModal.show('modalIcons')">
                                    <b-icon :icon="formStatus.icon" scale="1.5" aria-hidden="true"
                                        :style="`color:${formStatus.color}`"></b-icon>
                                </b-button>
                            </b-form-group>
                        </b-col>

                        <b-col cols="4">
                            <b-form-group label="Color">
                                <b-form-input id="input-name" type="color" v-model="formStatus.color" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="4">
                            <b-form-group label="Background">
                                <b-form-input id="input-name" type="color" v-model="formStatus.backgroundColor"
                                    required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <div class="d-flex gap-2 justify-content-end">
                                <b-button type="submit"
                                    class="mt-5 d-flex justify-content-center align-items-center gap-1 "
                                    id="btn-cancel">
                                    Cancel
                                </b-button>

                                <b-button type="submit"
                                    class="mt-5 d-flex justify-content-center align-items-center gap-1 " id="btn-save">
                                    Save Status
                                </b-button>
                            </div>

                        </b-col>

                    </b-row>
                </b-form>

                <!-- MODAL ICONS -->
                <b-modal id="modalIcons" title="Select an Icon" size="xl">
                    <div style="height: 500px; overflow-y: scroll; overflow-x: hidden;">
                        <b-row class="g-1">
                            <b-col v-for="(val,key) in icons" :key="key" cols="2">
                                <b-button @click="formStatus.icon=key"
                                    :style="key===formStatus.icon?' color:black ;border-color:black ':' color:#a0a0a0 ; border-color:#a0a0a0 '"
                                    class="p-4  d-flex flex-column align-items-center gap-2 w-100 bg-transparent ">
                                    <b-icon :icon="key" scale="1.5" aria-hidden="true"></b-icon>
                                    <small style="font-size: 10px;">{{ key }}</small>
                                </b-button>
                            </b-col>
                        </b-row>
                    </div>
                    <template v-slot:modal-footer>
                        <b-button @click="$bvModal.hide('modalIcons')" id="btn-modal">Save</b-button>
                    </template>
                </b-modal>
                <!-- ALERT -->
                <b-alert 
                    class="position-fixed top-0 start-0 end-0 z-3 d-flex align-items-center"
                    :show="dismissCountDown" 
                    dismissible 
                    :variant="variantAlert" 
                    @dismissed="dismissCountDown=0"
                    >
                    <p>Status is created with success</p>
                     <!-- {{ msgAlert }}  -->
                </b-alert>
            </div>
        </b-container>
    </section>
</template>

<script>
    import {
        bootstrapIconsJson
    } from '@/json/icon';
    import axios from 'axios';

    export default {
        name: 'CreateStatus',
        data() {
            return {
                formStatus: {
                    nameStore: '',
                    name: '',
                    icon: 'alarm',
                    backgroundColor: '#ffffff',
                    color: '#388dd8',
                    description: ''
                },
                icons: bootstrapIconsJson,
                apiUrl: process.env.VUE_APP_API_URL,
                // ALERT
                variantAlert:'success',
                dismissCountDown:0,
                msgAlert:''
            }
        },

        methods: {
            async createStatus() {
                try {
                    const token = localStorage.getItem('token')
                    await axios.post(`${this.apiUrl}/api/trackingOrder/Addstatus`, this
                    .formStatus, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    this.msgAlert='status is created with success'
                    this.dismissCountDown=4
                } catch (error) {
                    if(error.response && error.response.data && error.response.data.message){
                        this.msgAlert='status not created please try again'
                        this.variantAlert='danger'
                        this.dismissCountDown=4
                    }else{
                        this.msgAlert='A problem has occurred on the server. Please try again later .'
                        this.variantAlert='danger'
                        this.dismissCountDown=4
                        
                    }
                }
            },

            async getAdmin() {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`${this.apiUrl}/api/admin/getAdmin`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    this.formStatus.nameStore = response.data.admin.nameStore

                } catch (error) {
                    console.log(`error for get user is ${error.message}`)
                }
            },

        },

        async mounted() {
            await this.getAdmin()
        }

    }
</script>

<style scoped lang="scss">
    #border-page {
        border: 1px solid var(--couleur-primaire-3);


        #input-name {
            background-color: transparent;
            border-color: var(--couleur-primaire-2);
            color: var(--couleur-primaire-3);
            height: 48px;

            &::placeholder {
                color: var(--couleur-primaire-2);
            }
        }

        #btn-icon {
            width: -webkit-fill-available;
            height: 48px;
        }

        #input-description {
            background-color: transparent;
            border-color: var(--couleur-primaire-2);
            color: var(--couleur-primaire-3);

            &::placeholder {
                color: var(--couleur-primaire-2);
            }
        }

        #btn-save,
        #btn-modal {
            background-color: var(--couleur-primaire-4);
            height: 48px;
            border: none;
            width: 18%;
        }

        #btn-cancel {
            background-color: var(--couleur-primaire-2);
            height: 48px;
            border: none;
            width: 14%;
        }

        #btn-modal {
            background-color: var(--couleur-primaire-4);
            height: 48px;
            border: none;
            width: 18%;
        }

        v::dep .alert{
            display: flex;
            align-items: center;
        }


    }
</style>