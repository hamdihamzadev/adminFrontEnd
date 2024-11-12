<template>
    <section>
        <b-container class="p-4" fluid>
            <div>
                <div class="d-flex justify-content-between mt-5 flex-column flex-md-row gap-3">
                    <!----- SEARCH INPUT ----->
                    <SearchTable />
                    <!----- add prduct ----->
                    <b-button id="btn-createBlog" @click="$router.push('/createblog/1')">Create product</b-button>
                </div>

                <!----- TABLE PRODUCT ----->
                <b-table responsive striped hover :items="AllBlogs" :fields="fields" sort-icon-left :per-page="perPage"
                    :current-page="currentPage" class="mt-2" id="my-table">

                    <template #cell(Img)="image">
                        <b-img :src="image.value" alt="Responsive image" id="img-blog"></b-img>
                    </template>

                    <template #cell(Category)="category">

                        {{ category.value.name }}
                    </template>

                    <template #cell(Checked)="dataSelected">
                        <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted"
                            unchecked-value="not_accepted"
                            @change="selectBox($event,dataSelected.item,dataSelected.index)">
                        </b-form-checkbox>
                    </template>

                    <template #cell(Action)="dataAction">
                        <b-icon @click="deleteBlog(dataAction.item.id)" class="me-2 cursor" icon="trash-fill"
                            aria-hidden="true"></b-icon>
                        <b-icon @click="editBlog($router.push(`/createblog/${dataAction.item.id}`))" class="cursor"
                            icon="pencil-fill" aria-hidden="true"></b-icon>
                    </template>


                </b-table>
            </div>
        </b-container>
    </section>
</template>

<script>
    import SearchTable from '@/components/SearchTable.vue'
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'AllBlogs',
        components: {
            SearchTable
        },

        data() {
            return {
                fields: [{
                        key: 'Checked',
                        sortable: false
                    },
                    {
                        key: 'Img',
                        sortable: false,
                        tdClass: 'image-cell'
                    },

                    {
                        key: 'Title',
                        sortable: false
                    },

                    {
                        key: 'Subtitle',
                        sortable: false
                    },
                    {
                        key: 'Category',
                        sortable: false
                    },
                    {
                        key: 'Visibilty',
                        sortable: false
                    },
                    {
                        key: 'Action',
                        sortable: false
                    },

                ],
            }
        },
        computed: {


            ...mapState('blogcategories', {
                CategoriesBlogs: state => state.categories
                    .filter(ele => ele.delete === false)
                    .map(ele => ({
                        name: ele.name,
                        id: ele._id,
                        nameStore: ele.nameStore
                    }))
            }),

            AllBlogs() {
                return this.$store.state.blog.blogs
                    .filter(ele => ele.delete === false)
                    .map(ele => {
                        const category = this.CategoriesBlogs.find(ctg => ctg.id === ele.category)
                        return {
                            Img: ele.img,
                            Title: ele.title,
                            Subtitle: ele.subtitle,
                            Category: {
                                id: category ? category.id : '',
                                name: category ? category.name : ''
                            },
                            Visibilty: ele.visibilty === true ? 'Public ' : 'Prive',
                            id: ele._id,
                        }
                    })
            },

        },

        methods: {

            ...mapActions("blog", {
                fetchBlogs: 'ac_getBlogs'
            }),

            ...mapActions("blogcategories", {
                fetchCategoriesBlogs: 'ac_getCategories'
            })

        },

        mounted() {
            this.fetchCategoriesBlogs()
            this.fetchBlogs()

        }
    }
</script>


<style scoped>
    #btn-createBlog {
        background-color: var(--couleur-primaire-4);
        border: none;
    }

    #img-blog {
        width: 80px;
        height: 80px
    }

    .cursor {
        cursor: pointer;
    }

    /* Style for phone (less than de 767.98px) */
    @media (max-width: 767.98px) {
        #btn-createBlog {
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%, -50%) translate(0px, 10px);
            width: 90%;
            padding: 10px;
        }
    }
</style>