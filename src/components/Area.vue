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
          class="el-icon-delete"
          type="danger"
          @click="handleAllDelete()">批量删除</el-button>
   </div>

   </el-col>
        <el-col :span="18" style="text-align:right"><div class="grid-content">
          <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleAdd()" >添加区域</el-button>
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
      prop="area_name"
      label="区域"
      width="200">
    </el-table-column>
    <el-table-column 
      prop="area_address"
      label="区域地址"
      width="120">
    </el-table-column>
    <el-table-column 
      prop="area_remark"
      label="区域简介"
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
          @click="handleEdit(scope.row._id)">编辑</el-button>
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
<el-dialog  title="编辑区域" :visible.sync="dialogFormVisible" >
  <el-form v-loading="loading" :model="form">
    <el-form-item label="区域" :label-width="formLabelWidth">
      <el-select v-model="form.area_name" placeholder="请选择用户类型">
        <el-option label="广东石油化工学院" value="0"></el-option>
        <el-option label="华南理工大学" value="1"></el-option>
      </el-select>
    </el-form-item> 
    <el-form-item label="区域地址" :label-width="formLabelWidth">
    <el-input v-model="form.area_address" autoComplete="off"></el-input>
    </el-form-item> 
    <el-form-item label="区域简介" :label-width="formLabelWidth">
      <el-input
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
      v-model="form.area_remark">
    </el-input>
    </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
<el-dialog  title="添加区域" :visible.sync="addFormVisible" >
  <el-form v-loading="loading" :model="addForm">
    <el-form-item label="区域" :label-width="formLabelWidth">
      <el-select v-model="addForm.area_name" placeholder="请选择用户类型">
        <el-option label="广东石油化工学院" value="0"></el-option>
        <el-option label="华南理工大学" value="1"></el-option>
      </el-select>
    </el-form-item> 
    <el-form-item label="区域地址" :label-width="formLabelWidth">
    <el-input v-model="addForm.area_address" autoComplete="off"></el-input>
    </el-form-item> 
    <el-form-item label="区域简介" :label-width="formLabelWidth">
      <el-input
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
      v-model="addForm.area_remark">
    </el-input>
    </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancelAddForm">取 消</el-button>
    <el-button type="primary" @click="submitAddForm">确 定</el-button>
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
      totalPage: 1,
      loading: true,
      sel: null,
      h: "500px",
      th: 300,
      currentPage: 1,
      tableData: [],
      multipleSelection: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      addFormVisible: false,
      timePickerDisabled: true,
      addForm: {
        area_name: "",
        area_address: "",
        area_remark: ""
      },
      form: {
        area_name: "",
        area_address: "",
        area_remark: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    initTable(page) {
      var query = {};
      this.currentPage = page;
      query.area_name = this.query.queryStr;
      query.area_address = this.query.queryStr;
      query.area_remark = this.query.queryStr;
      query.timeType = this.query.timeType;
      query.page = this.currentPage - 1;
      if (query.timeType == "custom") {
        var a = this.query.timeRange[0];
        var b = this.query.timeRange[1];
        query.startTime =
          a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
        query.endTime =
          b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + b.getDate();
      }
      this.loading = true;
      $.getJSON("/api/area/count", query, res => {
        this.totalPage = res.info;
      });
      $.getJSON("/api/area/all", query, res => {
        this.tableData = res.info;
        setTimeout(() => {
          this.loading = false;
        }, 300);
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
              $.getJSON("/api/area/remove", remove[i], res => {
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
    submit(id) {
      $.post({
        url: "/api/area/edit",
        data: this.form,
        success: res => {
          if (res.success == 1) {
            this.showSuccess("提交成功");
            this.dialogFormVisible = false;
            this.initTable(this.currentPage);
          } else {
            this.showInfo("提交失败");
          }
        },
        error: () => {
          this.$message({
            type: "success",
            message: "错误!"
          });
        }
      });
    },
    submitAddForm() {
      $.post({
        url: "/api/area/add",
        data: this.addForm,
        success: res => {
          if (res.success == 1) {
            this.showSuccess("提交成功");
            this.addFormVisible = false;
            this.initTable(this.currentPage);
          } else {
            this.showInfo("提交失败");
          }
        },
        error: () => {
          this.$message({
            type: "success",
            message: "错误!"
          });
        }
      });
    },
    cancel() {
      this.showInfo("已取消");
      this.dialogFormVisible = false;
    },
    cancelAddForm() {
      this.showInfo("已取消");
      this.addFormVisible = false;
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
          $.getJSON("/api/area/remove", { _id: id }, res => {
            if (res.success == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.initTable();
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
      $.getJSON("/api/area/getOne", { _id: id }, res => {
        this.form = res.info[0];
        this.loading = false;
      });
    },
    handleAdd() {
      for (let key in this.addForm) {
        this.addForm[key] = "";
      }
      this.addFormVisible = true;
    }
  },
  created() {
    window.onresize = () => {
      this.h = window.innerHeight - 60 + "px";
      this.th = window.innerHeight - 60 - 320;
    };
    this.h = window.innerHeight - 60 + "px";
    this.th = window.innerHeight - 60 - 320;
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