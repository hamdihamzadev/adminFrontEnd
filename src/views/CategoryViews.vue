<template>
    <section class="allcategories">
        <b-container fluid>
            <h1 class="text-center fw-bolder mb-4">All categories</h1>
            <b-row class="align-items-center justify-content-between">
                <!----- search category ----->
                <b-col sm="6">
                    <b-input-group size="sm">
                        <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search">
                        </b-form-input>
                    </b-input-group>

                </b-col>
                <!----- add category ----->
                <b-col sm="4">
                    <b-button class="d-flex justify-content-center align-items-center " variant="primary"
                        id="btn-addCtg" @click="btnaddCtg">
                        <b-icon icon="plus" font-scale="2"></b-icon>Add category
                    </b-button>
                </b-col>

            </b-row>
            <!---------- MODAL ADD CATEGORY --------------->

            <b-modal id="modalAddcategory" ref="modalPostpond" title="Create your category" @hide="onHide" hide-footer>
                <form ref="form" @submit.prevent="handleModal">

                    <b-form-group class="col mb-4" id="input-name" label="Name:" label-for="input-1">
                        <b-form-input class="mt-2" v-model="category.name" id="input-1" type="text"
                            placeholder="Enter name product" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-12 mb-4" id="file" label="Image:" label-for="input-4">
                        <div>
                            <b-form-file v-model="getimg" class="mt-2" name="img" @change="onFileChange" plain>
                            </b-form-file>
                            <img :src="imageUpload" alt="" srcset="" class="w-50 mt-2">
                        </div>
                        <p class="text-danger mt-3" v-show="showErrorImg">Please upload an image</p>
                    </b-form-group>

                    <b-form-group label="Visibility" label-for="category-visibility">
                        <b-form-select class="mt-2" id="category-visibility" v-model="category.visibility"
                            :options="visibilityOptions">
                        </b-form-select>
                    </b-form-group>

                    <b-button variant="primary" type="submit" class="mt-5 w-100">{{ textBtnModal }}</b-button>

                </form>

            </b-modal>

            <!----- TABLE PRODUCT ----->
            <b-table responsive striped hover :filter="filter" :items="itemsCategories" :fields="fields" class="mt-2"
                sort-icon-left id="my-table" :current-page="currentPage">

                <template #cell(Image)="dataimage">
                    <b-img :src="dataimage.value" alt="Responsive image" id="img-ctg"></b-img>
                </template>

                <template #cell(Checked)="dataSelected">
                    <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted"
                        @change="selectBox($event,dataSelected.item,dataSelected.index)">
                    </b-form-checkbox>
                </template>
                <template #cell(Action)="data">
                    <select :ref="`select${data.index}`" class="form-select" aria-label="Select an action"
                        @change="handleActionChange($event,data.item,data.index)">
                        <option selected disabled value="Choose">Choose...</option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                    </select>
                </template>
            </b-table>

            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" aria-controls="my-table">
            </b-pagination>

        </b-container>

    </section>
</template>


