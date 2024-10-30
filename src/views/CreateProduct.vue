<template>
    <section>
        <b-container class="p-4" fluid>
            <div class="p-4 bg-page">
                <h3><strong>Create new product</strong></h3>
                <p class="text-secondary mb-5">Remplissez les détails de votre nouveau produit ci-dessous.</p>
                <form @submit.prevent="handlForm" ref="form">
                    <b-row class="g-4">
                        <b-col cols="12">
                            <b-form-group id="input-name" label="Name:" label-for="input-1">
                                <b-form-input class="bg-transparent" v-model="formProduct.name" id="input" type="text"
                                    placeholder="Enter name product" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group id="input-category" label="Category:" label-for="selectCategory">
                                <b-form-select class="w-100" v-model="formProduct.category" id="selectCategory"
                                    :options="allcategories" required>
                                </b-form-select>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" lg="6">
                            <b-form-group id="input-price" label="Price:" label-for="input-1">
                                <b-form-input class="bg-transparent" v-model="formProduct.price" id="input"
                                    type="number" placeholder="Enter Price product" required>
                                </b-form-input>
                                <b-form-checkbox class="mt-2" id="checkbox-1" v-model="statusPricAfter"
                                    name="checkbox-1" value="accepted" unchecked-value="not_accepted"> <span
                                        class="ms-1"> Appliquer une promotion</span>
                                </b-form-checkbox>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" lg="6">
                            <b-form-group id="input-quantity" label="Quantity:" label-for="input-4">
                                <b-form-input class="bg-transparent" v-model="formProduct.quantity" id="input"
                                    type="number" placeholder="Enter Quantity product" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12" lg="12" v-if="statusPricAfter==='accepted'">
                            <b-form-group id="input-quantity" label="Price after:" label-for="input-4">
                                <b-form-input class="bg-transparent" v-model.number="formProduct.promotion.priceAfter"
                                    id="input" type="number" placeholder="Enter Price product" required>
                                </b-form-input>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Description">
                                <b-form-textarea class="bg-transparent" v-model="formProduct.description" id="input"
                                    placeholder="Auto height textarea" rows="3" required>
                                </b-form-textarea>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Shipping" class="w-100">
                                <b-form-select class="w-100" id="selectShipping" placeholder="Select a delivery option"
                                    v-model="ShippingSelected" :options="optionsShipping" required>
                                </b-form-select>
                            </b-form-group>
                        </b-col>

                        <b-col v-if="ShippingSelected==='Paid shipping'" cols="12">
                            <b-input-group size="lg" prepend="$">
                                <b-form-input type="number" class="bg-transparent h-100" v-model="shippingValue"
                                    id="input"></b-form-input>
                            </b-input-group>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Visibility" label-for="category-visibility">
                                <b-form-select id="category-visibility" v-model="formProduct.visibility"
                                    :options="visibilityOptions">
                                </b-form-select>
                            </b-form-group>
                        </b-col>

                        <b-col cols="12">

                            <b-row id="container-uploadImg" class="p-4">

                                <b-col cols="4" class="d-flex flex-column align-items-center">
                                    <svg class="w-50" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                                        aria-hidden="true">
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <b-form-group id="input-quantity" label-for="input-4">
                                        <b-form-file @change="onFileChange" class="custom-file-background" plain
                                            required></b-form-file>
                                    </b-form-group>
                                </b-col>

                                <b-col cols="8">
                                    <div class="d-flex align-items-center flex-wrap gap-3">
                                        <div id="container-img" class="w-15 position-relative"
                                            v-for="(img,index) in imageUpload" :key="img.id">
                                            <img id="imgPrd" :src="img" alt="" srcset="">
                                            <b-icon @click="removeimg(index)" variant="danger" class="position-absolute"
                                                icon="x-circle-fill" aria-hidden="true"></b-icon>
                                        </div>
                                    </div>
                                </b-col>

                            </b-row>

                        </b-col>

                        <b-col cols="12">
                            <b-button class="w-100" variant="primary" type="submit">{{ textbtnform }}</b-button>
                        </b-col>
                    </b-row>

                </form>
            </div>

        </b-container>

    </section>
</template>

