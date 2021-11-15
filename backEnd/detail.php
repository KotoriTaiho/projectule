<?php
// 引入数据库连接的文件
include "conn.php";
// 获取sid，查询sid对应的数据
// isset():检测括号里面的值是否存在，返回布尔值
if(isset($_GET['sid'])){//前端传入的sid是否存在
    $sid = $_GET['sid'];//存在获取
    $result=$conn->query("select * from tmali_goods where id=$sid");//查询当前传入的sid等于数据库字段为id的数据
    echo json_encode($result->fetch_assoc());//输出一条数据，转换成json格式。
}
