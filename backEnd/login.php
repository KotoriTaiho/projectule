<?php
include "conn.php";
//获取前端传入的用户名，进行存在检测
if(isset($_POST['tel'])){//检测前端传入的用户名是否存在
    $tel = $_POST['tel'];
    $result = $conn->query("select * from registry_login where tel='$tel'");
    if($result->fetch_assoc()){//存在用户名

        //判断密码
        if(isset($_POST['password'])  ){
            $pass = sha1($_POST['password']);
            $result = $conn->query("select * from registry_login where tel='$tel' and password='$pass'");
            if($result->fetch_assoc()){
                echo '{"status":3,"msg":"登录成功"}';
            }else{//登录失败
                echo '{"status":4,"msg":"登录失败"}';
            }
        }
    }else{//用户名不存在
        echo '{"status":2,"msg":"用户名不存在"}';
    }
}