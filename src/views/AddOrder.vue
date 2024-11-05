<template>
    <section>
        <b-container class="p-4" fluid>
            <div class="p-4 bg-page">
                <h3><strong>Create new product</strong></h3>
                <p class="text-secondary mb-5">Remplissez les détails de votre nouveau produit ci-dessous.</p>
                <p>{{TotalOneArticle }}</p>
                <b-row>
                    <b-col cols="7">
                        <form id="form">
                            <b-row class="gap-4">

                                <b-col cols="12">
                                    <b-form-group class="col-12 mb-4" id="select-product" label="Customers:"
                                        label-for="selectCategory">
                                        <b-form-select v-model="customerSelected" class="w-100" id="select-product"
                                            :options="Allcustomers" required>
                                        </b-form-select>
                                    </b-form-group>
                                </b-col>

                                <b-col cols="12" class="mb-4">

                                    <b-form-group id="select-product" label="Product:" label-for="selectCategory">
                                        <b-dropdown id="select-product" text="Select a product" menu-class="w-100"
                                            class="w-100">
                                            <b-dropdown-item @click="onProductChange(product.value,product.text)"
                                                v-for="product in allProducts" :key="product.value.id">
                                                <div class="d-flex align-items-center gap-4  border  rounded p-2">
                                                    <img :src="product.text.image" alt="" class="img-thumbnail mr-2"
                                                        style="width: 50px; height: auto;">
                                                    {{ product.text.name }}
                                                </div>
                                            </b-dropdown-item>
                                        </b-dropdown>
                                    </b-form-group>
                                </b-col>

                                <!-- SHOW PRODUCT SELECTED -->

                                <b-col cols="12">
                                    <div class="d-flex align-items-center gap-4  border  rounded ">
                                        <img :src="productSelected.text.image" alt="" class="img-thumbnail mr-2"
                                            style="width: 50px; height: auto;">
                                        {{ productSelected.text.name }}
                                    </div>
                                </b-col>

                                <b-col>
                                    <b-form-group class="w-100" id="input-price" label="Price :" label-for="input-1">
                                        <b-form-input class="bg-transparent" v-model="productSelected.value.price" id="input" type="number"
                                            placeholder="Enter price product" disabled required>
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>

                                <b-col>
                                    <b-form-group class="w-100" label="Quantity :" label-for="input-1">
                                        <b-form-spinbutton class="bg-transparent"  id="input" v-model="quantityOneArticle" min="1"
                                            :max="productSelected.value.quantity" style="height: 37px;">
                                        </b-form-spinbutton>
                                    </b-form-group>
                                </b-col>

                                <b-col>
                                    <b-form-group class="col-12 mb-4" id="input-price" label="Total:"
                                        label-for="input-1">
                                        <b-form-input v-model="TotalOneArticle" id="input" type="number"
                                            placeholder="Total order" required>
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>

                                <b-col cols="12">
                                    <b-button class="w-100" @click="addProduct">Add product</b-button>
                                </b-col>

                                <!-- inforamtion delivery -->
                                <b-col cols="12">
                                    <b-form-group id="input-quantity" label="Contry :" label-for="input-4">
                                        <b-form-input class="bg-transparent" id="input" type="text"
                                            placeholder="Enter Quantity product" required>
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>

                                <b-col cols="12">
                                    <b-form-group id="input-quantity" label="Adress :" label-for="input-4">
                                        <b-form-input class="bg-transparent" id="input" type="text"
                                            placeholder="Enter Quantity product" required>
                                        </b-form-input>
                                    </b-form-group>
                                </b-col>

                                <b-col cols="12">
                                    <b-form-group id="input-quantity" label="Notes :" label-for="input-4">
                                        <b-form-textarea id="input" v-model="text" placeholder="Enter something..."
                                            rows="3" max-rows="6">
                                        </b-form-textarea>
                                    </b-form-group>
                                </b-col>

                            </b-row>

                            <p v-show="stockout" class="text-danger text-center">Stock out</p>

                        </form>
                    </b-col>
                    

                    <!-- TABLE  -->
                    <b-col cols="5">
                        <div class="bg-white text-black p-3 rounded h-100">
                            <h5 class="mb-5"><strong>Order Summary</strong></h5>
                            <div v-for="item in itemsProducts" :key="item.id"
                                class="d-flex align-items-center justify-content-between mb-3">
                                <!-- Products -->
                                <div class="d-flex align-items-center gap-1">
                                    <img class="border" style="width: 40px; height: auto;" :src="item.productImg"
                                        alt="">
                                    <div>
                                        <p class="mb-0 small"><strong>{{ item.productName }}</strong></p>
                                        <p class="mb-0 small">Shipping</p>
                                    </div>
                                </div>
                                <div>
                                    <p class="mb-0 small"><strong>{{ item.productTotal }} $</strong></p>
                                    <p class="mb-0 small">{{ item.productShipping }} $</p>
                                </div>
                            </div>
                            <!-- Total -->
                            <div class="d-flex justify-content-between mt-5 border-top pt-4">
                                <p><strong>Total</strong></p>
                                <p><strong>{{ totalOrder }} $</strong></p>
                            </div>
                            <b-button variant="success" class="w-100 mt-3">Add order</b-button>
                        </div>
                    </b-col>
                </b-row>
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
        name: 'AddOrder',
        data() {
            return {
                productSelected: {
                    value: {
                        price: 0,
                        quantity: 0,
                        shipping: 0,
                        id: ''
                    },
                    text: {
                        name: 'Product',
                        image: 'https://img.icons8.com/ios/50/product--v1.png'
                    }
                },

                quantityOneArticle: 1,
                orderItem: [],
                customerSelected: '',
                itemsProducts: [],
                apiUrl: process.env.VUE_APP_API_URL,
            }
        },

        computed: {

            ...mapState('allCustomers', {
                Allcustomers: state => state.customers
                    .filter(customer => customer.delete === false && customer.block === false)
                    .map(ele => {
                        let obj = new Object
                        obj.text = `${ele.firstName} ${ele.lastName} - ${ele.email}`
                        obj.value = ele._id
                        return obj
                    })
            }),


            ...mapState('allProducts', {
                allProducts: state => state.Products
                    .filter(ele => ele.delete === false && ele.visibility === true)
                    .map(ele => {
                        const obj = new Object

                        obj.text = {
                            name: ele.name,
                            image: ele.imgs[0]
                        }

                        obj.value = {
                            price: ele.price,
                            quantity: ele.quantity,
                            shipping: ele.shipping,
                            id: ele._id
                        }

                        return obj
                    })
            }),

            TotalOneArticle() {
                const total = this.productSelected.value.price * this.quantityOneArticle
                return total
            },

            totalOrder() {
                const total = this.itemsProducts.reduce((accu, ele) => accu + ele.productTotal + ele.productShipping, 0)
                return total
            },

            stockout(){
              return  this.productSelected.value.quantity ===0 ? true : 0
        
            },

            // Calc quantity product after enter order
            quantity() {
                const quantityProduct = this.ProductSelected.quantity - this.Quantity
                return quantityProduct
            },


        },

        methods: {

            onProductChange(value, text) {
                this.productSelected.text = text
                this.productSelected.value = value
            },

            addProduct() {
                console.log(this.TotalOneArticle)
                this.itemsProducts.push({
                    productId: this.productSelected.value.id,
                    productName: this.productSelected.text.name,
                    productImg: this.productSelected.text.image,
                    productPrice: this.productSelected.value.price,
                    productQuantity: this.productSelected.value.quantity,
                    productTotal: this.TotalOneArticle,
                    productShipping: this.productSelected.value.shipping,
                })
            },


            async editQuantity() {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.put(
                        `${this.apiUrl}/api/productQuantity/${this.formOrder.product}`, {
                            quantity: this.quantity
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                    console.log(response.data.message)
                } catch (error) {
                    console.log(`error the update is  : ${error}`)
                }
            },

            async sendConversionStatusOrders() {
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.post(`${this.apiUrl}/api/order/conversion`, {
                        status: 'New',
                        date: this.caclDate
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log(response.data.message)

                } catch (error) {
                    console.log(`error the conversion status order is ${error}`)
                }
            },

            // validat form
            valideForm() {
                this.customerSelected === '' ? this.error.customer = true : this.error.customer = false
                this.ProductSelected === '' ? this.error.product = true : this.error.product = false
            },

            // Reset values 
            RestValues() {
                this.customerSelected = ''
                this.ProductSelecte = ''
                this.ProductSelected.price = ''
                this.ProductSelectedText = ''
                this.Quantity = 1

            },
            ...mapActions('allProducts', {
                fetchProducts: 'ac_getProducts'
            }),

            ...mapActions('allCustomers', {
                fetchCustomers: 'ac_getCustomers'
            }),


        },

        mounted() {
            this.fetchCustomers()
            this.fetchProducts()
        }
    }
</script>

<style scoped>
    .bg-page {
        background-color: var(--couleur-primaire-1);
    }

    #btn-addorder {
        background-color: var(--couleur-primaire-4);
    }

    #select-product {
        height: 37px;
        border-radius: 0.375rem;
    }

    #sb-quantity {
        height: 37px;
        border-radius: 0.375rem;
    }

    #form {
        background-color: var(--couleur-primaire-1);
        border-radius: 12px;
    }

    #select-product__BV_toggle_ {
        width: 100%;
    }






    
</style>