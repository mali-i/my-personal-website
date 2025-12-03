<script setup>
import { onMounted, ref, computed, watch, nextTick } from 'vue';
import { useSvgsStore } from '../stores/svgs';

var store = useSvgsStore();

const selectedDate = computed(() => {
    return store.selectedDate;
});

var nodes = ref([]);
var cconnections = ref([]);
const menuStyle = ref({});
const menuVisible = ref(false);
let menuNode = null; // 右键菜单当前操作的节点

// 监听 store.isLoaded 的变化，处理异步数据加载
watch(() => store.isLoaded, (loaded) => {
    if (loaded) {
        const dates = Object.keys(store.svgs);
        if (dates.length > 0) {
            const latestDate = dates.sort((a, b) => new Date(b) - new Date(a))[0];
            // 即使日期一样，也要确保数据被加载（因为之前可能因为没数据而为空）
            if (store.selectedDate !== latestDate) {
                store.selectedDate = latestDate;
            } else {
                // 如果日期没变，手动触发数据更新
                const date = store.selectedDate;
                nodes.value = store.svgs[date]?.nodes || [];
                cconnections.value = store.svgs[date]?.connections || [];
                nextTick(() => {
                    updateNodes();
                    updateConnections();
                    setTimeout(fitContent, 100);
                });
            }
        }
    }
}, { immediate: true });

// 缩放和平移状态
const transform = ref({ x: 0, y: 0, k: 1 });
const isPanning = ref(false);
const panStart = { x: 0, y: 0 };

// 更新变换
const updateTransform = () => {
    const vp = document.getElementById("viewport");
    if (vp) {
        vp.setAttribute("transform", `translate(${transform.value.x}, ${transform.value.y}) scale(${transform.value.k})`);
    }
}

// 滚轮缩放
const handleWheel = (e) => {
    e.preventDefault();
    const svg = document.getElementById("svg-tree");
    const rect = svg.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const zoomIntensity = 0.1;
    const delta = e.deltaY < 0 ? (1 + zoomIntensity) : (1 - zoomIntensity);
    const newScale = transform.value.k * delta;
    
    // 限制缩放范围
    if (newScale < 0.1 || newScale > 5) return;
    
    transform.value.x = mouseX - (mouseX - transform.value.x) * delta;
    transform.value.y = mouseY - (mouseY - transform.value.y) * delta;
    transform.value.k = newScale;
    
    updateTransform();
};

// 坐标转换辅助函数
const getMousePosition = (e) => {
    const svg = document.getElementById("svg-tree");
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left - transform.value.x) / transform.value.k,
        y: (e.clientY - rect.top - transform.value.y) / transform.value.k
    };
};

// 框选功能相关变量
const selectionBox = ref(null);
const selectedNodes = ref([]);
let isSelecting = false;
let selectionStart = { x: 0, y: 0 };
let isDraggingSelection = false;
let dragStart = { x: 0, y: 0 };
let currentSelectionBox = null; // 当前保留的选择框
let justFinishedSelecting = false; // 标记是否刚完成框选

// 实时保存函数
const saveSvg = () => {
    const date = selectedDate.value;
    store.svgs[date] = {
        nodes: JSON.parse(JSON.stringify(nodes.value)),
        connections: JSON.parse(JSON.stringify(cconnections.value))
    };
    // console.log('SVG data saved in real-time');
};

