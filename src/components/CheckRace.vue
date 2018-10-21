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
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="_id">
            <span>{{ props.row._id }}</span>
          </el-form-item>
          <el-form-item label="比赛标题">
            <span>{{ props.row.title }}</span>
          </el-form-item>
          <el-form-item label="允许参赛人数">
            <span>{{ props.row.allow_people }}</span>
          </el-form-item>
          <el-form-item label="比赛级别">
            <span>{{ props.row.class }}</span>
          </el-form-item>
          <el-form-item label="比赛区域">
            <span>{{ props.row.area_id }}</span>
          </el-form-item>
          <el-form-item label="审核状态">
            <span>{{ props.row.state }}</span>
          </el-form-item>
          <el-form-item label="开始时间">
            <span>{{ props.row.start_time }}</span>
          </el-form-item>
          <el-form-item label="截止时间">
            <span>{{ props.row.end_time }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.create_time }}</span>
          </el-form-item>             
        </el-form>
      </template>
    </el-table-column>
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
      prop="title"
      label="比赛标题"
      width="200">
    </el-table-column>
    <el-table-column 
      prop="allow_people"
      label="允许参赛人数"
      width="120">
    </el-table-column>
    <el-table-column 
      prop="class"
      label="比赛级别"
      width="120">
    </el-table-column>
    <el-table-column 
      prop="area_id"
      label="比赛区域"
      width="120">
    </el-table-column>
    <el-table-column 
      prop="state"
      label="审核状态"
      width="150">
    </el-table-column>
    
    <el-table-column 
      prop="start_time"
      label="开始时间"
      width="200">
    </el-table-column>
    <el-table-column 
      prop="end_time"
      label="截止时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间"
      width="200"
      show-overflow-tooltip>
    </el-table-column>
 
    <el-table-column
      fixed="right"
      label="操作"
      width="230">
      <template slot-scope="scope">
        <el-button
          @click="handleEdit(scope.row._id)">查看/审核</el-button>
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
<el-dialog  title="比赛信息" :visible.sync="dialogFormVisible" >
  <el-form  v-loading="addFormLoading" ref="form" :model="form" label-width="80px" style="width:600px;margin:30px auto">
  <el-form-item label="比赛标题">
    <el-input disabled v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select disabled v-model="form.area_id" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item  label="活动时间">
    <el-col :span="11">
      <el-date-picker 
      v-model="form.timeRange"
      type="daterange"
      readonly
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
      >
    </el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="人数限制">
     <el-input-number disabled v-model="form.allow_people"  :min="1"  label="描述文字"></el-input-number>
    &nbsp;人
  </el-form-item>
  <el-form-item label="比赛级别">
    <el-radio-group disabled v-model="form.class" readonly>
      <el-radio :label="0" >国家级</el-radio>
      <el-radio :label="1" >省级</el-radio>
      <el-radio :label="2" >校级</el-radio>
      <el-radio :label="3" >院级</el-radio>
      <el-radio :label="4" >社团</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="状态">
    <el-radio-group disabled v-model="form.state">
      <el-radio :label="1" >已审核</el-radio>
      <el-radio :label="0" >未审核</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="比赛详情">
    <el-input readonly type="textarea"  :rows="5" v-model="form.detail"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="cancel">审核通过</el-button>
    <el-button type="danger" @click="cancel">审核不通过并通知</el-button>
    <el-button  @click="cancel">我只查看（关闭）</el-button>
  </el-form-item>
</el-form>

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
        timeRange:'',
        state:0,
        class:null
      },
      totalPage:1,
      loading: true,
      sel: null,
      h: "500px",
      th:300,
      currentPage:1,
      tableData:[],
      multipleSelection:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      timePickerDisabled:true,
      form: {
        class:1,
        allow_people: 1,
        title: "",
        detail: "",
        area_id: "",
        timeRange: "",
        state:0
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    initTable(page) {
      var query={};
      this.currentPage = page;
      query.title = this.query.queryStr;
      query.detail = this.query.queryStr;
      query.timeType = this.query.timeType;
      query.state = this.query.state;
      query.class = this.query.class;
      query.page = this.currentPage-1;
      if(query.timeType == 'custom')
      {
        var a = this.query.timeRange[0];
        var b = this.query.timeRange[1];
        query.startTime = a.getFullYear()+'-'+(a.getMonth()+1)+'-'+a.getDate();
        query.endTime = b.getFullYear()+'-'+(b.getMonth()+1)+'-'+b.getDate();
      }
      this.loading = true;
      $.getJSON("/api/raceinfo/count", query, res => {
        this.totalPage = res.info;
      });
      $.getJSON("/api/raceinfo/all", query, res => {
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
              $.getJSON("/api/raceinfo/remove", remove[i], res => {
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
      this.form.class = this.form.grade + this.form.major;
      $.post({
        url: "/api/raceinfo/edit",
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
    cancel() {
      this.showInfo("已关闭");
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
          $.getJSON("/api/raceinfo/remove", { _id: id }, res => {
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
      $.getJSON("/api/raceinfo/getOne", { _id: id }, res => {
        this.form = res.info[0];
        var a = new Date(this.form.start_time);
        var b = new Date(this.form.end_time);
        this.form.timeRange = [a,b];
        console.log(this.form);
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
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 150;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }
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