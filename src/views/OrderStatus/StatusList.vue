<template>
    <section>
        <b-container class="p-4" fluid>
            <div class="rounded" id="border-page">
                <h5 class="p-4 m-0 border-bottom" id="title"><strong>Create New Status</strong></h5>
                <b-form @submit.prevent="createStatus" class="p-4">
                    <b-row class="g-4">
                        <b-col cols="12">
                            <b-form-group label="Name*">
                                <b-form-input id="input-name" type="text" placeholder="Enter name status" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Description">
                                <b-form-textarea id="input-description" v-model="text"
                                    placeholder="Enter descript status..." rows="3" max-rows="6">
                                </b-form-textarea>
                            </b-form-group>
                        </b-col>

                        <b-col cols="4">
                            <b-form-group label="Icon">
                                <b-form-input id="input-name" type="color" placeholder="Enter name status" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group label="Color">
                                <b-form-input id="input-name" type="color" placeholder="Enter name status" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group label="Background">
                                <b-form-input id="input-name" type="color" placeholder="Enter name status" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>


                        <b-col cols="12">
                          <div class="d-flex gap-2 justify-content-end" >
                            <b-button type="submit"
                                        class="mt-5 d-flex justify-content-center align-items-center gap-1 "
                                        id="btn-cancel">
                                        Cancel
                                    </b-button>

                                    <b-button type="submit"
                                        class="mt-5 d-flex justify-content-center align-items-center gap-1 "
                                        id="btn-save">
                                        Save Status
                                    </b-button>
                          </div>

                        </b-col>
                    </b-row>
                </b-form>
                <p>icons{{ icons }}</p>
            </div>
        </b-container>
    </section>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'CreateStatus',
        data(){
            return{
                icons:null
            }
        },
        methods:{
            async geticon(){
               try{
                const response=await axios.get('https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json')
                console.log('icons is ===>',response.data)
               }catch(error){
                console.log('error get icons is :',error)
               }
            }
        },

        created(){
            this.geticon()
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

        #input-description {
            background-color: transparent;
            border-color: var(--couleur-primaire-2);
            color: var(--couleur-primaire-3);

            &::placeholder {
                color: var(--couleur-primaire-2);
            }
        }

        #btn-save {
            background-color: var(--couleur-primaire-4);
            height: 48px;
            border: none;
            width: 18%;
        }

        #btn-cancel{
            background-color: var(--couleur-primaire-2);
            height: 48px;
            border: none;
            width: 14%;
        }


    }
</style>