// 自动适配屏幕
const fitContent = () => {
    if (nodes.value.length === 0) {
        transform.value = { x: 0, y: 0, k: 1 };
        updateTransform();
        return;
    }

    const svg = document.getElementById("svg-tree");
    if (!svg) return;
    
    const { width: svgWidth, height: svgHeight } = svg.getBoundingClientRect();
    if (svgWidth === 0 || svgHeight === 0) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    // 尝试获取精确的边界，如果DOM未就绪则使用估算值
    let hasDom = false;
    const viewport = document.getElementById("viewport");
    if (viewport) {
        const groups = viewport.querySelectorAll("g.node-group");
        if (groups.length === nodes.value.length) {
            hasDom = true;
            groups.forEach(g => {
                const bbox = g.getBBox();
                const transformList = g.transform.baseVal;
                let tx = 0, ty = 0;
                if (transformList.length > 0) {
                    const matrix = transformList.getItem(0).matrix;
                    tx = matrix.e;
                    ty = matrix.f;
                }
                
                minX = Math.min(minX, tx + bbox.x);
                maxX = Math.max(maxX, tx + bbox.x + bbox.width);
                minY = Math.min(minY, ty + bbox.y);
                maxY = Math.max(maxY, ty + bbox.y + bbox.height);
            });
        }
    }

    if (!hasDom || minX === Infinity) {
        nodes.value.forEach(node => {
            minX = Math.min(minX, node.x - 20);
            maxX = Math.max(maxX, node.x + 260);
            minY = Math.min(minY, node.y - 20);
            maxY = Math.max(maxY, node.y + 60);
        });
    }

    const padding = 50;
    const contentWidth = maxX - minX + padding * 2;
    const contentHeight = maxY - minY + padding * 2;
    
    const scaleX = svgWidth / contentWidth;
    const scaleY = svgHeight / contentHeight;
    let newScale = Math.min(scaleX, scaleY);
    
    // 限制缩放范围
    newScale = Math.min(Math.max(newScale, 0.1), 1.2);

    const contentCenterX = minX - padding + contentWidth / 2;
    const contentCenterY = minY - padding + contentHeight / 2;
    
    transform.value.k = newScale;
    transform.value.x = (svgWidth / 2) - (contentCenterX * newScale);
    transform.value.y = (svgHeight / 2) - (contentCenterY * newScale);
    
    updateTransform();
};

// 监听store.selectedDate的变化
watch(() => store.selectedDate, (newDate, oldDate) => {
    // console.log(`selectedDate changed from ${oldDate} to ${newDate}`);
    // 清空 viewport 而不是整个 svg
    const viewport = document.getElementById("viewport");
    if (viewport) viewport.innerHTML = '';
    
    selectedNodes.value = []; // 清除选择状态
    currentSelectionBox = null; // 清除选择框引用
    nodes.value = store.svgs[newDate]?.nodes || [];
    cconnections.value = store.svgs[newDate]?.connections || [];
    updateNodes();
    updateConnections();
    setTimeout(fitContent, 100);
});

