<?php
echo (!empty($msg)) ? $msg : false;
?>
<form method="post" action="<?php echo _WEB_ROOT; ?>/home/postTest">

    <input class="form-control" type="text" name="name" placeholder="name"
        value="<?php echo old('name'); ?>">
    <div style="margin-bottom: 10px;color:red;">
        <?php echo form_error('name', '<p>', '</p>') ?>
    </div>

    <input class="form-control" type="text" name="email" placeholder="email"
        value="<?php echo old('email'); ?>">
    <div style="margin-bottom: 10px;color:red;">
        <?php echo form_error('email', '<p>', '</p>') ?>
    </div>

    <input class="form-control" type="text" name="pass" placeholder="pass">
    <div style="margin-bottom: 10px;color:red;">
        <?php echo form_error('pass', '<p>', '</p>') ?>
    </div>

    <input class="form-control" type="text" name="confirm_pass" placeholder="confirm_pass">
    <div style="margin-bottom: 10px;color:red;">
        <?php echo form_error('confirm_pass', '<p>', '</p>') ?>
    </div>

    <input class="form-control" type="text" name="age" placeholder="age"
        value="<?php echo old('age'); ?>">
    <div style="margin-bottom: 10px;color:red;">
        <?php echo form_error('age', '<p>', '</p>') ?>
    </div>

    <button type="submit">Gửi</button>
</form>