import {defineStore} from 'pinia'
import {reactive, ref, watch} from 'vue'

export const useSvgsStore = defineStore('svgs',() => {

    const svgs = reactive(JSON.parse(window.localStorage.getItem('svgs')) || {})
    const selectedDate = ref(new Date().toISOString().split('T')[0]) // 用于存储当前选中的日期

    const saveSvgs = (newVal)=>{
        console.log('save svgs to localStorage')
        window.localStorage.setItem('svgs',JSON.stringify(newVal))
    }

    watch(svgs,(newVal) => {
        console.log('svgs changed')
        window.localStorage.setItem('svgs',JSON.stringify(newVal))
    },{deep:true})

    return {
        svgs, saveSvgs, selectedDate
    }
})