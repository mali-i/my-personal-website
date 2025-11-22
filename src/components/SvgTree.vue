<script setup>
import { onMounted, ref, computed, watch } from 'vue';
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

// 实时保存函数
const saveSvg = () => {
    const date = selectedDate.value;
    store.svgs[date] = {
        nodes: JSON.parse(JSON.stringify(nodes.value)),
        connections: JSON.parse(JSON.stringify(cconnections.value))
    };
    console.log('SVG data saved in real-time');
};

// 监听store.selectedDate的变化
watch(() => store.selectedDate, (newDate, oldDate) => {
    console.log(`selectedDate changed from ${oldDate} to ${newDate}`);
    document.getElementById("svg-tree").innerHTML = '';
    nodes.value = store.svgs[newDate]?.nodes || [];
    cconnections.value = store.svgs[newDate]?.connections || [];
    updateNodes();
    updateConnections();
});

// 监听数据加载完成
watch(() => store.isLoaded, (loaded) => {
    if (loaded) {
        const today = new Date().toISOString().split('T')[0];
        nodes.value = store.svgs[today]?.nodes || [];
        cconnections.value = store.svgs[today]?.connections || [];
        updateNodes();
        updateConnections();
    }
});

onMounted(() => {
    // 如果数据已经加载完成，立即初始化
    if (store.isLoaded) {
        const today = new Date().toISOString().split('T')[0];
        nodes.value = store.svgs[today]?.nodes || [];
        cconnections.value = store.svgs[today]?.connections || [];
        updateNodes();
        updateConnections();
    }

    document.getElementById("svg-tree").addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const svgRect = document.getElementById("svg-tree").getBoundingClientRect();
        const x = e.clientX - svgRect.left;
        const y = e.clientY - svgRect.top;
        addNode(null, "", x, y);
        updateConnections();
    });
});

// 切换日期后，将存储的svg节点重新绘制
const updateNodes = () => {
    const svg = document.getElementById("svg-tree");
    Array.from(svg.querySelectorAll("g.node-group")).forEach(g => svg.removeChild(g));

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
            let startX = e.clientX;
            let startY = e.clientY;
            let onMouseMove = (e) => {
                let dx = e.clientX - startX;
                let dy = e.clientY - startY;
                node.x += dx;
                node.y += dy;
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

        circle.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopPropagation();
            showMenu(e, node);
        });

        let foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreignObject.setAttribute("x", 20);
        foreignObject.setAttribute("y", -12);
        foreignObject.setAttribute("width", 200);
        foreignObject.setAttribute("height", 30);
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.value = node.text;
        input.style.width = "180px";
        input.style.height = "24px";
        input.style.fontSize = "14px";
        input.style.border = "1px solid #ccc";
        input.style.borderTop = "1px solid #ccc";
        input.style.borderRight = "1px solid #ccc";
        input.style.borderBottom = "1px solid #ccc";
        input.style.borderLeft = "1px solid #ccc";
        input.style.borderRadius = "4px";
        input.style.padding = "4px 8px";
        input.style.boxSizing = "border-box";
        input.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        input.style.outline = "none";
        input.style.transition = "border-color 0.2s, box-shadow 0.2s";
        input.style.background = "white";
        input.addEventListener("focus", () => {
            input.style.borderColor = "#667eea";
            input.style.borderTop = "1px solid #667eea";
            input.style.borderRight = "1px solid #667eea";
            input.style.borderBottom = "1px solid #667eea";
            input.style.borderLeft = "1px solid #667eea";
            input.style.boxShadow = "0 2px 6px rgba(102, 126, 234, 0.3)";
        });
        input.addEventListener("blur", () => {
            input.style.borderColor = "#ccc";
            input.style.borderTop = "1px solid #ccc";
            input.style.borderRight = "1px solid #ccc";
            input.style.borderBottom = "1px solid #ccc";
            input.style.borderLeft = "1px solid #ccc";
            input.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        });
        input.addEventListener("input", (e) => {
            node.text = e.target.value;
            saveSvg(); // 实时保存
        });
        foreignObject.appendChild(input);

        g.appendChild(circle);
        g.appendChild(foreignObject);
        svg.appendChild(g);
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
    let svg = document.getElementById("svg-tree");
    Array.from(svg.querySelectorAll("line")).forEach(line => svg.removeChild(line));

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
        svg.insertBefore(line, svg.firstChild);
    });
    saveSvg(); // 实时保存
};

const showMenu = (e, node) => {
    console.log('showMenu执行')
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

const deleteNode = () => {
    if (!menuNode) return;
    const new_parentId = menuNode.parentNode;
    const children = nodes.value.filter(n => n.parentNode === menuNode.id);
    children.forEach(child => {
        child.parentNode = new_parentId;
        let conn = cconnections.value.find(c => c.from === menuNode.id && c.to === child.id);
        if (!new_parentId) {
            console.log('当前删除的是根节点及其连接线')
            if (conn) cconnections.value = cconnections.value.filter(c => c !== conn);
            return;
        }
        console.log('要修正的连接线', conn)
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
 <div v-if="menuVisible" :style="menuStyle" class="context-menu">
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
</div>
</template>

<style scoped>

.main-content{
    /* background-color: #e74c3c; */
    height:100%;
    display: flex;
    flex-direction: column;
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
</style>