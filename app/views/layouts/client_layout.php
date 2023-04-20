<?php
$this->render('blocks/header', $sub_content);
$this->render($content, $sub_content);
$this->render('blocks/footer', $sub_content);
?>