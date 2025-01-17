<template>
    <section>

        <b-container class="p-4" fluid>

            <div class="p-4 bg-page">
                <h3>
                    <strong >Create new product</strong>
                </h3>
                <p class="text-secondary mb-5">Remplissez les détails de votre nouveau produit ci-dessous.</p>
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
   
                <form @submit.prevent="handlForm" ref="form">
                    <b-row class="g-4">
                        <b-col cols="12">
                            <b-form-group id="input-name" label="Name:" label-for="input-1" v-if="isLoading===false">
                                <b-form-input class="bg-transparent" v-model="formProduct.name" id="input" type="text"
                                    placeholder="Enter name product" required>
                                </b-form-input>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group id="input-category" label="Category:" label-for="selectCategory"
                                v-if="isLoading===false">
                                <b-form-select class="w-100" v-model="formProduct.category" id="selectCategory"
                                    :options="allcategories" required>
                                </b-form-select>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12" lg="6">
                            <b-form-group id="input-price" label="Price:" label-for="input-1" v-if="isLoading===false">
                                <b-form-input class="bg-transparent" v-model="formProduct.price" id="input"
                                    type="number" placeholder="Enter Price product" required>
                                </b-form-input>

                                <b-form-checkbox class="mt-2" id="checkbox-1" v-model="statusPricAfter"
                                    name="checkbox-1" value="accepted" unchecked-value="not_accepted"
                                    v-if="isLoading===false"> <span class="ms-1"> Appliquer une promotion</span>
                                </b-form-checkbox>

                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>

                        </b-col>

                        <b-col cols="12" lg="6">
                            <b-form-group id="input-quantity" label="Quantity:" label-for="input-4"
                                v-if="isLoading===false">
                                <b-form-input class="bg-transparent" v-model="formProduct.quantity" id="input"
                                    type="number" placeholder="Enter Quantity product" required>
                                </b-form-input>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12" lg="12" v-if="statusPricAfter==='accepted'">
                            <b-form-group id="input-quantity" label="Price after:" label-for="input-4"
                                v-if="isLoading===false">
                                <b-form-input class="bg-transparent" v-model.number="formProduct.promotion.priceAfter"
                                    id="input" type="number" placeholder="Enter Price product" required>
                                </b-form-input>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Description">
                                <b-form-textarea class="bg-transparent" v-model="formProduct.description" id="input"
                                    placeholder="Auto height textarea" rows="3" v-if="isLoading===false" required>
                                </b-form-textarea>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Shipping" class="w-100">
                                <b-form-select class="w-100" id="selectShipping" placeholder="Select a delivery option"
                                    v-model="ShippingSelected" :options="optionsShipping" v-if="isLoading===false"
                                    required>
                                </b-form-select>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col v-if="ShippingSelected==='Paid shipping'" cols="12">
                            <b-input-group size="lg" prepend="$" v-if="isLoading===false">
                                <b-form-input type="number" class="bg-transparent h-100" v-model="shippingValue"
                                    id="input"></b-form-input>
                            </b-input-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Visibility" label-for="category-visibility" v-if="isLoading===false">
                                <b-form-select id="category-visibility" v-model="formProduct.visibility"
                                    :options="visibilityOptions">
                                </b-form-select>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12">

                            <b-row id="container-uploadImg" class="p-4" v-if="isLoading===false">

                                <b-col cols="4" class="d-flex flex-column align-items-center">
                                    <svg class="w-50" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                                        aria-hidden="true">
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <b-form-group id="input-quantity" label-for="input-4">
                                        <b-form-file @change="onFileChange" class="custom-file-background" plain
                                            :required="requiredFile">
                                        </b-form-file>
                                    </b-form-group>
                                </b-col>

                                <!-- Show images product -->
                                <b-col cols="8">
                                    <div class="d-flex align-items-center flex-wrap gap-3">
                                        <div id="container-img" class="w-15 position-relative"
                                            v-for="(img,index) in imageUpload" :key="img.id">
                                            <img id="imgPrd" :src="img" alt="" srcset="">
                                            <b-icon @click="removeimg(index)" variant="danger" class="position-absolute"
                                                icon="x-circle-fill" aria-hidden="true">
                                            </b-icon>
                                        </div>
                                    </div>
                                </b-col>

                            </b-row>
                            <b-skeleton-img no-aspect height="150px" v-show="isLoading"></b-skeleton-img>
                        </b-col>

                        <b-col cols="12">
                            <b-button class="w-100" variant="primary" type="submit" v-if="isLoading===false">
                                {{ textbtnform }}</b-button>
                            <b-skeleton width="100%" type="button" v-show="isLoading"></b-skeleton>
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
                isLoading: true,
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

                apiUrl: process.env.VUE_APP_API_URL,

                dismissSecs: 2,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                textAlert:'Product is created with success'

            }
        },

        computed: {

            ...mapState('allCategories', {
                allcategories: state => state.categories
                .filter(ele=>ele.delete===false)
                .map(ele => {
                    const obj = new Object
                    obj.text = ele.name
                    obj.value = ele._id
                    return obj
                })
            }),

            ...mapState('allProducts', {
                Products: state => state.Products.filter(ele => ele.delete === false)
            }),


            requiredFile() {
                return this.textbtnform === 'Edit' ? false : true
            }

        },

        methods: {


            showAlert() {
              this.showDismissibleAlert=true
              this.dismissCountDown = this.dismissSecs
            },

            handlForm() {
                if (this.textbtnform === 'Edit') {

                    if (this.formProduct.category && this.formProduct.name && this.formProduct.price &&
                        this.formProduct.quantity && this.formProduct.imgs.length > 0) {

                        const formData = new FormData();
                        if (this.statusPricAfter === 'accepted') {
                            this.formProduct.promotion.percentage = Math.round(100 - (this.formProduct.promotion
                                .priceAfter / this.formProduct.price) * 100);
                        } else {
                            this.formProduct.promotion.priceAfter = 0;
                            this.formProduct.promotion.percentage = 0;
                        }

                        this.formProduct.shipping = (this.ShippingSelected === 'Free shipping') ? 0 : this.shippingValue;
                        formData.append('category', this.formProduct.category);
                        formData.append('name', this.formProduct.name);
                        formData.append('price', this.formProduct.price);
                        formData.append('quantity', this.formProduct.quantity);
                        formData.append('description', this.formProduct.description);
                        formData.append('shipping', this.formProduct.shipping);
                        formData.append('promotion', JSON.stringify(this.formProduct.promotion));
                        formData.append('visibility', this.formProduct.visibility);
                        this.formProduct.imgs.forEach(file => formData.append('imgs', file))

                        this.$store.dispatch('allProducts/ac_UpdateProduct', {
                            product: formData,
                            id: this.$route.params.id
                        })

                        // alert success
                        this.textAlert='Product is edit with success'
                        this.showAlert()
                         

                    }

                } else {
                    // CREATE PRODUCT
                    if (this.formProduct.category && this.formProduct.name && this.formProduct.price &&
                        this.formProduct.quantity && this.formProduct.imgs.length > 0) {

                        const formData = new FormData();
                        if (this.statusPricAfter === 'accepted') {
                            this.formProduct.promotion.percentage = Math.round(100 - (this.formProduct.promotion
                                .priceAfter / this.formProduct.price) * 100);
                        } else {
                            this.formProduct.promotion.priceAfter = 0;
                            this.formProduct.promotion.percentage = 0;
                        }

                        this.formProduct.shipping = (this.ShippingSelected === 'Free shipping') ? 0 : this.shippingValue;
                        const nameStore=localStorage.getItem('nameStore')

                        formData.append('category', this.formProduct.category);
                        formData.append('nameStore', nameStore)
                        formData.append('name', this.formProduct.name);
                        formData.append('price', this.formProduct.price);
                        formData.append('quantity', this.formProduct.quantity);
                        formData.append('description', this.formProduct.description);
                        formData.append('shipping', this.formProduct.shipping);
                        formData.append('promotion', JSON.stringify(this.formProduct.promotion));
                        formData.append('visibility', this.formProduct.visibility);
                        this.formProduct.imgs.forEach(file => formData.append('imgs', file))

                        this.$store.dispatch('allProducts/ac_addProduct', formData)

                        // toast success
                        this.textAlert='Product is created with success'
                        this.showAlert()

                    }

                }
            },

            onFileChange(event) {

                const file = event.target.files[0];
                if (!Array.isArray(this.imageUpload)) {
                    this.imageUpload = []
                }

                if (file) {
                    this.formProduct.imgs.push(file);
                    this.imageUpload.push(URL.createObjectURL(file));
                }
            },

            removeimg(index) {
                this.formProduct.imgs = this.formProduct.imgs.filter((_, i) => i !== index)
                this.imageUpload.splice(index, 1)
            },

            async getprod(id) {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`${this.apiUrl}/api/product/product/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    const product = response.data.product
                    setTimeout(() => {
                        this.formProduct.category = product.category
                        this.formProduct.name = product.name
                        this.formProduct.description = product.description
                        this.formProduct.price = product.price
                        this.formProduct.quantity = product.quantity
                        this.ShippingSelected = product.shipping === 0 ? 'Free shipping' : 'Paid shipping'
                        this.shippingValue = product.shipping
                        this.formProduct.visibility = product.visibility
                        this.imageUpload = product.imgs
                        this.convertImageUrlToFile()
                        if (product.promotion) {
                            if (product.promotion.priceAfter !== 0) {
                                this.statusPricAfter = 'accepted'
                                this.formProduct.promotion.priceAfter = product.promotion.priceAfter
                            } else {
                                this.statusPricAfter = 'not_accepted'
                            }
                        }
                        this.isLoading = false
                    }, 1000)

                } catch (error) {
                    console.log(error)
                }
            },

            async convertImageUrlToFile() {

                for (const url in this.imageUpload) {
                    const response = await fetch(this.imageUpload[url])
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération de l\'image');
                    }

                    const blob = await response.blob()
                    const file = new File([blob], this.imageUpload[url].split('.')[1], {
                        type: blob.type
                    });
                    this.formProduct.imgs.push(file)

                }

            },

            resetValuesForm() {
                this.formProduct.name = '', this.formProduct.category = '', this.formProduct.price = '', this.formProduct.quantity = '',
                this.formProduct.promotion.priceAfter = '', this.formProduct.description = '', this.ShippingSelected = 'Free shipping',
                this.statusPricAfter = 'not_accepted', this.formProduct.visibility = true, this.imageUpload = '', this.textbtnform = 'Create'
            },

            ...mapActions("allCategories", {
                fetchCategories: 'ac_getCategories'
            }),

            ...mapActions('allProducts', {
                fetchProducts: 'ac_getProducts'
            }),
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
            } else if (id === '1') {
                this.isLoading = false
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


     .alert .close{
        height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #a6a4a4;
    border-radius: 4px;
    }

    #alert{
        right: 20px;
    }



    v::deep #__BVID__84 {
        background-color: #313131;
    }

    .fullscreen-spinner {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 9999;
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