<?php

//引入数据库连接的文件
include "conn.php";



//查询所有的数据
$result=$conn->query("select * from tmali_goods");

//获取数据输出接口
$arr = [];

for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);//输出json格式的数据。