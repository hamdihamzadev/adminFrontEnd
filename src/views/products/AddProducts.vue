<template>
    <div>
        <!----- add prduct ----->
        <b-button class="w-md-100 d-flex align-items-center justify-content-center " variant="primary" id="btn-addprd"
            @click="showmodalCreate()">
            <b-icon icon="plus" font-scale="2"></b-icon>Add product
        </b-button>
        <!---------- SHOW POPUP --------------->

        <b-modal id="modalAddproduct" ref="modalPostpond" title="Create your product"  hide-footer>
            <form @submit.prevent="handleBtnModal"  ref="form">
                    <b-form-group class="mb-4" id="input-name" label="Name:" label-for="input-1">
                        <b-form-input v-model="formProduct.name" id="input-1" type="text"
                            placeholder="Enter name product" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="mb-4" id="input-category" label="Category:" label-for="selectCategory">
                        <b-form-select v-model="formProduct.category" class="w-100" id="selectCategory"
                            :options="allcategories" required>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group class="mb-4" id="input-price" label="Price:" label-for="input-1">
                        <b-form-input v-model="formProduct.price" id="input-1" type="number"
                            placeholder="Enter Price product" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="mb-4" id="input-quantity" label="Quantity:" label-for="input-4">
                        <b-form-input v-model="formProduct.quantity" id="input-4" type="number"
                            placeholder="Enter Quantity product" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Description" class="mb-4">
                        <b-form-textarea v-model="formProduct.description" id="textarea-auto-height"
                            placeholder="Auto height textarea" rows="3" required>
                        </b-form-textarea>
                    </b-form-group>

                    <b-form-group label="Shipping" class="mb-4">
                        <b-form-select class="w-100" id="selectShipping" placeholder="Select a delivery option" v-model="ShippingSelected" :options="optionsShipping" required></b-form-select>
                        <b-form-input v-show="Shi" v-model="formProduct.price" id="input-1" type="number" placeholder="Enter Price product" required></b-form-input>
                    </b-form-group>

                    <b-form-group class="mb-5" id="input-quantity" label="Image:" label-for="input-4">
                        <b-form-file class="mt-2" @change="onFileChange" plain required></b-form-file>
                        <img :src="imageUpload" alt="" srcset="" class="w-50 mt-2">
                    </b-form-group>

                    <b-button class="w-100" variant="primary" type="submit" >{{ textbtnform }}</b-button>
 
            </form>

        </b-modal>

    </div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';

    export default {
        name: 'AddProduct',
        data() {
            return {

                formProduct: {
                    name: '',
                    price: '',
                    quantity: '',
                    description: '',
                    category: '',
                    image: '',
                    ShippingSelected:'Free shipping'
                },
                imageUpload: '',
                forme: '',
                textbtnform: 'Create',
                id: '',
                optionsShipping:[
                    {text:'Free shipping',value:'Free shipping'},
                    {text:'Paid shipping',value:'Paid shipping'},
                ],
                ShippingSelected:''

            }
        },

        computed: {

            ...mapState('allCategories', {
                allcategories: state => state.categories.map(ele => {
                    const obj = new Object
                    obj.text = ele.name
                    obj.value = ele._id
                    return obj
                })
            }),
            date() {

                let newdate = new Date();
                let year = newdate.getFullYear().toString()
                let month = (newdate.getMonth() + 1).toString()
                let day = newdate.getDate()
                let hour = newdate.getHours().toString()
                let munite = newdate.getMinutes().toString()
                let seconde = newdate.getSeconds().toString()

                let date = `${year}-${month}-${day} ${hour}:${munite}:${seconde}`
                return date
            }
        },

        methods: {
            showmodalCreate() {
                this.$bvModal.show('modalAddproduct')
                this.date
                this.textbtnform = 'Create'
            },

            showmodalEdit(item) {
                this.$bvModal.show('modalAddproduct')
                this.textbtnform = 'Edit'
                this.formProduct.name = item.Name
                this.formProduct.price = item.Price
                this.formProduct.quantity = item.Quantity
                this.formProduct.description = item.Description
                this.formProduct.image = item.Image
                this.formProduct.category = item.Category.id
                this.imageUpload = item.Image
                this.id = item.id

            },

            hideModal() {
                this.$bvModal.hide('modalAddproduct')
            },

            handleBtnModal() {
                if (this.textbtnform === 'Edit') {
                    // UPDATE PRODUCT
                    const formData = new FormData()
                    formData.append('name', this.formProduct.name)
                    formData.append('price', this.formProduct.price)
                    formData.append('quantity', this.formProduct.quantity)
                    formData.append('description', this.formProduct.description)
                    formData.append('category', this.formProduct.category)
                    formData.append('image', this.formProduct.image)
                    formData.append('date', this.date)
                    this.$store.dispatch('allProducts/ac_UpdateProduct', {
                        product: formData,
                        id: this.id
                    })
                    this.hideModal()
                } else {
                    // CREATE PRODUCT
                    const product = new FormData()
                    product.append('name', this.formProduct.name)
                    product.append('price', this.formProduct.price)
                    product.append('quantity', this.formProduct.quantity)
                    product.append('description', this.formProduct.description)
                    product.append('category', this.formProduct.category)
                    product.append('image', this.formProduct.image)
                    product.append('date', this.date)
                    this.$store.dispatch('allProducts/ac_addProduct',product)
                    this.hideModal()
                }
            },

            onFileChange(event) {
                const file = event.target.files[0]
                if (file) {
                    this.formProduct.image = file
                    this.imageUpload = URL.createObjectURL(file)
                }
            },

            ...mapActions("allCategories", {
                fetchCategories: 'ac_getCategories'
            })

        },

        mounted() {
            this.fetchCategories()
        }
    }
</script>

<style scoped>
    #selectCategory, #selectShipping {
        height: 37px;
        border-color: #dee2e6;
    }


    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        #btn-addprd {
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%, -50%) translate(0px, 10px);
        width: 90%;
    }

    }
</style>