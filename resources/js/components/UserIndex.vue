<template>
<v-layout justify-center>
    <v-flex xs12>
         <v-toolbar flat color="red">
            <v-toolbar-title>User List</v-toolbar-title>
            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
                <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout>
                            <v-flex>
                                <v-text-field v-model="editedItem.name" label="User Name" :error-messages="editedItem.errors.has('name') && editedItem.errors.errors.name || []"></v-text-field>
                            </v-flex>
                        </v-layout>
                            <v-layout>
                                <v-flex>
                                    <v-text-field v-model="editedItem.email" label="E-mail" :error-messages="editedItem.errors.has('email') && editedItem.errors.errors.email || []"></v-text-field>
                            </v-flex>
                        </v-layout>
                        <div v-if="editedIndex == -1">
                            <v-layout>
                                <v-flex>
                                    <v-text-field v-model="editedItem.password" label="Password" type="password" :error-messages="editedItem.errors.has('password') && editedItem.errors.errors.password || []"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex>
                                    <v-text-field v-model="editedItem.password_confirmation" label="Verify Password" type="password"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </div>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn ripple color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn ripple color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="users"
                :loading="loading"
                :search="search"
                class="elevation-1"
            >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.created_at | moment('MMMM d, YYYY') }}</td>
                <td class="justify-center">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>
        </v-data-table>
    </v-flex>
</v-layout>
</template>

<script>
export default {
    mounted() {
        this.fetchUserData().then(data => {
        this.users = data;
        });
    },
    data() {
        return {
            loading: true,
            users: [],
            headers: [
                { text: "User Name", value: "name" },
                { text: "User Email", value: "email" },
                { text: "Date Registered", value: "created_at"},
                { text: "Actions", value: "name", sortable:false }
            ],
            search: "",
            dialog:false,
            editedIndex: -1,
            editedItem: new Form({
                name: '',
                email: '',
                password: '',
                password_confirmation:''
            }),
            defaultItem: {
                name: '',
                email: '',
                password: '',
                password_confirmation:''
            }
        }
    },
     computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
    },
  methods: {
    fetchUserData() {
      return new Promise((resolve, reject) => {
          this.loading = true;
            $.get("api/users")
            .then(data => {
                console.log(data)
                let datas = data;
                setTimeout(() => {
                this.loading = false;
                resolve(data);
                }, 1000);
            })
      });
    },
    close () {
        this.dialog = false
        setTimeout(() => {
            this.editedItem = new Form({
                name: '',
                email: '',
                password: '',
                password: '',
                password_confirmation: '',
            })
          this.editedIndex = -1
        }, 300)
    },
    editItem (item) {
        this.editedItem = new Form({
            name: '',
            email: ''
        })
        console.log(this.ed)
        this.editedIndex = this.users.indexOf(item)
        this.editedItem.name = item.name
        this.editedItem.email = item.email
        this.dialog = true
    },
    save () {
        if (this.editedIndex > -1) {
            this.editedItem.put("api/users/"+this.users[this.editedIndex].id, {
                // _method: 'PATCH',
                name: this.editedItem.name,
                email: this.editedItem.email,
            })
            .then(()=> {
                this.$swal({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 2000,

                    type: 'success',
                    title: 'User Updated Successfully!'
                })
                console.log(this.editedItem)
                this.close()
                this.fetchUserData().then(data => {
                    this.users = data;
                });
            })
        } else {
            this.editedItem.post("api/users", {
                name: this.editedItem.name,
                email: this.editedItem.email,
                password: this.editedItem.password,
                password_confirmation: this.editItem.password_confirmation
            })
            .then(()=> {
                this.$swal({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 2000,

                    type: 'success',
                    title: 'User Added Successfully!'
                })
                console.log(this.editedItem)
                this.close()
                this.fetchUserData().then(data => {
                    this.users = data;
                });
            })
        }
    },
    deleteItem (item) {
        const index = this.users.indexOf(item)
        const user = this.users[index]
        console.log(user.id)
        this.$swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                this.editedItem.delete("api/users/"+user.id, { 
                // _method:'DELETE' 
                })
                .then(() => {
                    this.$swal({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 2000,

                        type: 'success',
                        title: 'User Deleted Successfully!'
                    })
                    this.fetchUserData().then(data => {
                        this.users = data;
                    })
                })
            }
        })
    },
  }
};
</script>