onMounted(() => {
    // 获取最新日期的数据
    const dates = Object.keys(store.svgs);
    if (dates.length > 0) {
        // 按日期降序排序，获取最新日期
        const latestDate = dates.sort((a, b) => new Date(b) - new Date(a))[0];
        store.selectedDate = latestDate;
    }
    
    const date = selectedDate.value;
    nodes.value = store.svgs[date]?.nodes || [];
    cconnections.value = store.svgs[date]?.connections || [];
    
    const svg = document.getElementById("svg-tree");
    
    // 创建 viewport 组
    let viewport = document.getElementById("viewport");
    if (!viewport) {
        viewport = document.createElementNS("http://www.w3.org/2000/svg", "g");
        viewport.setAttribute("id", "viewport");
        svg.appendChild(viewport);
    }
    
    // 初始化变换
    updateTransform();

    updateNodes();
    updateConnections();
    
    setTimeout(fitContent, 100);

    // svg.addEventListener("contextmenu", (e) => {
    //     e.preventDefault();
    //     // 只有在没有进行框选时才添加节点
    //     if (!isSelecting && !isDraggingSelection && !isPanning.value) {
    //         const pos = getMousePosition(e);
    //         addNode(null, "", pos.x, pos.y);
    //         updateConnections();
    //     }
    // });

    // 滚轮缩放
    svg.addEventListener("wheel", handleWheel, { passive: false });

    // 鼠标按下：处理平移或框选
    svg.addEventListener("mousedown", (e) => {
        // 中键或按住空格键左键：开始平移
        if (e.button === 1 || (e.button === 0 && e.code === 'Space')) {
             isPanning.value = true;
             panStart.x = e.clientX;
             panStart.y = e.clientY;
             svg.style.cursor = 'grabbing';
             return;
        }
        handleSelectionStart(e);
    }, { passive: false });

    // 鼠标移动：处理平移或框选
    document.addEventListener("mousemove", (e) => {
        if (isPanning.value) {
            const dx = e.clientX - panStart.x;
            const dy = e.clientY - panStart.y;
            transform.value.x += dx;
            transform.value.y += dy;
            panStart.x = e.clientX;
            panStart.y = e.clientY;
            updateTransform();
            return;
        }
        handleSelectionMove(e);
    }, { passive: false });

    // 鼠标松开：结束平移或框选
    document.addEventListener("mouseup", (e) => {
        if (isPanning.value) {
            isPanning.value = false;
            svg.style.cursor = 'default';
            return;
        }
        handleSelectionEnd(e);
    }, { passive: false });
    
    // 空格键切换光标
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !isPanning.value && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
            svg.style.cursor = 'grab';
        }
    });
    window.addEventListener('keyup', (e) => {
        if (e.code === 'Space' && !isPanning.value) {
            svg.style.cursor = 'default';
        }
    });
    
    // 点击空白区域清除选择
    svg.addEventListener("click", (e) => {
        if (e.target === svg && !isSelecting && !isDraggingSelection && !justFinishedSelecting && !isPanning.value) {
            clearSelection();
        }
    });
});

// 切换日期后，将存储的svg节点重新绘制
const updateNodes = () => {
    const viewport = document.getElementById("viewport");
    if (!viewport) return;
    
    Array.from(viewport.querySelectorAll("g.node-group")).forEach(g => viewport.removeChild(g));

    nodes.value.forEach(node => {
        let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "node-group");
        g.setAttribute("data-id", node.id);
        g.setAttribute("transform", `translate(${node.x}, ${node.y})`);

        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", 0);
        circle.setAttribute("cy", 0);
        circle.setAttribute("r", 7);
        circle.setAttribute("stroke", "white");
        circle.setAttribute("stroke-width", 0);

        circle.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡到SVG
            let startX = e.clientX;
            let startY = e.clientY;
            let onMouseMove = (e) => {
                let dx = e.clientX - startX;
                let dy = e.clientY - startY;
                // 考虑缩放比例
                node.x += dx / transform.value.k;
                node.y += dy / transform.value.k;
                g.setAttribute("transform", `translate(${node.x}, ${node.y})`);
                startX = e.clientX;
                startY = e.clientY;
                updateConnections();
                saveSvg(); // 实时保存
            };
            let onMouseUp = () => {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        // circle.addEventListener("contextmenu", (e) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        //     showMenu(e, node);
        // });

        let foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreignObject.setAttribute("x", 20);
        foreignObject.setAttribute("y", -13);
        foreignObject.setAttribute("width", 240);
        foreignObject.setAttribute("height", 40);
        let input = document.createElement("textarea");
        input.value = node.text;
        input.setAttribute("rows", "1");
        input.style.width = "200px";
        input.style.boxSizing = "border-box";
        input.style.minHeight = "24px";
        input.style.fontSize = "14px";
        input.style.lineHeight = "1.4";
        input.style.fontFamily = "inherit";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "4px";
        input.style.padding = "2px 8px";
        input.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        input.style.outline = "none";
        input.style.resize = "none";
        input.style.overflow = "hidden";
        input.style.transition = "border-color 0.2s, box-shadow 0.2s";

        const autoResize = () => {
            input.style.height = 'auto';
            input.style.height = input.scrollHeight + 'px';
            foreignObject.setAttribute("height", input.scrollHeight + 10);
        };

        input.addEventListener("focus", () => {
            input.style.borderColor = "#667eea";
            input.style.boxShadow = "0 2px 6px rgba(102, 126, 234, 0.3)";
        });
        input.addEventListener("blur", () => {
            input.style.borderColor = "#ccc";
            input.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        });
        input.addEventListener("input", (e) => {
            node.text = e.target.value;
            autoResize();
            saveSvg(); // 实时保存
        });
        input.addEventListener("mousedown", (e) => {
             e.stopPropagation();
        });
        foreignObject.appendChild(input);

        g.appendChild(circle);
        g.appendChild(foreignObject);
        viewport.appendChild(g);
        
        setTimeout(autoResize, 0);
    });
};

