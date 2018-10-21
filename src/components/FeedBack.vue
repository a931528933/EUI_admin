<template>
<el-container :style="{height:h}" >
 <el-header style="text-align: left; font-size: 30px">
{{$route.query.title}}
 </el-header>
  <el-main style="line-height:20px;padding:10px">

<el-row >

   <el-col :span="18" style="text-align:right"><div  class="grid-content">
    <el-radio-group v-model="query.timeType" >
    <el-radio-button label="null">不限</el-radio-button>
    <el-radio-button label="day">当日</el-radio-button>
    <el-radio-button label="week">当周</el-radio-button>
    <el-radio-button label="month">当月</el-radio-button>
    <el-radio-button label="year">当年</el-radio-button>
    <el-radio-button label="custom">自定义</el-radio-button>
  </el-radio-group>
<el-date-picker 
      v-model="query.timeRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
   </div>

   </el-col>
    <el-col  :span="6" style="text-align:right"><div class="grid-content">

  <el-input placeholder="请输入关键字" clearable v-model="query.queryStr" >
    <el-button slot="append"   icon="el-icon-search" @click="currentPage = 1;initTable(currentPage);">搜索</el-button>
  </el-input>
   </div>
   </el-col>
   </el-row>
   <el-row>
       <el-col :span="6" style="text-align:left"><div class="grid-content">
       <el-button
          type="danger"
          class="el-icon-delete"
          @click="handleAllDelete()">批量删除</el-button>
   </div>

   </el-col>
        <el-col :span="18" style="text-align:right"><div class="grid-content">

          <el-button type="primary"  icon="el-icon-refresh" @click="query.queryStr='';initTable(currentPage);" plain>刷新列表</el-button>
      
   </div>

   </el-col>
   </el-row>
<el-table v-loading="loading" stripe border :height="th"
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%;"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column 
      prop="_id"
      label="id"
      width="220">
    </el-table-column>
   <el-table-column 
      prop="user_id"
      label="用户id"
      width="200">
    </el-table-column>
    <el-table-column 
      prop="wx_id"
      label="微信id"
      width="120">
    </el-table-column>
    <el-table-column 
      prop="content"
      label="内容"
      width="120">
    </el-table-column>
    <el-table-column 
      prop="area_id"
      label="区域"
      width="120">
    </el-table-column>

    <el-table-column
      prop="create_time"
      label="创建时间"
      show-overflow-tooltip>
    </el-table-column>
 
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button
          @click="handleEdit(scope.row._id)">查看</el-button>
        <el-button
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<div class="block">
  <br>
  
<el-pagination
    layout="prev, pager, next"
    @current-change="initTable"
    :current-page="currentPage"
    :page-size="10"
    :total="totalPage">
  </el-pagination>
</div>
<el-dialog title="查看反馈" :visible.sync="dialogFormVisible" >
  <el-form :model="form">
    <el-form-item label="反馈内容"  :label-width="formLabelWidth">
<el-input
  type="textarea"
  :rows="10"
  readonly
  placeholder="请输入内容"
  v-model="form.content">
</el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
    </el-main>
<el-footer>dd</el-footer>

</el-container>
</template>

<script>
export default {
  data() {
    return {
      query: {
        queryStr: "",
        timeType: "null",
        timeRange: ""
      },
      loading: true,
      sel: null,
      h: "500px",
      th:300,
      currentPage:1,
      tableData: [],
      totalPage:1,
      multipleSelection: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      timePickerDisabled: true,
      form: {
        _id: "",
        user_id: "",
        wx_id: "",
        content: "",
        area_id: "",
        create_time: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    initTable(page) {
      var query = {};
      this.currentPage = page;
      query.user_id = this.query.queryStr;
      query.wx_id = this.query.queryStr;
      query.content = this.query.queryStr;
      query.area_id = this.query.queryStr;
      query.timeType = this.query.timeType;
      query.page = this.currentPage-1;
      if (query.timeType == "custom") {
        var a = this.query.timeRange[0];
        var b = this.query.timeRange[1];
        query.startTime =
          a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
        query.endTime =
          b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + b.getDate();
      }
      this.loading = true;
      $.getJSON("/api/feedback/count", query, res => {
        this.totalPage = res.info;
      });
      $.getJSON("/api/feedback/all", query, res => {
        this.tableData = res.info;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
    },
    handleAllDelete() {
      var remove = [];
      for (var i in this.sel) {
        remove.push({ _id: this.sel[i]._id });
      }

      this.$confirm("删除所选, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var list = [];

          for (var i in remove) {
            var temp = new Promise(resolve => {
              $.getJSON("/api/feedback/remove", remove[i], res => {
                var result = res;
                resolve(result);
              });
            });
            list.push(temp);
          }
          if (list.length == 0) {
            this.$message({
              type: "info",
              message: "请至少选择一项"
            });

            return;
          }
          Promise.all(list)
            .then(res => {
              console.log(res);
              if (res.length == list.length) {
                this.$message({
                  type: "success",
                  message: "删除所选成功!"
                });
                this.currentPage = 1;
                this.initTable(this.currentPage);
              } else {
                this.$message({
                  type: "info",
                  message: "删除队列过程出错"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "删除队列过程出错"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(selection) {
      this.sel = selection;
      console.log(this.sel);
    },
    submit() {
      this.showInfo("查看完毕");
      this.dialogFormVisible = false;
    },
    cancel() {
      this.showInfo("已取消");
      this.dialogFormVisible = false;
    },
    showSuccess(info) {
      this.$message({
        type: "success",
        message: info
      });
    },
    showInfo(info) {
      this.$message({
        type: "info",
        message: info
      });
    },
    handleDelete(id) {
      this.$confirm("删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(id);
          $.getJSON("/api/feedback/remove", { _id: id }, res => {
            if (res.success == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.initTable(this.currentPage);
            } else {
              this.$message({
                type: "success",
                message: "错误!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(id) {
      this.dialogFormVisible = true;
      this.loading = true;
      $.getJSON("/api/feedback/getOne", { _id: id }, res => {
        this.form = res.info[0];
        this.loading = false;
      });
    }
  },
  created() {
    window.onresize = () => {
      this.h = window.innerHeight - 60 + "px";
      this.th = window.innerHeight - 60 - 320;
    };
    this.h = window.innerHeight - 60 + "px";
    this.th = window.innerHeight - 60 - 320 ;
    this.initTable(this.currentPage);
  }
};
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
#left-nav {
  height: 100%;
}
</style>