<script>
    import axios from 'axios';
    import {
        mapActions,
        mapState
    } from 'vuex';

    export default {
        name: 'CreateProduct',
        data() {
            return {
                statusPricAfter: 'not_accepted',
                formProduct: {
                    admin: '',
                    category: '',
                    name: '',
                    price: '',
                    quantity: '',
                    description: '',
                    shipping: 0,
                    promotion: {
                        priceAfter: 0,
                        percentage: 0,
                    },
                    imgs: [],
                    visibility: true

                },
                imageUpload: [],
                forme: '',
                textbtnform: 'Create',
                id: '',

                // Select form
                optionsShipping: [{
                        text: 'Free shipping',
                        value: 'Free shipping'
                    },
                    {
                        text: 'Paid shipping',
                        value: 'Paid shipping'
                    },
                ],

                visibilityOptions: [{
                    text: 'Public',
                    value: true
                }, {
                    text: 'Prive',
                    value: false
                }],
                ShippingSelected: 'Free shipping',
                shippingValue: 0,

                apiUrl: process.env.VUE_APP_API_URL

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

            ...mapState('allProducts', {
                Products: state => state.Products.filter(ele => ele.delete === false)
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
            },


        },

        methods: {

            handlForm() {
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
                } else {

                    // CREATE PRODUCT
                    if (this.formProduct.category !== '' && this.formProduct.name !== '' && this.formProduct.imgs
                        .length !== 0 && this.formProduct.price !== '' && this.formProduct.quantity !== '') {


                        // value promotion
                        if (this.statusPricAfter === 'accepted') {
                            this.formProduct.promotion.percentage = Math.round(-(((this.formProduct.price - this
                                .formProduct.promotion.priceAfter) / this.formProduct.price) * 100 - 100))
                        } else if (this.statusPricAfter === 'not_accepted') {
                            this.formProduct.promotion.percentage = 0
                            this.formProduct.promotion.priceAfter = 0
                        }

                        // value shipping
                        if (this.ShippingSelected === 'Free shipping') {
                            this.formProduct.shipping = 0
                        } else if (this.ShippingSelected === 'Paid shipping') {
                            this.formProduct.shipping = this.shippingValue
                        }

                        const formData = new FormData()
                        formData.append('category', this.formProduct.category)
                        formData.append('name', this.formProduct.name)
                        formData.append('price', this.formProduct.price)
                        formData.append('quantity', this.formProduct.quantity)
                        formData.append('description', this.formProduct.description)
                        formData.append('shipping', this.formProduct.shipping)
                        formData.append('promotion', JSON.stringify(this.formProduct.promotion))
                        this.formProduct.imgs.forEach(file => {
                            formData.append('imgs', file)
                        })
                        formData.append('visibility', this.formProduct.visibility)

                        this.$store.dispatch('allProducts/ac_addProduct', formData)

                    }

                }
            },

            onFileChange(event) {
                const file = event.target.files[0]
                if (file) {
                    this.formProduct.imgs.push(file)
                    this.imageUpload.push(URL.createObjectURL(file))
                }
            },


            removeimg(index) {
                this.formProduct.imgs = this.formProduct.imgs.filter((_, i) => i !== index)
                this.imageUpload.splice(index, 1)
            },

            ...mapActions("allCategories", {
                fetchCategories: 'ac_getCategories'
            }),

            ...mapActions('allProducts', {
                fetchProducts: 'ac_getProducts'
            }),

            async getprod(id) {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`${this.apiUrl}/api/product/product/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    const product = response.data.product

                    this.formProduct.category = product.category
                    this.formProduct.name = product.name
                    this.formProduct.description = product.description
                    this.formProduct.price = product.price
                    this.formProduct.quantity = product.quantity
                    this.ShippingSelected = product.shipping === 0 ? 'Free shipping' : 'Paid shipping'
                    this.shippingValue = product.shipping
                    this.formProduct.visibility = product.visibility
                    this.imageUpload = product.imgs
                    if (product.promotion.priceAfter > 0) {
                        this.statusPricAfter = 'accepted'
                        this.formProduct.promotion.priceAfter = product.promotion.priceAfter
                    }

                } catch (error) {
                    console.log(error)
                }
            },

            resetValuesForm() {
                this.formProduct.name = '', this.formProduct.category = '', this.formProduct.price = '', this.formProduct.quantity = '', 
                this.formProduct.promotion.priceAfter = '' , this.formProduct.description = '', this.ShippingSelected='Free shipping',
                this.statusPricAfter ='not_accepted', this.formProduct.visibility = true, this.imageUpload = '', this.textbtnform='Create'
            }

        },

        watch: {
            '$route.params.id': {
                immediate: true,
                handler() {
                    this.resetValuesForm()
                },
            }
        },

        mounted() {

            //  Fetch products and categories
            this.fetchCategories()
            this.fetchProducts()

            // Get product in edit
            let id = this.$route.params.id
            if (id.length > 1) {
                this.textbtnform = 'Edit'
                this.getprod(id)
            } 
        }
    }
</script>

<style scoped>
    .bg-page {
        background-color: var(--couleur-primaire-1);
    }

    .custom-file-background .form-control {
        background-color: #f0f0f0;

    }

    .input-group-text {
        height: 100%;
        border-radius: 0px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

    }

    #container-img {
        width: 100px;
        height: 100px;

        svg {
            top: -8px;
            right: -8px;
            cursor: pointer;
        }
    }

    #imgPrd {
        width: inherit;
        object-fit: cover;
        position: relative;
    }

    .w-15 {
        width: 15%;
    }

    #container-uploadImg {
        border: 1px dashed var(--couleur-primaire-2);
    }

    #selectCategory,
    #selectShipping {
        height: 37px;
        border-color: #dee2e6;
        border-radius: 5px;
    }

    #container-page {
        border: 1px solid #313131;
    }

    #input {
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



    v::deep #__BVID__84 {
        background-color: #313131;
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