<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title>Home Compenent</v-card-title>
                <v-divider></v-divider>
                <v-card-actions class="pa-3">
                    This is the Home Component
                </v-card-actions> 
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
