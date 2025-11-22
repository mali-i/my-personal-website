import {defineStore} from 'pinia'
import {reactive, ref, watch} from 'vue'

export const useSvgsStore = defineStore('svgs',() => {

    const svgs = reactive({})
    const selectedDate = ref(new Date().toISOString().split('T')[0]) // 用于存储当前选中的日期
    const isLoaded = ref(false) // 添加加载状态标志
    
    // 从 public/data.json 加载数据
    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                svgs[key] = data[key]
            })
            isLoaded.value = true // 数据加载完成
        })
        .catch(error => {
            console.error('Failed to load data.json:', error)
            isLoaded.value = true // 即使失败也标记为已加载
        })

    const saveSvgs = (newVal)=>{
        console.log('save svgs to localStorage')
        window.localStorage.setItem('svgs',JSON.stringify(newVal))
    }

    watch(svgs,(newVal) => {
        console.log('svgs changed')
        window.localStorage.setItem('svgs',JSON.stringify(newVal))
    },{deep:true})

    return {
        svgs, saveSvgs, selectedDate, isLoaded
    }
})