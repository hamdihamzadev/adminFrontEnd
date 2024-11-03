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
            <b-table responsive striped hover :items="Allcustomers" :filter="filter" :fields="fields" class="mt-2" sort-icon-left
                id="my-table">
                <template #cell(Action)="data">
                    <b-icon @click="deleteProduct(data.item.id)" class="me-2 cursor" icon="trash-fill"
                        aria-hidden="true">
                    </b-icon>
                    <b-icon @click="editProduct(data.item.id)" class="cursor" icon="pencil-fill"
                        aria-hidden="true">
                    </b-icon>
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
                        key: 'Date',
                        sortable: false
                    },
                    {
                        key: 'Action',
                        sortable: false
                    },

                ],

                idCustomer: '',
                filter: null,
                cust:[],
                apiUrl:process.env.VUE_APP_API_URL
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
                        obj.Date = el.date
                        return obj
                    })
            })
        },

        methods: {


            addCustomer() {
                this.$router.push('/Customers/CreateCustomer')
            },


            ...mapActions('allCustomers', {
                fetchCustomers: 'ac_getCustomers'
            }),

        },
        mounted() {
            this.fetchCustomers()
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