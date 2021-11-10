<?php
header('content-type:text/html;charset=utf-8');//设置字符编码。
header('Access-Control-Allow-Origin:*'); //设置请求的域名为任意域名，后面的*表示任意域名。
header('Access-Control-Allow-Method:POST,GET');  //设置跨域请求的方式。
//连接数据库
define('HOST','localhost');//主机名localhost/127.0.0.1
define('USERNAME','root');//数据库的用户名
define('PASSWORD','root');//数据库的密码
define('DBNAME','js2110');//数据库名称

$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//$conn:对象  mysqli:连接数据库的类
//@符号：容错符号，错误信息不显示，慎用。
if($conn->connect_error){//connect_error错误的属性值
    die('数据库连接失败'.$conn->connect_error);//退出并输出die里面的内容。
}
//设置字符编码
$conn->query('SET NAMES UTF-8');