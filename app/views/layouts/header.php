<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- khong luu cache-->
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="no-cache" />
    <meta http-equiv="Expires" content="-1">
    <meta http-equiv="Cache-Control" content="no-cache" />
    <!-- khong luu cache-->
    <link rel="shortcut icon" type="image/x-icon"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/images/favicon_io/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/images/favicon_io/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/images/favicon_io/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/images/images/favicon_io/favicon-16x16.png">
    <link rel="manifest" href="<?php echo _WEB_ROOT; ?>/public/assets/clients/images/favicon_io/site.webmanifest">

    <link type="text/css" rel="stylesheet"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/fontawesome.min.css" />
    <link type="text/css" rel="stylesheet"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/sweetalert2.min.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/select2.min.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/fancybox.min.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/tipsy.min.css" />
    <link type="text/css" rel="stylesheet"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/hc-offcanvas-nav.css" />


    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/jquery.min.js"></script>
    <script type="text/javascript"
        src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/datepicker.min.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/datepicker-vi.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/sweetalert2.min.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/select2.min.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/select2-vi.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/fancybox.min.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/jquery.tipsy.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/hc-offcanvas-nav.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/cleave.min.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/cleave-phone.vi.js"></script>
    <script type="text/javascript"
        src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/jquery.validate.min.js"></script>
    <script type="text/javascript"
        src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/additional-methods.min.js"></script>

    <script type="text/javascript"
        src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/jquery.treetable.min.js"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/repeater.min.js"></script>



    <script type="text/javascript" language="javascript">
        var CONFIG = {
            "BASE_DOMAIN": "<?php echo _WEB_ROOT ?>",
        };
    </script>

    <link type="text/css" rel="stylesheet"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/component.css?v=1.0" />
    <link type="text/css" rel="stylesheet"
        href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/responsive.css?v=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        clifford: '#da373d',
                    }
                }
            }
        }
    </script>
    <link type="text/css" rel="stylesheet" href="<?php echo _WEB_ROOT; ?>/public/assets/clients/css/style.css?v=1.0" />

    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/app.js?v=1.0"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/ocm24h.js?v=1.0"></script>
    <script type="text/javascript" src="<?php echo _WEB_ROOT; ?>/public/assets/clients/js/script.js?v=1.0"></script>


    <title>KPI</title>

</head>

<body class="text-sm 2xl:text-base">
    <div id="master_container">

        <div class="header-navbar">
            <nav class="navbar">

                <div class="container-fluid">

                    <button class="navbar-toggle d-block d-lg-none" type="button">
                        <b class="icon-bar"></b>
                        <b class="icon-bar"></b>
                        <b class="icon-bar"></b>
                    </button>

                    <a class="navbar-brand flex-grow-1 flex-lg-grow-0 me-0 me-lg-2" href="http://localhost/vni-kpi/">
                        <span class="d-flex align-items-center justify-content-center">
                            <img class="me-3" width="40px"
                                src="http://localhost/vni-kpi/assets/images/logo/logo-white.png" alt="Logo">
                            <span class="fz-30 fw-900 sub-color">KPI</span>
                        </span>
                    </a>


                    <ul id="menu-nav" class="nav navbar-nav flex-fill d-lg-flex d-none">
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost/vni-kpi/kpi_tap_the/index">
                                <b>KPI tập thể</b>
                            </a>

                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost/vni-kpi/kpi_ca_nhan/index">
                                <b>KPI cá nhân</b>
                            </a>

                        </li>
                    </ul>

                    <div class="navbar-end d-flex align-items-center order-lg-2 ml-auto">

                        <div class="user-info d-xl-block d-none">
                            <p class="user-name nowrap mb-0 text-white">Xin chào: Lê Viết Đạt <sup>ID:2889</sup></p>
                            <p class="user-dep nowrap mb-0">Phòng Kinh Doanh 1 / Sở Giao Dịch</p>
                        </div>

                        <!-- Hiển thị box thông báo -->

                        <div id="notification-dropdown" class="nav-item dropdown nav-notification" data-tooltip="tipsy"
                            original-title="Thông báo" data-position="bottom">
                            <a class="nav-link dropdown-toggle dropdown-hide-arrow fz-20" href="#"
                                data-bs-toggle="dropdown">
                                <i class="fa-light fa-bell position-relative p-2 text-white">
                                </i>

                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <div class="notification-group">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <ul class="nav">
                                            <li class="nav-item">
                                                <button class="active" id="thong-bao-tab" data-bs-toggle="pill"
                                                    data-bs-target="#thong-bao" type="button" aria-selected="true">Thông
                                                    báo</button>
                                            </li>
                                        </ul>
                                        <a class="btn btn-light btn-s text-secondary d-flex align-items-center me-1"
                                            title="Cài đặt thông báo"
                                            href='http://localhost/vni-kpi/notification/index'>
                                            Xem tất cả
                                        </a>
                                    </div>

                                    <div class="tab-content notification-list">
                                        <ul class="tab-pane fade show active" id="thong-bao"><span
                                                class="text-center d-block p-3"> Không có thông báo nào...</span></ul>
                                    </div>
                                </div>
                            </ul>
                        </div> <!-- End - Hiển thị box thông báo -->

                        <div class="nav-item dropdown nav-user">
                            <a class="nav-link dropdown-toggle dropdown-hide-arrow" href="#" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="user-icon fas fa-circle-user"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <div class="user-info d-xl-none d-block">
                                    <p class="user-name nowrap mb-0">Xin chào: Lê Viết Đạt <sup>ID:2889</sup></p>
                                    <p class="user-dep nowrap mb-0">Phòng Kinh Doanh 1 / Sở Giao Dịch</p>
                                    <div class="dropdown-divider"></div>
                                </div>
                                <!-- <a class="dropdown-item" href=""><i class="far fa-circle-question me-2"></i> Trợ giúp</a> -->
                                <a class="dropdown-item" href="http://localhost/vni-kpi/user/logout"><i
                                        class="far fa-power-off me-2"></i> Đăng xuất</a>
                            </ul>
                        </div>
                    </div>

                </div>

            </nav>
        </div>