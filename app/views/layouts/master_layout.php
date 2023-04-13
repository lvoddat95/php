<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="<?php echo _WEB_ROOT;?>public/css/style.css">
</head>
<body>
    <?php $this->render('blocks/header'); ?>

    <?php $this->render($content); ?>

    <?php $this->render('blocks/footer'); ?>
</body>
</html>