const addNode = (parentNode = null, text = "", x = null, y = null) => {
    parentNode = nodes.value.find(n => n.id === (parentNode ? parentNode.id : null)) || null;
    let newNode = {
        id: Date.now(),
        x: x !== null ? x : (parentNode ? parentNode.x : 50),
        y: y !== null ? y : (parentNode ? parentNode.y + 50 : 50),
        text: text,
        done: false,
        parentNode: parentNode ? parentNode.id : null
    };
    nodes.value.push(newNode);

    if (newNode.parentNode) {
        cconnections.value.push({ from: newNode.parentNode, to: newNode.id });
    }

    updateNodes();
    updateConnections();
    saveSvg(); // 实时保存
    return newNode;
};

const updateConnections = () => {
    const viewport = document.getElementById("viewport");
    if (!viewport) return;
    
    Array.from(viewport.querySelectorAll("line")).forEach(line => viewport.removeChild(line));

    cconnections.value.forEach(conn => {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        let fromNode = nodes.value.find(n => String(n.id) === String(conn.from));
        let toNode = nodes.value.find(n => String(n.id) === String(conn.to));

        line.setAttribute("x1", fromNode.x);
        line.setAttribute("y1", fromNode.y);
        line.setAttribute("x2", toNode.x);
        line.setAttribute("y2", toNode.y);
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", 1);
        viewport.insertBefore(line, viewport.firstChild);
    });
    saveSvg(); // 实时保存
};

const showMenu = (e, node) => {
    // console.log('showMenu执行')
    menuNode = node; // 设置当前右键菜单操作的节点
    menuStyle.value = {
        position: 'fixed !important',
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        background: '#fff',
        border: '1px solid #ccc',
        zIndex: 1000 // 确保菜单在最上层
    };
    menuVisible.value = true;
}

const menu_addNode = () => {
    if (menuNode) {
        addNode(menuNode, '', menuNode.x, menuNode.y + 50);
        updateNodes();
        updateConnections();
        menuVisible.value = false;
        hideMenu();
    }
}

const hideMenu = () => {
    menuVisible.value = false;
    menuNode = null;
}

// 框选功能方法
const handleSelectionStart = (e) => {
    // 只处理左键点击
    if (e.button !== 0) return;
    
    // 如果点击的是节点，让节点处理拖拽
    if (e.target.tagName === 'circle' || e.target.tagName === 'input' || e.target.closest('.node-group')) {
        return;
    }
    
    const svg = document.getElementById("svg-tree");
    if (!svg) return;
    
    const pos = getMousePosition(e);
    const x = pos.x;
    const y = pos.y;
    
    // 检查是否点击在现有的选择框内（开始拖拽选择框）
    if (currentSelectionBox && selectedNodes.value.length > 0) {
        const boxX = parseFloat(currentSelectionBox.getAttribute('x'));
        const boxY = parseFloat(currentSelectionBox.getAttribute('y'));
        const boxWidth = parseFloat(currentSelectionBox.getAttribute('width'));
        const boxHeight = parseFloat(currentSelectionBox.getAttribute('height'));
        
        if (x >= boxX && x <= boxX + boxWidth && y >= boxY && y <= boxY + boxHeight) {
            isDraggingSelection = true;
            dragStart = { x: e.clientX, y: e.clientY };
            return;
        }
    }
    
    // 开始新的框选
    isSelecting = true;
    selectionStart = { x, y };
    selectedNodes.value = [];
    justFinishedSelecting = false; // 重置标记
    // 清除之前的选择框
    removeSelectionBox();
    createSelectionBox(x, y, 0, 0);
};

