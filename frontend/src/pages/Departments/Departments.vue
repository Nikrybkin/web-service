<template>
    <div class="container">
        <div class="btns" style="display: flex;">
            <q-btn @click='createDepartment()' label='Создать'/>
            <q-input label='Название' style="margin-left: 20px; width: 200px; height: 30px" filled dense v-model="department.Name"/>
            <q-input label='Количество работников' style="margin-left: 20px; width: 200px; height: 30px" type="number" filled dense v-model="department.NumberWorkers"/>
            <div style="margin-left: auto">
                    <q-btn @click="changeDepartment()" color="orange" label='Изменить'/>
                    <q-btn style="margin-left: 20px" @click="deleteDepartment()" color="red" label='Удалить'/>
            </div>
        </div>
        <q-table
        class="table"
        :columns='columns'
        :data='departments'
        virtual-scroll
        :rows-per-page-options="[0]"
        row-key="DepartmentID"
        selection="multiple"
        :selected-rows-label='getSelectedString'
        :selected.sync="selected"
        >
            <template v-slot:body-cell='props'>
                <q-td :selected='selected' :props='props'>
                    {{props.value}}
                </q-td>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import axios from 'axios';


@Component({
    components: {

    },
})
export default class Departments extends Vue {
    departments: {}[] = []
    department: { Name: string, NumberWorkers: number} = { Name: '', NumberWorkers: null}
    selected: {DepartmentID: number}[] = [];
    columns = [
        {
            name: 'DepartmentID',
            label: 'DepartmentID',
            field: 'DepartmentID',
            required: true,
            align: 'left',
        },
        {
            name: 'Name',
            label: 'Name',
            field: 'Name',
            required: true,
            align: 'left',
        },
        {
            name: 'NumberWorkers',
            label: 'NumberWorkers',
            field: 'NumberWorkers',
            required: true,
            align: 'left',
        },
    ]


    async getDepartments() {
        const response = await axios.get('http://localhost:8080/api/departments/')
        this.departments = response.data
    }

    async createDepartment() {
        const response = await axios.post('http://localhost:8080/api/departments/', this.department)
        if (response) {
            this.getDepartments()
            this.department = {
                Name: '',
                NumberWorkers: 0
            }
        }
    }

    async deleteDepartment() {
        const response = await axios.delete(`http://localhost:8080/api/departments/${this.selected[0].DepartmentID}`)
        if (response) {
            this.getDepartments()
            this.selected = []
        }
    }

    async changeDepartment() {
        const obj = {
            DepartmentID: this.selected[0].DepartmentID,
            Name: this.department.Name,
            NumberWorkers: this.department.NumberWorkers,
        }
        const response = await axios.put(`http://localhost:8080/api/departments/${this.selected[0].DepartmentID}`, obj)
        if (response) {
            console.log(response.data);
            this.getDepartments()
            this.selected = []
        }
    }

    mounted() {
        this.getDepartments()
    }

    getSelectedString() {
        return this.selected.length === 0 ? 'ничего не выбрано' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''}`
    }
}
</script>

<style lang="scss">
.container {
    margin: 20px;
}

.table {
    height: auto;
    max-height: calc(100vh - 146px);
}

.btns {
    margin-bottom: 20px;
}
</style>