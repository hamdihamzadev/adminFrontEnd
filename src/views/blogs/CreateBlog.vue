<template>
    <section>
        <b-container class="p-4" fluid>
            <div class="p-4 border-page">
                <h3><strong>Create new blog</strong></h3>
                <p class="text-secondary mb-5">Fill in the details of your new product below.</p>
                <b-alert id="alert" class="position-absolute bottom-0 d-flex align-items-center gap-3"
                    :show="dismissCountDown" dismissible variant="success" @dismissed="dismissCountDown=0"
                    @dismiss-count-down="dismissSecs">
                    <p class="mb-0"><strong>{{ textAlert }}</strong></p>
                </b-alert>

                <form @submit.prevent="handlForm" ref="form">
                    <b-row class="g-4">
                        <b-col>
                            <b-form-group id="input-name" label="Title:" label-for="input-1" v-if="isLoading===false">
                                <b-form-input class="bg-transparent" v-model="formBlog.title" id="input" type="text"
                                    placeholder="Enter name product" required>
                                </b-form-input>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col>
                            <b-form-group id="input-name" label="Subtitle:" label-for="input-1"
                                v-if="isLoading===false">
                                <b-form-input class="bg-transparent" v-model="formBlog.subtitle" id="input" type="text"
                                    placeholder="Enter name product" required>
                                </b-form-input>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Description" v-if="isLoading===false">
                                <b-form-textarea class="bg-transparent" v-model="formBlog.description" id="input"
                                    placeholder="Auto height textarea" rows="3" required>
                                </b-form-textarea>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group id="input-category" label="Category:" label-for="selectCategory"
                                v-if="isLoading===false">
                                <b-form-select class="w-100 rounded" style="height: 40px" v-model="formBlog.category"
                                    id="selectCategory" :options="categories" required>
                                </b-form-select>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12" lg="12" v-if="statusPricAfter==='accepted'">
                            <b-form-group id="input-quantity" label="Price after:" label-for="input-4"
                                v-if="isLoading===false">
                                <b-form-input class="bg-transparent" v-model.number="formBlog.promotion.priceAfter"
                                    id="input" type="number" placeholder="Enter Price product" required>
                                </b-form-input>
                            </b-form-group>
                            <b-skeleton width="100%" type="input" v-show="isLoading"></b-skeleton>
                        </b-col>

                        <b-col cols="12">
                            <b-form-group label="Visibility" label-for="category-visibility" v-if="isLoading===false">
                                <b-form-select id="category-visibility" v-model="formBlog.visibilty"
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
                                        <b-form-file name="img" @change="onFileChange" class="custom-file-background"
                                            plain :required="requiredFile">
                                        </b-form-file>
                                    </b-form-group>
                                </b-col>

                                <!-- Show images product -->
                                <b-col cols="8">
                                    <img id="imgPrd" class="w-25" :src="imgShow" alt="" srcset="">
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
    import {
        mapState,
        mapActions
    } from 'vuex';


    export default {
        name: 'CreateBlog',

        data() {
            return {
                isLoading: false,
                formBlog: {
                    title: 'hamza',
                    subtitle: 'hamdi',
                    description: 'hello',
                    img: '',
                    category: '',
                    visibilty: true
                },

                visibilityOptions: [{
                    text: 'Public',
                    value: true
                }, {
                    text: 'Prive',
                    value: false
                }],

                textbtnform: 'Create',
                imgShow: '',

            }
        },

        computed: {
            ...mapState('blogcategories', {
                categories: state => state.categories
                    .filter(ele => ele.delete === false)
                    .map(ele => {
                        const obj = new Object
                        obj.text = ele.name
                        obj.value = ele._id
                        return obj
                    })
            }),
        },

        methods: {

            onFileChange(event) {
                const file = event.target.files[0]
                if (file) {
                    this.formBlog.img = file
                    this.imgShow = URL.createObjectURL(file)
                }
            },

            handlForm() {
                if (this.textbtnform === 'Create') {

                    const formBlog = new FormData()
                    const nameStore = localStorage.getItem('nameStore')

                    formBlog.append('nameStore', nameStore)
                    formBlog.append('title', this.formBlog.title)
                    formBlog.append('subtitle', this.formBlog.subtitle)
                    formBlog.append('description', this.formBlog.description)
                    if (this.formBlog.img) {
                        formBlog.append('img', this.formBlog.img);
                    }
                    formBlog.append('category', this.formBlog.category)
                    formBlog.append('visibilty', this.formBlog.visibilty)

                    this.$store.dispatch('blog/ac_addBlog', formBlog)
                }
            },

            ...mapActions("blogcategories", {
                fetchCategories: 'ac_getCategories'
            })

        },

        mounted() {
            this.fetchCategories()
        }
    }
</script>

<style scoped>
    .border-page {
        border: 1px solid var(--couleur-primaire-2);
        border-radius: 8px
    }
</style>