const handleSelectionMove = (e) => {
    if (isDraggingSelection) {
        // 拖拽选择框和其中的元素
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        
        // 移动选择框
        if (currentSelectionBox) {
            const currentX = parseFloat(currentSelectionBox.getAttribute('x'));
            const currentY = parseFloat(currentSelectionBox.getAttribute('y'));
            currentSelectionBox.setAttribute('x', currentX + dx / transform.value.k);
            currentSelectionBox.setAttribute('y', currentY + dy / transform.value.k);
        }
        
        // 移动选中的节点
        selectedNodes.value.forEach(nodeId => {
            const node = nodes.value.find(n => n.id === nodeId);
            if (node) {
                node.x += dx / transform.value.k;
                node.y += dy / transform.value.k;
            }
        });
        
        dragStart = { x: e.clientX, y: e.clientY };
        updateNodes();
        updateConnections();
        return;
    }
    
    if (!isSelecting) return;
    
    const pos = getMousePosition(e);
    const currentX = pos.x;
    const currentY = pos.y;
    
    const width = Math.abs(currentX - selectionStart.x);
    const height = Math.abs(currentY - selectionStart.y);
    const x = Math.min(currentX, selectionStart.x);
    const y = Math.min(currentY, selectionStart.y);
    
    updateSelectionBox(x, y, width, height);
    
    // 实时检测选中的节点
    const selected = [];
    nodes.value.forEach(node => {
        if (node.x >= x && node.x <= x + width &&
            node.y >= y && node.y <= y + height) {
            selected.push(node.id);
        }
    });
    selectedNodes.value = selected;
    highlightSelectedNodes();
    

};

const handleSelectionEnd = (e) => {
    if (isDraggingSelection) {
        isDraggingSelection = false;
        saveSvg();
        return;
    }
    
    if (!isSelecting) return;
    
    isSelecting = false;
    // 如果有选中的节点，保留选择框；否则移除
    if (selectedNodes.value.length > 0) {
        const viewport = document.getElementById("viewport");
        currentSelectionBox = viewport ? viewport.querySelector("#selection-box") : null;
        if (currentSelectionBox) {
            // 改变选择框样式以表示选择完成，使其可拖拽
            currentSelectionBox.setAttribute("stroke-dasharray", "4,4");
            currentSelectionBox.setAttribute("fill", "rgba(102, 126, 234, 0.08)");
            currentSelectionBox.setAttribute("stroke", "rgba(102, 126, 234, 0.6)");
            currentSelectionBox.style.cursor = "move";
        }
        // 设置标记，防止立即触发click事件清除选择
        justFinishedSelecting = true;
        setTimeout(() => {
            justFinishedSelecting = false;
        }, 100); // 100ms后允许点击清除
    } else {
        removeSelectionBox();
    }
};

const createSelectionBox = (x, y, width, height) => {
    const viewport = document.getElementById("viewport");
    if (!viewport) {
        console.error('Viewport element not found');
        return;
    }
    
    // 移除已存在的选择框
    const existingBox = viewport.querySelector("#selection-box");
    if (existingBox) {
        existingBox.remove();
    }
    
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("id", "selection-box");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", "rgba(102, 126, 234, 0.15)");
    rect.setAttribute("stroke", "rgba(102, 126, 234, 0.8)");
    rect.setAttribute("stroke-width", "2");
    rect.setAttribute("stroke-dasharray", "8,4");
    rect.style.filter = "drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3))";
    viewport.appendChild(rect);
};