<script>
    import {
        mapActions,
        mapState
    } from 'vuex';
    export default {
        name: "CategoryViews",
        data() {
            return {

                // Start Modal
                category: {
                    name: '',
                    image: '',
                    visibility: true
                },
                visibilityOptions: [{
                    text: 'Public',
                    value: true
                }, {
                    text: 'Prive',
                    value: false
                }],
                showErrorImg: false,

                // finish Modal

                fields: [
                    {
                        key: 'Image',
                        sortable: false,
                        tdClass: 'image-cell'

                    },
                    {
                        key: 'Name',
                        sortable: false
                    },
                    {
                        key: 'Products',
                        sortable: false
                    },
                    {
                        key: 'visibility',
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
                getimg: '',
                filter: null,
                imageShow: '',
                imageUpload: '',
                textBtnModal: '',

                // ----- category update or delete ----- 
                idCtgUpdDlt: '',
                indexCtgUpdlt: '',

                // ----- table ----- 
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                apiUrl: process.env.VUE_APP_API_URL,

            }
        },

        computed: {
            ...mapState('allProducts', {
                allProducts: state => state.Products
            }),
            ...mapState('allCategories', {
                allCategories: state => state.categories.filter(ele=>ele.delete===false)
            }),

            itemsCategories() {
                return this.allCategories
                    .map(ele => {
                        const obj = new Object
                        obj.Image = ele.img
                        obj.Name = ele.name
                        obj.Products = this.allProducts.filter(prd => prd.category === ele._id).length 
                        obj.visibility = ele.visibility
                        obj.Date = ele.date
                        obj.id = ele._id
                        return obj
                    })
            }
        },

        methods: {

            onHide() {
                this.$bvModal.hide('modalAddcategory')
                // clean modal
                this.category.image = '';
                this.category.name = '';
                this.category.visibility = true
                this.imageUpload = ''
            },

            btnaddCtg() {
                this.textBtnModal = 'Create'
                this.$bvModal.show('modalAddcategory')
            },

            // action table
            handleActionChange(ev, data, index) {

                this.idCtgUpdDlt = data.id
                if (ev.target.value === 'edit') {
                    // change content modal
                    this.textBtnModal = 'Update'
                    this.category.name = data.Name
                    this.imageUpload = data.Image
                    this.category.visibility = data.visibility
                    // open modal
                    this.$bvModal.show('modalAddcategory')
                    // reset value select
                    this.$refs[`select${index}`].value = 'Choose'

                } else if (ev.target.value === 'delete') {
                    // delete category
                    const userConfirmed = window.confirm("Do you really want to delete this category ?");
                    const id = this.idCtgUpdDlt
                    const formCategoryUpdate = {
                        delete: true
                    }
                    if (userConfirmed) {
                        this.$store.dispatch('allCategories/ac_updateCategory', {
                            id,
                            formCategoryUpdate
                        })
                        // reset value select
                        this.$refs[`select${index}`].value = 'Choose'
                    }
                }
            },

            // ----------------------- start add new product Or edit -----------------------

            // action modal
            handleModal() {

                if (this.textBtnModal === 'Update') {
                    if (this.imageUpload === '') {
                        this.showErrorImg = true

                    } else {
                        this.showErrorImg = false
                        const id = this.idCtgUpdDlt
                        const formCategoryUpdate = new FormData()
                        formCategoryUpdate.append('name', this.category.name)
                        formCategoryUpdate.append('img', this.category.image)
                        formCategoryUpdate.append('visibility', this.category.visibility)
                        this.$store.dispatch('allCategories/ac_updateCategory', {
                            id,
                            formCategoryUpdate
                        })

                        console.log(this.$refs[`select${this.indexCtgUpdlt}`])
                        this.onHide()
                    }

                } else if (this.textBtnModal === 'Create') {
                    if (this.imageUpload === '') {
                        this.showErrorImg = true
                    } else {
                        this.showErrorImg = false

                        const formData = new FormData()
                        formData.append('name', this.category.name)
                        formData.append('img', this.category.image)
                        formData.append('visibility', this.category.visibility)

                        this.$store.dispatch('allCategories/ac_addCategory', formData)
                        this.onHide()
                    }
                }

            },

            // change img
            onFileChange(event) {
                const file = event.target.files[0]
                if (file) {
                    this.category.image = file
                    this.imageUpload = URL.createObjectURL(file)
                }
            },

            makeToast() {
                this.$bvToast.toast('Toast body content', {
                    title: `Category is created with successful`,
                    variant: 'success',
                    solid: true,
                    noAutoHide: true
                })
            },

            // ----------------------- finish add new product or Edit -----------------------

            // ...mapActions('allProducts', {
            //     fetchProducts: 'ac_getProducts'
            // }),

            ...mapActions("allCategories", {
                fetchCategories: 'ac_getCategories'
            })

        },

        mounted() {
            // this.fetchProducts()
            this.fetchCategories()
            this.totalRows = this.itemsCategories.length
        }


    }
</script>

<style>
    #img-ctg {
        width: 100px;
        height: 100px
    }

    .image-cell {
        width: 141px;
    }

    #filter-input {
        padding-block: 22px;
    }

    #filter-input::placeholder {
        color: rgb(184, 184, 184)
    }

    #filter-input:active {
        box-shadow: none;
        border-bottom: white;

    }

    #btn-addCtg {
        width: 100%;
    }

    /* ----------- MODAL ------------ */
    #category-visibility {
        width: 100%;
        height: 40px;
        border-color: #e0e0e0;
        border-radius: 6px;
        padding-inline: 8px;
    }

    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        #btn-addCtg {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%, -50%) translate(0px, 10px);
            width: 95%;
        }
    }
</style>