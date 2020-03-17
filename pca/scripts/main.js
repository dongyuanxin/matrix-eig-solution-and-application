main()

const messageInstance = new Message()
const layerInstance = new Layer()

function main() {
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        throw new Error("当前浏览器对FileAPI的支持不完善");
    }

    document.querySelector('#img-size')
        .innerHTML = `${window.MAX_HEIGHT}*${window.MAX_WIDTH}`

    document
        .querySelector("#image")
        .addEventListener("change", handleFileSelect, false);

    document
        .querySelector('#refresh')
        .addEventListener('click', function() {
            window.location.href = '/'
        })
    
    document.querySelector('#close-message')
        .addEventListener('click', function() {
            messageInstance.hide()
        })
}

/**
 * 文件上传句柄
 */
function handleFileSelect(event) {
    const { files } = event.target
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image()
        img.onload = transformImage
        img.src = event.target.result
    }

    reader.readAsDataURL(files[0])
}

/**
 * 图像处理
 */
function transformImage(event) {
    const img = event.target
    let imgData
    // 只处理矩阵
    if (img.width !== img.height) {
        messageInstance.show()
        return console.warn('必须上传正方形图片')
    }
    if (img.width > window.MAX_WIDTH || img.height > window.MAX_HEIGHT) {
        messageInstance.show()
        return console.warn('图片大小不合适, 请调整全局 MAX_WIDTH 和 MAX_HEIGHT 变量')
    }

    layerInstance.show();
    // step1: 获取图片原数据并且显示
    const canvas1 = document.querySelector('#canvas1')
    const ctx1 = canvas1.getContext("2d")
    canvas1.width = img.width
    canvas1.height = img.height
    ctx1.drawImage(img, 0, 0, canvas1.width, canvas1.height)
    imgData = ctx1.getImageData(0, 0, img.width, img.height)

    // step2: 图片灰度化
    const canvas2 = document.querySelector('#canvas2')
    const ctx2 = canvas2.getContext("2d")
    canvas2.width = img.width
    canvas2.height = img.height
    grey(imgData)
    ctx2.putImageData(imgData, 0, 0)

    // console.log('>>> 完成图片灰度化，灰度化后的子矩阵是：')
    // const mData = imgData.data
    // for (let row = 0; row < 10; ++row) {
    //     let line = []
    //     for (let col = 0, offset = row * 256 * 4; col < 10; ++col) {
    //         line.push(mData[offset + col * 4])
    //     }
    //     console.log(line.join(','))
    // }
    // console.log(imgData)
    // return;
    // console.log(canvas2.toDataURL("image/jpeg"))

    // step3: pca
    const canvas3 = document.querySelector('#canvas3')
    const ctx3 = canvas3.getContext("2d")
    canvas3.width = img.width
    canvas3.height = img.height

    const matrix = []
    const dimension = Math.sqrt(imgData.data.length / 4)
    for (let i = 0; i < dimension * dimension; ++i) {
        const row = Math.floor(i / dimension)
        const col = i % dimension
        if (matrix[row] === undefined) {
            matrix[row] = []
        }
        matrix[row][col] = imgData.data[i * 4]
    }
    const matrix2 = pca(matrix)
    let index = 0
    for (let row = 0; row < dimension; ++row) {
        for (let col = 0; col < dimension; ++col) {
            const greyVal = matrix2[row][col]
            imgData.data[index  *  4] = greyVal
            imgData.data[index * 4 + 1] = greyVal
            imgData.data[index * 4 + 2] = greyVal
            imgData.data[index * 4 + 3] = 255 
            ++index
        }
    }
    ctx3.putImageData(imgData, 0, 0);
    layerInstance.hide();
    // console.log(canvas3.toDataURL("image/jpeg"))
}

/**
 * 图片灰度化
 */
function grey(imgData) {
    const { data } = imgData
    for (let i = 0; i < data.length; i += 4) {
        const val = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        data[i] = val
        data[i + 1] = val
        data[i + 2] = val 
    }
}

function Layer(id = '#layer') {
    this.dom = document.querySelector(id)
}

Layer.prototype.show = function() {
    if (!this.dom) return
    this.dom.setAttribute('style', '')
}

Layer.prototype.hide = function() {
    if (!this.dom) return
    this.dom.setAttribute('style', 'display: none;')
}

function Message(id = '#message', timeout = 5000) {
    this.dom = document.querySelector(id)
    this.isShow = false
    this.timeout = timeout
}

Message.prototype.getClsNames = function() {
    if (!this.dom) return []
    return this.dom.className
        .trim()
        .replace(/\s(\s)+/g, ' ')
        .split(' ')
}

Message.prototype.show = function() {
    if (!this.dom || this.isShow) return

    this.isShow = true
    const clsNames = this.getClsNames()
    this.dom.className = 'show ' + clsNames.join(' ') 
    setTimeout(() => {
        this.hide()
    }, this.timeout)
}

Message.prototype.hide = function() {
    if (!this.dom || !this.isShow) return 

    this.isShow = false
    const clsNames = this.getClsNames()
    this.dom.className = clsNames.filter(cls => cls !== 'show').join(' ')
}