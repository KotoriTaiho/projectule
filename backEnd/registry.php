<?php
include "conn.php"; //引入数据库连接
//重名检测
if(isset($_POST['tel'])){//判断当前是否存在user值。
    $tel = $_POST['tel'];//获取用户名
    $result = $conn->query("select * from registry_login where tel ='$tel'");//根据前端传入的用户名检测数据库中是否存在结果。
    if($result->fetch_assoc()){//获得结果，说明当前的用户名存在数据库
        echo '{"status":1,"msg":"用户名已存在"}';
    }else{//否则不存在
        echo '{"status":2,"msg":"用户名可以使用"}';
    }
}

//获取注册的数据，将其插入给数据库。
if(isset($_POST['submit'])){//前端点击了用户注册按钮，这里才开始取值，判断前端是否点击了注册按钮。
    $tel = $_POST['tel'];  //username是表单name后面的值
    $pass = sha1($_POST['password']); 
    $repass = sha1($_POST['repass']); //表里面密码字段长度设置为40因为sha1加密的长度

    //注意：下面sql语句里面的值的顺序和数据库表里面字段的顺序一致。
    $conn->query("insert registry_login values(null,'$tel','$pass','$repass')");
    //第一项null，表示sid是自动递增，无符号(数据库表里面进行设置)

    //跳转登录页面,前端和后端通信采用绝对路径(完整的路径),其他都采用相对路径
    header('location:http://localhost/projectule/frontEnd/src/registry.html');
}