const updateSelectionBox = (x, y, width, height) => {
    const viewport = document.getElementById("viewport");
    if (viewport) {
        const selectionBox = viewport.querySelector("#selection-box");
        if (selectionBox) {
            selectionBox.setAttribute("x", x);
            selectionBox.setAttribute("y", y);
            selectionBox.setAttribute("width", width);
            selectionBox.setAttribute("height", height);
        } else {
            createSelectionBox(x, y, width, height);
        }
    }
};

const removeSelectionBox = () => {
    const viewport = document.getElementById("viewport");
    if (viewport) {
        const selectionBox = viewport.querySelector("#selection-box");
        if (selectionBox) {
            selectionBox.remove();
        }
    }
    currentSelectionBox = null;
};

const highlightSelectedNodes = () => {
    // 清除之前的高亮
    const viewport = document.getElementById("viewport");
    if (!viewport) return;
    
    viewport.querySelectorAll('.node-group circle').forEach(circle => {
        circle.setAttribute("stroke-width", "0");
    });
    
    // 高亮选中的节点
    selectedNodes.value.forEach(nodeId => {
        const nodeGroup = viewport.querySelector(`g[data-id="${nodeId}"]`);
        if (nodeGroup) {
            const circle = nodeGroup.querySelector('circle');
            circle.setAttribute("stroke", "#667eea");
            circle.setAttribute("stroke-width", "3");
        }
    });
};

const clearSelection = () => {
    selectedNodes.value = [];
    removeSelectionBox();
    highlightSelectedNodes();
};

const deleteNode = () => {
    if (!menuNode) return;
    const new_parentId = menuNode.parentNode;
    const children = nodes.value.filter(n => n.parentNode === menuNode.id);
    children.forEach(child => {
        child.parentNode = new_parentId;
        let conn = cconnections.value.find(c => c.from === menuNode.id && c.to === child.id);
        if (!new_parentId) {
            // console.log('当前删除的是根节点及其连接线')
            if (conn) cconnections.value = cconnections.value.filter(c => c !== conn);
            return;
        }
        // console.log('要修正的连接线', conn)
        if (conn) conn.from = new_parentId;
    });
    nodes.value = nodes.value.filter(n => n.id !== menuNode.id);
    cconnections.value = cconnections.value.filter(c => c.from !== menuNode.id && c.to !== menuNode.id);
    updateNodes();
    updateConnections();
    hideMenu();
}
</script>

<template>
 <div class="main-content">
  <div class="svg-tree-container">
     <div class="svg-wrapper">
       <svg id="svg-tree"></svg>
     </div>
  </div>   
 </div>

 <!-- 右键菜单 -->
 <!-- <div v-if="menuVisible" :style="menuStyle" class="context-menu">
  <div @click="menu_addNode" class="menu-item">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
    新增节点
  </div>
  <div @click="deleteNode" class="menu-item delete">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
    </svg>
    删除当前节点
  </div>
</div> -->
</template>

<style scoped>

.main-content{
    height:100%;
    display: flex;
    flex-direction: column;
}
.roadmap-title {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
  margin-top:0;
  color: #34495e;
  border-radius: 8px;
}

.svg-tree-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  margin-bottom: 2rem;
}

.svg-wrapper {
  flex: 1;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
}

svg {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 2px solid rgba(102, 126, 234, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 251, 255, 0.95) 100%);
  backdrop-filter: blur(5px);
}

.context-menu {
  min-width: 160px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #34495e;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.menu-item.delete:hover {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

/* 框选相关样式 */
#svg-tree {
  user-select: none;
}

.node-group {
  cursor: move;
}

.node-group circle.selected {
  stroke: #667eea !important;
  stroke-width: 3 !important;
  filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3));
}

#selection-box {
  transition: all 0.2s ease;
}

#selection-box:hover {
  stroke-width: 3;
  filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.4));
}
</style>