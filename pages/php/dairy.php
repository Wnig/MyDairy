<?php
error_reporting(0);
header('Content-Type:text/html;charset=utf-8');
$link = mysql_connect('localhost', 'root', '');
mysql_select_db('dairy', $link);
mysql_query("SET NAMES 'utf8'");
if (!$link) {
	die('Could not connect' . mysql_error());
}

$action = $_GET['action'];

//获取文章列表
if ($action == 'list') {
	$sql = "select * from dairys order by d_time desc";
	$rs = mysql_query($sql, $link);
	$arr = array();
	while ($row = mysql_fetch_array($rs)) {
		$arr[] = $row;
	}
	echo json_encode($arr);
};

//获取文章详情
if ($action == 'detail') {
	$sql = "select * from dairys where d_id = '$_POST[d_id]' limit 1";
	$rs = mysql_query($sql, $link);
	$arr = array();
	while ($row = mysql_fetch_array($rs)) {
		$arr[] = $row;
	}
	echo json_encode($arr);
};

//写文章
if ($action == 'dairys') {
	$sql = "insert into dairys(d_time, d_con, d_cons) values (now(), '$_POST[d_con]', '$_POST[d_cons]')";

	if (mysql_query($sql)) {
		echo "success";
	} else {
		echo "fail";
	}
};

//删除文章
if ($action == 'del') {
	$sql = "delete from dairys where d_id = '$_POST[d_id]'";
	$rs = mysql_query($sql, $link);
};


mysql_close($link);
?>