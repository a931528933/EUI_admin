<template>
<el-container>
 <el-header style="text-align: left; font-size: 30px">
{{$route.query.title}}
 </el-header>
  <el-main style="line-height:20px;padding:10px">

<el-form v-loading="addFormLoading" ref="form" :model="form" label-width="80px" style="width:500px;margin:30px auto">
  <el-form-item label="比赛标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="form.area_id" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker 
      v-model="form.timeRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="人数限制">
     <el-input-number v-model="form.allow_people"  :min="1"  label="描述文字"></el-input-number>
    &nbsp;人
  </el-form-item>
  <el-form-item label="比赛级别">
    <el-radio-group v-model="form.class">
      <el-radio label="0"  name="nation">国家级</el-radio>
      <el-radio label="1" name="provice">省级</el-radio>
      <el-radio label="2" name="school">校级</el-radio>
      <el-radio label="3" name="academy">院级</el-radio>
      <el-radio label="4" name="academy">社团</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="状态">
    <el-radio-group v-model="form.state">
      <el-radio label="1"  name="ok">已审核</el-radio>
      <el-radio label="0" name="nok">未审核</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="比赛详情">
    <el-input type="textarea"  :rows="5" v-model="form.detail"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="reset">重填</el-button>
  </el-form-item>
</el-form>
    </el-main>

</el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        class: "",
        allow_people: 1,
        title: "",
        detail: "",
        area_id: "",
        timeRange: "",
        state:""
      },
      addFormLoading: false,
    };
  },
  methods: {
    onSubmit(){
       

          this.form.start_time = this.form.timeRange[0];
          this.form.end_time = this.form.timeRange[1];
          this.form.start_time =
          this.form.start_time.getFullYear() + "-" + (this.form.start_time.getMonth() + 1) + "-" + this.form.start_time.getDate();
        this.form.end_time =
          this.form.end_time.getFullYear() + "-" + (this.form.end_time.getMonth() + 1) + "-" + this.form.end_time.getDate();
          delete this.form.timeRange;
        console.log(this.form);
        this.addFormLoading = true;
        setTimeout(() => {
      $.post({
        url: "/api/raceinfo/add",
        data: this.form,
        success: res => {
          if (res.success == 1) {
            this.showSuccess("提交成功");
          } else {
            this.showInfo("提交失败");
          }
          this.clear();
          this.addFormLoading = false;
        },
        error: () => {
          this.$message({
            type: "success",
            message: "错误!"
          });
          this.addFormLoading = false;
        }
      });          
        }, 200);

    },
    submit() {
      this.showInfo("提交中");

    },
    reset() {
      this.showInfo("已重置表单");
      for(var i in this.form)
      {
        this.form[i] = '';
      }
    },
    clear() {
      for(var i in this.form)
      {
        this.form[i] = '';
      }
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
    }
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