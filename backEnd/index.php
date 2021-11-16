<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";
$result=$conn->query("select * from goods_data limit 0,100 ;");
$num = $result->num_rows; 
$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
class pagedata{};
$arr1 = new pagedata();
$arr1->pagecontent = $arr;
echo json_encode($arr1);