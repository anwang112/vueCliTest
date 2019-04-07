<template>
    <div class="register">
        <section>
            <div class="form_container">
                <div class="manage_tip">
                    <span class="title">小企鵝後台管理系統</span>
                    <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                        <el-form-item label="會員帳號" prop="name">
                            <el-input v-model="registerUser.name" placeholder="請輸入會員帳號"></el-input>
                        </el-form-item>
                        <el-form-item label="信箱" prop="email">
                            <el-input v-model="registerUser.email" placeholder="請輸入email"></el-input>
                        </el-form-item>
                        <el-form-item type="password" label="會員密碼" prop="password">
                            <el-input v-model="registerUser.password" placeholder="請輸入會員密碼"></el-input>
                        </el-form-item>
                        <el-form-item type="password" label="確認密碼" prop="password2">
                            <el-input v-model="registerUser.password2" placeholder="請確認會員密碼"></el-input>
                        </el-form-item>
                        <el-form-item label="身份">
                            <el-select v-model="registerUser.identity" placeholder="請選擇身份">
                                <el-option label="管理員" value="manager"></el-option>
                                <el-option label="員工" value="emploee"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">註冊</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "register",
        components: {},
        data(){
            return{
                registerUser:{
                    name:"",
                    email:"",
                    password:"",
                    password2:"",
                    identity:""
                },
                rules:{
                    name:[{
                        required:true,
                        message:"會員帳號不能為空",
                        trigger:"blur"
                    },{
                        min:2,
                        max:30,
                        message:"長度須為2-30字",
                        trigger:"blur"
                    }],
                    email:[{
                        required:true,
                        type:"email",
                        message:"email格式錯誤",
                        trigger:"blur"
                    }],
                    password:[{
                        required:true,
                        message:"會員密碼不能為空",
                        trigger:"blur"
                    },{
                        min:6,
                        max:30,
                        message:"長度須為6-30字",
                        trigger:"blur"
                    }],
                    password2:[]
                }
            }
        }
    }
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>
