<template>
    <section>
        <b-container class="p-4" fluid>
            <div class="rounded" id="border-page">
                <div class="d-flex justify-content-between align-items-center p-4 border-bottom ">
                    <h5 class="m-0" id="title">
                        <strong>List status</strong>
                    </h5>
                    <b-button id="btn-createStatus" class="bg-transparent border-0 p-0">
                        <b-icon icon="plus" scale="1" aria-hidden="true"></b-icon>
                        Create status
                    </b-button>
                </div>
                <div class="d-flex align-items-center justify-content-between mt-4 p-4">

                    <div class="d-flex align-items-center w-75" id="search">
                        <b-icon icon="search" scale="1" id="icon-search"></b-icon>
                        <b-form-input class="bg-transparent " placeholder="Search status" v-model="inputSearch">
                        </b-form-input>
                    </div>
                    <p class="mb-0">Status: <strong>{{ filterStatuses.length }}</strong> </p>
                </div>

                <p v-if="AvailabilityStatuses===true" >No availability statuses found</p>

                <!-- LIST -->
                <div class="p-4">
                    <b-row id="list" class="g-3">
                        <b-col cols="12" v-for="item in filterStatuses" :key="item._id">
                            <div class="d-flex align-items-center justify-content-between  p-3 rounded "
                                id="container-status">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="d-flex align-items-center justify-content-center rounded"
                                        id="container-icon"
                                        :style="`background:${item.backgroundColor};color:${item.color}`">
                                        <b-icon  :icon="item.icon" scale="1.5"></b-icon>
                                    </div>
                                    <div>
                                        <p class="m-0"><strong>{{ item.name }}</strong></p>
                                        <small>{{ item.description }}</small>
                                    </div>

                                </div>

                                <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                                    <template #button-content>
                                        <i class='bx bx-dots-vertical-rounded fs-3'></i>
                                    </template>
                                    <b-dropdown-item href="#">
                                        <b-icon @click="editStatus(item._id)" icon="pen" scale="0.7"></b-icon>Edit
                                    </b-dropdown-item>
                                    <b-dropdown-item href="#">
                                        <b-icon @click="deleteStatus(item._id)" icon="trash" scale="0.7"></b-icon>Delete
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </b-col>
                    </b-row>
                    <!-- paginnation -->
                    <b-pagination class="mt-4" v-model="currentPage" :total-rows="rows" :per-page="perPage"
                        aria-controls="my-table">
                    </b-pagination>
                </div>
                <!-- ALERT -->
                <b-alert class="position-fixed top-0 start-0 end-0 z-3 d-flex align-items-center"
                    :show="dismissCountDown" dismissible variant="danger" @dismissed="dismissCountDown=0">
                    {{ msgAlert }}
                </b-alert>
            </div>
        </b-container>
    </section>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'StatusList',
        data() {
            return {
                status: [],
                inputSearch: '',
                apiUrl: process.env.VUE_APP_API_URL,
                AvailabilityStatuses:false,
                // ALERT
                dismissCountDown: 0,
                msgAlert: ''
            }
        },

        computed:{
            filterStatuses(){
                if(this.status.length===0){
                    return []
                }else{
                    return this.status.filter(item=>item.name.toLowerCase().includes(this.inputSearch.toLowerCase()))
                }
            }
        },

        methods: {
            async getStatus() {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`${this.apiUrl}/api/trackingOrder/AllStatusByAdmin`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    this.status = response.data.status
                } catch (error) {
                    if(error.response.status===404){
                       this.AvailabilityStatuses=true
                    }else{
                        this.msgAlert='An internal server error occurred while retrieving availability statuses.'
                        this.dismissCountDown=4
                    }
                }
            }
        },

       async created(){
            await this.getStatus()
        }

    }
</script>

<style scoped lang="scss">
    #border-page {
        border: 1px solid var(--couleur-primaire-3);

        #btn-createStatus {
            color: #5877f4;
        }

        #search {
            border: 1px solid var(--couleur-primaire-2);
            border-radius: 5px;
            padding: 4px 12px;

            &:focus-within {
                border-color: var(--couleur-primaire-3);
            }

            #icon-search {
                color: var(--couleur-primaire-2);
            }

            input {
                border: none;
                color: var(--couleur-primaire-3);

                &:focus {
                    box-shadow: none;
                }

                &::placeholder {
                    color: var(--couleur-primaire-2);
                }
            }
        }

        #list {
            #container-icon {
                width: 60px;
                height: 60px;
            }

            #container-status {
                border: 1px solid var(--couleur-primaire-2);
            }

            // BTN DROPDOWN
            V::deep #__BVID__84__BV_toggle_ {
                display: flex;
                align-items: center;
                justify-content: center;
            }

        }



    }
</style>