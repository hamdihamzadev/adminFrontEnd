<template>
    <section  class="pt-5" >
        <b-container>
            <div class="text-center mb-5" >
                <p class="fs-1 fw-bold">Registration confirmation</p>
            <p>Please enter the confirmation code we sent you by email.</p>
            </div>

            <b-form class="d-flex flex-column align-items-center gap-5" >
                <div class="d-flex gap-2 justify-content-center px-5 ">
                    <b-form-input class="bg-transparent text-center fs-5" 
                v-for="(inp,index) in 6" 
                @input="focusNext(index)"
                maxlength="1"
                :key="inp.id"
                style="height: 60px; width: 60px;"  
                id="input" 
                type="text"   
                :ref="`input${index}`"
                required>
                </b-form-input>
                </div>
                
                <b-button id="btn" class="w-25">Confirm</b-button>
            </b-form>


        </b-container>
    </section>
</template>

<script>
    export default {
        name: 'RegistrationConfirmation',
        methods:{
            focusNext(index){
                // if value ==> 
               
                const currentInput=this.$refs[`input${index}`][0].$el.value
                if(currentInput!==''){
                    this.$refs[`input${index+1}`][0]
                }

            }
        }
    }
</script>

<style lang="scss"  scoped>
#input{
    border: 1px solid rgb(124, 124, 124);
    color: white;
    &:focus{
        border-color: white;
        box-shadow: none;
    }
}

#btn{
    background-color: var(--couleur-primaire-4);
    border: none;
}
</style>