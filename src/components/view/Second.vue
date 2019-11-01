<template>
  <div id="second">
    <div class="second-app title">
      {{msg}}
    </div>
    <div class="radio-center">
      <el-time-picker
        v-model="value1"
        :picker-options="{
          selectableRange:'18:30:00 - 20:30:00'
        }"
        placeholder="任意时间点"
      >
      </el-time-picker>
      <el-time-picker
        arrow-control
        v-model="value2"
        :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
        placeholder="任意时间点">
      </el-time-picker>
    </div>
    <div class="radio-center">
        <el-date-picker
          v-model="value3"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
    </div>
    <div class="radio-center">
      <!--这个上传是不需要走CDN，直接走我们的自己的接口就足够了-->
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-remove="handleRemove"
        :onSuccess="handlePictureCardPreview"
      >
      <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog
        :visible.sync="dialogVisible"
      >
        <img width="100%" :src="dialogImageUrl" alt=""/>
      </el-dialog>
    </div>
    <div class="radio-center">
      <!--这个上传需要走CDN不能直接走自己的接口，防止其他人随意上传， 这个是自己的上传案例（uploadImg）-->
      <el-upload
        action=""
        list-type="picture"
        :limit="1"
        :on-remove="handleRemove"
        :http-request="uploadImg"
        :file-list="advertise.fileList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>

    <div class="radio-center">
      <!--导出excel表格的第一种方法，走接口，将数据提取出来后进入表格格式化的组件-->
      <el-button type="primary" @click="excelExport"> 导出excel </el-button>

    </div>
    <!--导入excel表格-->
    <div>
      <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
      <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
        Drop excel file here or
        <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
          Browse
        </el-button>
      </div>
    </div>

    <!--el-table可以动态设置-->
    <el-table :data="excelData.results">
      <el-table-column v-for="item of excelData.header" :prop="item" :label="item"></el-table-column>
    </el-table>
    <div class="radio-center">
      <el-rate v-model="value4"></el-rate>
    </div>
    <div class="radio-center-transfer">
      <el-transfer v-model="value5" :data="data"></el-transfer>
    </div>
  </div>
</template>

<script>

  import { uploadFiles } from '../../tools/network';
  import XLSX from 'xlsx'

  export default {
  name: 'Second',
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data () {
    const generateDatas = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      msg: 'Welcome to SecondApp',
      value1: new Date(2016, 9, 10, 18, 40),
      value2: new Date(2016, 9, 10, 18, 40),
      value3: '',
      advertise: {
        fileList:[]
      },
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      tableData: [
        {'index':'999',"nickName": "的旧时光", "name": "98491231841251"},
        {'index':'1',"nickName": "高贵", "name": "张"},
        {'index':'2',"nickName": "海aaa灰尘", "name": "小兰"}
      ],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      value4: null,
      value5: [1, 4],
      data: generateDatas()
    }
  },
  mounted() {
    const { name } = this.$store.getters['text/textParams']
    console.log(name);
    this.msg = name
  },

  methods: {
    handlePictureCardPreview (response, file, fileList) {
      console.log(response);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // if(response.status==0){
      //   // this.$set(this.form,'pictureId', response.data.imgId)
      //   this.form.pictureId = response.data.imgId
      //   this.picture = response.data.imageUrl;
      //   this.$set(this.form,'pictureId', response.data.imgId)
      //
      //   this.$set(this,'picture', response.data.imageUrl);
      //
      //   // this.form.picture = response.data.imageUrl
      // }else{
      //   this.$set(this.form,'pictureId', response.error.msg)
      //
      // }


    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
      this.advertise.fileList = [];
    },

    uploadImg(files) {
      uploadFiles({ files: [files.file] })
        .then((res) => {
          console.log(res);
          this.advertise.fileList.push({
            name: files.file.name,
            url: res[0],
          })
        } )

    },
    excelExport() {
      const tHeader = ['序号', '昵称', '姓名'];  // 设置Excel的表格第一行的标题
      const filterVal = ['index', 'nickName', 'name'];  // index、nickName、name是tableData里对象的属性
      const list = this.tableData;  //把data里的tableData存到list
      const data = this.formatJson(filterVal, list);
      import('../../excel/Export2Excel').then(excel => {

        excel.export_json_to_excel({
          header: tHeader,
          data: data,
          filename: 'excel-list',
          autoWidth: true,
          bookType: 'xlsx'
        })
      });

    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },




    // 导入excel表格
    generateData({ header, results }) {
      console.log(header);
      console.log(results);
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    handleSuccess({ results,header }) {
      console.log(results);
      console.log(header);

    }
  }





}
</script>

<style scoped>
  .title {
    font-size: 49px;
    color: #d01e1e;
    text-align: center;
    margin-top: 12px;

  }
  .radio-center {
    text-align: center;
    margin-top: 40px;
  }
  .radio-center-transfer {
    width: 500px;
    margin: 0 auto;
    margin-top: 40px;
  }

  .excel-upload-input{
    display: none;
    z-index: -9999;
  }
  .drop{
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }

</style>
