<template>
    <section class="listecustomers">
        <b-container fluid>
            <h1 class="text-center fw-bolder mb-sm-4">List customers</h1>

            <b-row class="align-items-center justify-content-between">
                <!----- search category ----->
                <b-col sm="6">
                    <b-input-group size="sm">
                        <b-form-input id="filter-input" class="bg-transparent" v-model="filter" type="search"
                            placeholder="Type to Search">
                        </b-form-input>
                    </b-input-group>
                </b-col>
                <!----- add category ----->
                <b-col sm="4">
                    <b-button class="d-flex justify-content-center align-items-center" variant="primary"
                        id="btn-addCustomer" @click="addCustomer">
                        <b-icon icon="plus" font-scale="2"></b-icon>Create customer
                    </b-button>
                </b-col>

            </b-row>
            <!----- TABLE PRODUCT ----->
            <b-table responsive striped hover :items="Allcustomers" :filter="filter" :fields="fields" class="mt-2"
                sort-icon-left id="my-table">

                <template #cell(Block)="data">
                    <select :ref="`select${data.index}`" class="form-select" aria-label="Select an action"
                        @change="changeBlock($event,data.item.id)">
                        <option :selected="data.item.Block==='Block'" value="Block">Block</option>
                        <option :selected="data.item.Block==='Unblock'" value="unblock">unblock</option>
                    </select>
                </template>

                <template #cell(Action)="data">
                    <b-icon @click="deleteCustomer(data.item.id)" class="me-3 cursor" icon="trash" aria-hidden="true">
                    </b-icon>
                    <b-icon @click="editCustomer(data.item.id)" class="me-3 cursor" icon="pencil" aria-hidden="true">
                    </b-icon>
                </template>

                <template #cell(Status)="data">
                   <span v-if="data.item.Status==='Inactive'" class="bg-dark-subtle text-black rounded p-2 " >{{ data.item.Status }}</span>
                   <span v-if="data.item.Status==='Active'"   class="bg-black text-white rounded p-2 " >{{ data.item.Status }}</span>
                </template>

            </b-table>

            <!-- <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table">
            </b-pagination> -->




        </b-container>

    </section>
</template>

<script>
    import axios from 'axios';
    import {
        mapActions,
        mapState
    } from 'vuex';
    axios
    export default {
        name: 'ListCustomers',
        data() {
            return {
                fields: [{
                        key: 'FirstName',
                        sortable: false
                    },
                    {
                        key: 'LastName',
                        sortable: false
                    },
                    {
                        key: 'Phone',
                        sortable: false
                    },
                    {
                        key: 'Contry',
                        sortable: false
                    },
                    {
                        key: 'City',
                        sortable: false
                    },
                    {
                        key: 'Email',
                        sortable: false
                    },
                    {
                        key: 'Status',
                        sortable: false
                    },
                    {
                        key: 'Block',
                        sortable: false
                    },
                    {
                        key: 'Action',
                        sortable: false
                    },

                ],

                idCustomer: '',
                filter: null,
                apiUrl: process.env.VUE_APP_API_URL
            }
        },

        computed: {
            ...mapState('allCustomers', {
                Allcustomers: state => state.customers
                    .filter(ele => ele.delete === false)
                    .map(el => {
                        const obj = new Object
                        obj.FirstName = el.firstName
                        obj.LastName = el.lastName
                        obj.Phone = `0${el.phone}`
                        obj.Contry = el.contry
                        obj.City = el.city
                        obj.Email = el.email
                        obj.Status= el.status===false?'Inactive':'Active'
                        obj.Block = el.block === true ? 'Block' : 'Unblock'
                        obj.id = el._id
                        return obj
                    })
            })
        },

        methods: {

            addCustomer() {
                this.$router.push('/Customers/CreateCustomer')
            },

            changeBlock(ev,id) {
                const value = ev.target.value
                const userConfirmed = confirm("Do you really want to block this customer ?");

                if (userConfirmed) {
                    if (value === 'Block') {
                        this.$store.dispatch('allCustomers/ac_blockAndDeleteCustomer', {
                            update: { block: true },
                            id
                        })
        
                    }else{
                        this.$store.dispatch('allCustomers/ac_blockAndDeleteCustomer', {
                            update: { block: false },
                            id
                        })
                    }
                }
                else {
                    console.log("Action annulée.");
                }
            },

            deleteCustomer(id){
                const userConfirmed = confirm("Do you really want to delete this customer ?")
                if(userConfirmed){
                    this.$store.dispatch('allCustomers/ac_blockAndDeleteCustomer',{
                        update: { delete: true },
                        id
                    })
                }
            },

            ...mapActions('allCustomers', {
                fetchCustomers: 'ac_getCustomers'
            }),

        },

        mounted() {
            this.fetchCustomers()
            const url = window.location.pathname;
            console.log(url)
        }
    }
</script>

<style lang="scss" scoped>
    .btn-style {
        height: -webkit-fill-available;
        border-radius: 0px 3px 3px 0px;
        background: #365cf5;
        border: none;
        color: white;
        opacity: inherit;
    }

    #btn-addCustomer {
        width: 100%;
    }

    #filter-input {
        background-color: transparent;
        border-color: var(--couleur-primaire-2);
        color: var(--couleur-primaire-3);

        &:focus {
            border-color: white;
            box-shadow: none;
            color: white
        }
    }

    .cursor {
        cursor: pointer;
    }

    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        #btn-addCustomer {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%, -50%) translate(0px, 10px);
            width: 95%;
        }
    }
</style>