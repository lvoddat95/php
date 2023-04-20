var App = function () {

    // Datatable 
    var _component_datatable = function (p_table = '', p_opts = {}) {

        var v_table = $('.datatable');

        if (p_table) {
            // 'p_table: run in DOMContentLoaded.';
            v_table = p_table;
        }

        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Setting datatable defaults
        $.extend($.fn.dataTable.defaults, {
            autoWidth: false,
            processing: true,
            info: false,
            paging: false,
            searching: false,
            responsive: {
                details: {
                    type: 'column'
                },
                breakpoints: [{
                    name: 'desktop',
                    width: Infinity
                },
                {
                    name: 'tablet-l',
                    width: 1200
                },
                {
                    name: 'tablet-p',
                    width: 992
                },
                {
                    name: 'mobile-l',
                    width: 576
                },
                {
                    name: 'mobile-p',
                    width: 320
                }
                ]
            },
            // dom: '<"datatable-header"fr><"datatable-body"t><"datatable-footer"<"datatable-li"li>p>',
            dom: '<"datatable-header"fr><"datatable-body"t><"datatable-footer"<"datatable-li"li>p>',
            language: {
                decimal: "",
                emptyTable: "Không có dữ liệu trong bảng",
                info: " Tổng số _TOTAL_ bản ghi",
                infoEmpty: "Không có bản ghi nào",
                infoFiltered: "(danh sách từ _MAX_ bản ghi)",
                infoPostFix: "",
                thousands: ",",
                lengthMenu: " _MENU_ ",
                loadingRecords: "Đang tải...",
                processing: "<i class='fas fa-spinner fa-pulse'></i> Đang xử lý...",
                search: "",
                searchPlaceholder: 'Nhập tìm nhanh...',
                zeroRecords: "Không tìm thấy hồ sơ phù hợp",
                paginate: {
                    first: "Đầu",
                    last: "Cuối",
                    next: "Sau <i class='fa fa-chevron-right fa-xs'></i>",
                    previous: "<i class='fa fa-chevron-left fa-xs'></i> Trước"
                },
                aria: {
                    sortAscending: ": kích hoạt để sắp xếp cột tăng dần",
                    sortDescending: ": kích hoạt để sắp xếp cột giảm dần"
                },
                buttons: {
                    copyTitle: 'Đã thêm vào clipboard',
                    copyKeys: 'Nhấn ctrl hoặc <i>\u2318</i> + C để sao chép dữ liệu từ bảng vào khay nhớ tạm của bạn. Để hủy, bấm vào tin nhắn này hoặc nhấn Esc.',
                    copySuccess: {
                        _: 'Sao chép %d dòng ',
                        1: 'Sao chép 1 dòng '
                    }
                }
            },
            lengthMenu: [
                [10, 20, 50, 100, 200, 300, 400, 500, 1000],
                [10, 20, 50, 100, 200, 300, 400, 500, 1000]
            ],
            mark: {
                element: 'span',
                className: 'highlight'
            },
        });


        if (v_table) {

            // let p_opts = {};

            if ($(v_table).attr('data-fixed-columns--left-columns')) {
                p_opts.fixedColumns = {
                    leftColumns: $(v_table).attr('data-fixed-columns--left-columns')
                };
            }

            var v_datatable = $(v_table).DataTable(p_opts);

            _datatable_responsive_display(v_datatable);

            let dt_list = $(v_datatable.tables().containers());
            dt_list.each(function (i, e) {
                let v_dataTables_search = $(e).find('.dataTables_search');
                let v_dataTables_search_inline = $(e).closest('.card').find('.dataTables_search_header_card');
                let v_dataTables_filter = $(e).find('.dataTables_filter');

                if (v_dataTables_search_inline.length > 0) {
                    v_dataTables_filter.appendTo(v_dataTables_search_inline);
                }

                if (v_dataTables_search.length > 0) {

                    v_dataTables_filter.appendTo(v_dataTables_search);

                    let v_placeholder = v_dataTables_search.attr("placeholder");
                    if (v_placeholder == undefined) return false;
                    if (v_placeholder.length > 0) {
                        $(e).find('div.dataTables_filter input').attr("placeholder", v_placeholder);
                    }
                }
            });

        }


        // Reponsive recall 
        function _datatable_responsive_display(p_datatable) {

            p_datatable.on('responsive-display', function (e, datatable, row, showHide, update) {
                var li_dtr = $(this).find('tbody > tr.child > td.child > ul.dtr-details > li');
                li_dtr.each(function (index, li) {
                    var v_dtr_title = $(li).find('.dtr-title');
                    var v_dtr_data = $(li).find('.dtr-data');

                    if (v_dtr_title.is(':empty')) {
                        $(li).addClass('dtr-title-empty');
                    }

                    if (v_dtr_data.is(':empty')) {
                        $(li).addClass('dtr-data-empty');
                    }

                });

                console.log(p_datatable);

                // recall
                var select2 = $(this).find('select');
                var datepicker = $(this).find('.datepicker');
                var v_clone = $(this).find('[clone]');

                if (datepicker.hasClass('hasDatepicker')) {
                    datepicker.removeClass('hasDatepicker')
                        .removeData('datepicker')
                        .removeAttr('id')
                        .unbind();
                }

                _component_select2(select2);
                _component_datepicker(datepicker);
                _component_input_type();

            });
        }

        $("[datatable-collapse]").on("shown.bs.collapse", function () {
            $.each($.fn.dataTable.tables(true), function () {
                $(this).DataTable().columns.adjust().draw();
            });
        });

        $('[datatable-modal]').on('shown.bs.modal', function (e) {
            $($.fn.dataTable.tables(true)).DataTable()
                .columns.adjust()
                .responsive.recalc();
        });

        $("[datatable-tab], .steps > .nav-tabs").on("shown.bs.tab", function (e) {
            $($.fn.dataTable.tables(true)).DataTable()
                .columns.adjust()
                .responsive.recalc();
        });


    };

    // Tooltip
    var _component_tooltip = function () {

        // Initialize
        $('[data-popup="tooltip"]').tooltip();

        // Demo tooltips, remove in production
        var demoTooltipSelector = '[data-popup="tooltip-demo"]';
        if ($(demoTooltipSelector).is(':visible')) {
            $(demoTooltipSelector).tooltip('show');
            setTimeout(function () {
                $(demoTooltipSelector).tooltip('hide');
            }, 2000);
        }
    };

    // Tooltip tipsy
    var _component_tooltip_tipsy = function () {
        if ($('[data-tooltip="tipsy"]').length > 0) {
            if (!$().tipsy) {
                console.warn('Warning - Tipsy js is not loaded.');
                return;
            }
            $('[data-tooltip="tipsy"]').each(function (index) {
                var $this = $(this);
                var v_gravity = '';
                var v_pos = $this.data('position');

                // Mac dinh hien thi "top"
                if (!v_pos || v_pos == 'top') {
                    v_gravity = 's';
                } else if (v_pos == 'bottom') {
                    v_gravity = 'n';
                } else if (v_pos == 'left') {
                    v_gravity = 'e';
                } else if (v_pos == 'right') {
                    v_gravity = 'w';
                } else if (v_pos == 'bottom-left') {
                    v_gravity = 'ne';
                } else if (v_pos == 'bottom-right') {
                    v_gravity = 'nw';
                } else if (v_pos == 'top-left') {
                    v_gravity = 'se';
                } else if (v_pos == 'top-right') {
                    v_gravity = 'sw';
                }

                $this.tipsy({
                    gravity: v_gravity,
                    html: true
                });
            });

        }
    }

    // Collapse card
    var _cardActionCollapse = function () {

        var $cardCollapsedClass = $('.card-collapsed');

        // Hide if collapsed by default
        $cardCollapsedClass.children('.card-header').nextAll().hide();

        // Rotate icon if collapsed by default
        $cardCollapsedClass.find('[data-action=collapse]');

        // Collapse on click
        $('.card [data-action=collapse]:not(.disabled)').on('click', function (e) {
            var $target = $(this),
                slidingSpeed = 150;

            e.preventDefault();
            $target.parents('.card').toggleClass('card-collapsed');
            $target.closest('.card').children('.card-header').nextAll().slideToggle(slidingSpeed);
        });
    };

    // Form Validation

    var _component_form_validate = function () {
        if ($('[form-validate]').length > 0) {
            // console.log($('[form-validate]').length );
            if (!$.validator) {
                console.warn('Warning -Validator Js is not added.');
                return;
            }

            $.extend($.validator.messages, {
                required: "Thông tin bắt buộc.",
                remote: "Hãy sửa cho đúng.",
                email: "Hãy nhập email.",
                url: "Hãy nhập URL.",
                date: "Hãy nhập ngày.",
                dateISO: "Hãy nhập ngày (ISO).",
                number: "Hãy nhập số.",
                digits: "Hãy nhập chữ số.",
                creditcard: "Hãy nhập số thẻ tín dụng.",
                equalTo: "Hãy nhập thêm lần nữa.",
                extension: "Phần mở rộng không đúng.",
                maxlength: $.validator.format("Hãy nhập từ {0} kí tự trở xuống."),
                minlength: $.validator.format("Hãy nhập từ {0} kí tự trở lên."),
                rangelength: $.validator.format("Hãy nhập từ {0} đến {1} kí tự."),
                range: $.validator.format("Hãy nhập từ {0} đến {1}."),
                max: $.validator.format("Hãy nhập từ {0} trở xuống."),
                min: $.validator.format("Hãy nhập từ {0} trở lên.")
            });

            $.validator.addMethod("notnegative", function (value, element, params) {
                return value > 0;
            }, jQuery.validator.format("Thông tin bắt buộc."));

            $.validator.addClassRules("non-negative", {
                notnegative: true,
                required: true
            });

            let options = {
                // ignore: "[]",
                lang: 'vi',
                rules: {
                    systemtype: {
                        required: true
                    },
                    systemcode: {
                        required: true
                    },
                    systemdesc: {
                        required: true
                    },
                },
                errorPlacement: function (label, element) {
                    console.log()
                    // Check Select2
                    if (element.hasClass('select2-hidden-accessible')) {
                        label.insertAfter(element.next('.select2-container')).addClass('is-valid');
                    } else if (element.parent('.input-group').length > 0) {
                        label.insertAfter(element.parent('.input-group')).addClass('is-valid');
                    } else {
                        label.addClass('text-danger');
                        label.insertAfter(element);
                    }
                },
                highlight: function (element) {
                    // Check Select2
                    if ($(element).hasClass('select2-hidden-accessible')) {
                        let select2Elem = $(element).parent().find('.select2-selection');
                        select2Elem.addClass('select-invalid').removeClass('select-valid');
                    }

                    $(element).addClass('is-invalid');
                    $(element).parent().addClass('form-invalid').removeClass('form-valid');
                },
                success: function (label, element) {
                    // Check Select2
                    if ($(element).hasClass('select2-hidden-accessible')) {
                        let select2Elem = $(element).parent().find('.select2-selection');
                        select2Elem.addClass('select-valid').removeClass('select-invalid');
                    }

                    $(element).removeClass('is-invalid');
                    $(element).parent().addClass('form-valid').removeClass('form-invalid');
                    label.remove();
                },
            };


            // $('[select2]').select2().change(function () {
            //     $(this).valid();
            // });

            $("[form-validate]").each(function () {
                var validobj = $(this).validate(options);
                $(this).find('[select2]').select2().change(function () {
                    $(this).valid();
                });
            });

        }
    }


    // Select2
    var _component_select2 = function (p_select, p_otps) {
        if (!$().select2) {
            console.warn('Warning - Select2 Js is not loaded.');
            return;
        }

        let select = $('[select2]');
        let otps = {
            language: "vn",
            minimumResultsForSearch: 5,
        };

        if (p_select) select = p_select;
        if (p_otps) otps = p_otps;

        // var optional_config = {
        //     dateFormat: "d/m/Y",
        //     // shorthandCurrentMonth: true
        // };

        // if(flatpickr){
        //     flatpickr.localize(flatpickr.l10ns.vn);
        //     flatpickr.l10ns.default.firstDayOfWeek = 1;
        //     $(".fp").flatpickr(optional_config);
        // }


        if (select.length > 0) {

            $(select).select2(otps);

            $(select).each(function (index, element) {
                let attr_add_new_item = $(element).attr('select2-add-new-item');

                if (typeof attr_add_new_item != 'undefined') {
                    if (attr_add_new_item == "") {
                        attr_add_new_item = "Nhập giá trị thêm mới: ";
                    }

                    $(element).on("select2:close", function (e) {
                        let el = $(this);
                        if (el.val() === "new") {
                            let newval = prompt(attr_add_new_item);
                            if (newval !== null) {
                                el.append('<option>' + newval + '</option>')
                                    .val(newval);
                            }
                        }
                    });
                }

            });
        }
    }

    // Datepicker
    var _component_datepicker = function (p_datepicker) {

        if (!$().datepicker) {
            console.warn('Warning - Datepicker Js is not loaded.');
            return;
        }

        var datepicker = $('.datepicker');
        if (p_datepicker) datepicker = p_datepicker;

        if ($().datepicker) {

            $.datepicker._gotoToday = function (id) {
                var target = $(id);
                var inst = this._getInst(target[0]);
                if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
                    inst.selectedDay = inst.currentDay;
                    inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                    inst.drawYear = inst.selectedYear = inst.currentYear;
                } else {
                    var date = new Date();
                    inst.selectedDay = date.getDate();
                    inst.drawMonth = inst.selectedMonth = date.getMonth();
                    inst.drawYear = inst.selectedYear = date.getFullYear();
                    // the below two lines are new
                    this._setDateDatepicker(target, date);
                    this._selectDate(id, this._getDateDatepicker(target));
                }
                this._notifyChange(inst);
                this._adjustDate(target);
            }

            let datePickerOtps = {
                firstDay: 1,
                showButtonPanel: true,
                changeMonth: true,
                changeYear: true,
                dateFormat: 'dd/mm/yy',
                minDate: "-1y-1m",
                maxDate: "+1y+1m",
                beforeShow: function (input, obj) {
                    var picker = $(obj.dpDiv);
                    var v_type = $(input).attr('type');
                    var btn_today = picker.find('.ui-datepicker-current');
                    if (v_type == 'date') {
                        $(input).datepicker('option', 'dateFormat', 'yy-mm-dd');
                    }
                },
                onSelect: function (dateText, inst) {
                    if (dateText !== inst.lastVal) {
                        $(this).trigger("change");
                    }
                }
            };

            $.datepicker.setDefaults(datePickerOtps);
            $(datepicker).datepicker();

        }
    }

    // Repeater js
    var _component_repeater = function () {
        if ($('[repeater]').length > 0) {
            if (!$().repeater) {
                console.warn('Warning - Repeater Js is not loaded.');
                return;
            }
            $('[repeater]').each(function (index) {
                let elem = $(this);
                var v_count = 1;
                window.outerRepeater = $(this).repeater({
                    show: function (e) {
                        var $v_clone = $(this);
                        var v_table = $v_clone.closest('table');
                        var v_parent = $v_clone.closest('[repeater]');
                        var v_select = v_parent.find('[select2]');
                        var v_datepicker = v_parent.find('.datepicker');
                        let add_btn = elem.find('[data-repeater-create]');

                        let data_exec = $(add_btn).data('repeater-exec-func');
                        if ($.trim(data_exec).length > 0 && typeof data_exec !== 'undefined') {
                            let data_exec_list = data_exec.split(",");
                            let function_name = data_exec_list[0];
                            data_exec_list.shift();
                            let check = window[function_name].apply(this, data_exec_list);
                            if (check) {
                                $v_clone.remove();
                                return;
                            }
                        }

                        let data_incre = $(add_btn).data('repeater-incre');
                        if ($.trim(data_incre).length > 0 && typeof data_incre !== 'undefined') {
                            ++v_count;
                            $v_clone.find("." + data_incre).val(v_count);
                        }




                        if (v_table.length > 0) {
                            if (v_table.is('.datatable')) {
                                v_table.DataTable().row.add($v_clone).draw();
                            }
                        }

                        if (v_datepicker.hasClass('hasDatepicker')) {
                            v_datepicker.removeClass('hasDatepicker')
                                .removeData('datepicker')
                                .removeAttr('id')
                                .unbind();
                        }

                        $v_clone.slideDown();

                        _component_input_type();
                        _component_datepicker(v_datepicker);
                        _component_select2(v_select);
                    },
                    hide: function (deleteElement) {
                        var $v_clone = $(this);
                        var v_parent = $v_clone.closest('[repeater]');
                        var v_table = $v_clone.closest('table');

                        if (confirm('Xoá dòng này ?')) {
                            if (v_table.length > 0) {
                                if (v_table.is('.datatable')) {
                                    var dt_tb = v_table.DataTable();
                                    var tableRow = dt_tb.row($(this));
                                    dt_tb.row(tableRow).remove().draw();
                                }
                            }
                            $(this).slideUp(deleteElement);
                        }
                    },
                    repeaters: [{
                        selector: '[child-repeater]',
                        show: function () {
                            $(this).slideDown();
                        },
                        hide: function (deleteElement) {
                            $(this).slideUp(deleteElement);
                        }
                    }]
                });

            });
        }
    }

    // Cleave js: dinh dang kieu nhap du lieu input
    var _component_input_type = function () {

        if (typeof Cleave == 'undefined') {
            console.warn('Warning - Cleave Js is not loaded.');
            return;
        }


        $('.input-money').toArray().forEach(function (field) {
            var v_negative = $(field).data('negative');
            new Cleave(field, {
                numeral: true,
                numeralPositiveOnly: !v_negative ? true : false,
                numeralDecimalScale: 5
            });
        });

        $('.input-date').toArray().forEach(function (field) {
            if ($(field).attr('type') == 'date') {
                return;
            }
            var input_date = new Cleave(field, {
                date: true,
                delimiter: '/',
                datePattern: ['d', 'm', 'Y'],
                // dateMin: '2000-01-01',
                // dateMax: '2099-01-01',
                copyDelimiter: true,
            });
        });

        $('.input-day').toArray().forEach(function (field) {
            new Cleave(field, {
                date: true,
                datePattern: ['d'],
                copyDelimiter: true,
            });
        });

        $('.input-month').toArray().forEach(function (field) {
            new Cleave(field, {
                date: true,
                datePattern: ['m'],
                copyDelimiter: true,
            });
        });

        $('.input-year').toArray().forEach(function (field) {
            new Cleave(field, {
                date: true,
                datePattern: ['Y'],
                copyDelimiter: true,
            });
        });


        $('.input-time').toArray().forEach(function (field) {
            new Cleave(field, {
                time: true,
                timePattern: ['h', 'm'],
                copyDelimiter: true,
            });
        });

        $('.input-float').toArray().forEach(function (field) {
            var v_negative = $(field).data('negative');
            var input_float = new Cleave(field, {
                numeral: true,
                numeralPositiveOnly: !v_negative ? true : false,
                numeralDecimalScale: 5
            });
        });

        $('.input-number').toArray().forEach(function (field) {
            var v_negative = $(field).data('negative');
            new Cleave(field, {
                numeral: true,
                numeralPositiveOnly: !v_negative ? true : false,
                numeralDecimalMark: '',
                delimiter: ''
            });
        });

        $('.input-phone').toArray().forEach(function (field) {
            new Cleave(field, {
                phone: true,
                phoneRegionCode: 'VN',
            });
        });

        $('.input-bsx').toArray().forEach(function (field) {
            new Cleave(field, {
                blocks: [4, 5],
                uppercase: true
            });
        });

        $('.input-code').toArray().forEach(function (field) {
            new Cleave(field, {
                blocks: [99999],
                uppercase: true,
            });
        });

        $('.input-mst').toArray().forEach(function (field) {
            var v_negative = $(field).data('negative');
            new Cleave(field, {
                numeral: true,
                numeralPositiveOnly: !v_negative ? true : false,
                numeralDecimalMark: '',
                delimiter: ''
            });
        });
    }

    var _component_sticky_header = function () {
        var $window = $(window);
        var lastScrollTop = 0;
        var $header = $("#sticky-header");
        var $footer = $("#footer");
        var headerHeight = $header.outerHeight();

        $(window).on("scroll", function () {
            var windowTop = $window.scrollTop();

            if (windowTop >= headerHeight) {
                $header.addClass("sticky");
            } else {
                $header.removeClass("sticky").removeClass("show");
                $footer.removeClass("show");
            }
            if ($header.hasClass("sticky")) {
                if (windowTop < lastScrollTop) {
                    $header.addClass("show");
                    $footer.addClass("show");
                } else {
                    $header.removeClass("show");
                    $footer.removeClass("show");
                }
            }
            if (windowTop < lastScrollTop) {
                $footer.addClass("show");
            } else {
                $footer.removeClass("show");
            }
            lastScrollTop = windowTop;
        });
    }

    return {

        // Init truoc khi load trang
        initBeforeLoad: function () {

            // onchange_tan_suat();

            // Sticky header card
            _component_sticky_header()

            // Menu mobile
            if ($("#menu-nav").length > 0) {
                if (typeof hcOffcanvasNav == "undefined") {
                    console.warn("Warning - hcOffcanvasNav Js is not loaded.");
                    return;
                }

                if ($(".navbar-toggle").length == 0) {
                    console.warn(
                        "Warning - Thieu button sidebar-mobile-main-toggle. Kiem tra lai HTML!"
                    );
                    return;
                }


            }

            // Lên đầu trang
            if ($(".go-top").length > 0) {
                var offset = 250;
                var duration = 550;
                $(window).on("scroll", function () {
                    if (jQuery(this).scrollTop() > offset) {
                        jQuery(".go-top").addClass("active");
                    } else {
                        jQuery(".go-top").removeClass("active");
                    }
                });
                $('.go-top').on('click', function (event) {
                    event.preventDefault();
                    jQuery('html, body').animate({
                        scrollTop: 0
                    }, duration);
                    return false;
                });
            }

            // Khoảng thời gian
            if ($('.daterange').length > 0) {
                if (!$().datepicker) {
                    console.warn('Warning - Datepicker Js is not loaded.');
                    return;
                }
                let year = (new Date).getFullYear();
                $(".daterange").datepicker({
                    minDate: new Date(year, 0, 1),
                    maxDate: new Date(year, 11, 31),
                    beforeShow: function (input, inst) {
                        if (typeof $(input).data("min") == "undefined" || $(input).data("min") == "") return;
                        let v_min_date = $(input).data("min");
                        $(".daterange-max").datepicker('option', 'minDate', v_min_date);
                    },
                    onSelect: function (dateText, inst) {
                        daterange_onchange(inst.input, dateText);
                    }
                });
            }

            // Kiểm tra form đã thay đổi
            form_check_changed();

            // Thêm cửa sổ bật lên Popover Bootstrap
            if (window.bootstrap !== undefined) {
                $('[data-bs-toggle="popover"]').popover();
            }

            // Textarea auto height khi row=1
            $('textarea[rows="1"], textarea[rows="2"], textarea[rows="3"]').each(function () {
                this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
            }).on('input', function () {
                console.log(this.scrollHeight)
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });

        },

        // Init sau khi load trang
        initAfterLoad: function () { },

        // Init Resize Trang
        initResize: function () {

        },

        // Initialize all components
        initComponents: function () {
            _component_tooltip_tipsy();
            _component_form_validate();
            _component_select2();
            _component_datepicker();
            _component_input_type();
            _component_repeater();
            // _component_datatable();
        },

        // Initialize all components
        initCardActionCollapse: function () {
            _cardActionCollapse();
        },

        // Initialize core
        initCore: function () {
            App.initComponents();
            App.initCardActionCollapse();
        },

        // Initialize Select2
        initSelect2: function (p_select, p_otps) {
            _component_select2(p_select, p_otps);
        },

        // Initialize Datepicker
        initDatepicker: function () {
            _component_datepicker();
        },

        // Initialize Form Validate
        initFormValidate: function () {
            _component_form_validate();
        },

        // Initialize Datatables
        initDatatable: function (p_table, p_opts) {
            _component_datatable(p_table, p_opts);
        },
    }
}();


// Initialize module
// ------------------------------

// When content is loaded
document.addEventListener('DOMContentLoaded', function () {

    var Nav = new hcOffcanvasNav('#menu-nav', {
        disableAt: 1200,
        customToggle: ".navbar-toggle",
        levelSpacing: 0,
        navTitle: "Danh sách Menu",
        levelTitles: true,
        levelTitleAsBack: true,
        // pushContent: '#content',
        labelBack: "Quay lại",
        labelClose: "",
    });

    App.initBeforeLoad();
    App.initCore();

});

// When page is fully loaded
window.addEventListener('load', function () {
    App.initAfterLoad();
});

// When page is resized
window.addEventListener('resize', function () { });